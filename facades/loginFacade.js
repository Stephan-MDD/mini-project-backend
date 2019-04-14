let User = require('../models/User')
let Position = require('../models/Position')

let connect = require("../dbConnect.js");
connect(require("../settings").DEV_DB_URI);

const KILOMETER = 1000;

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {Number} longitude 
 * @param {Number} latitude 
 * @param {Number} distance 
 */
async function login(username, password, longitude, latitude, distance) {
    const user = await User.findOne({username, password}).exec(); 
    const loc = { type: 'Point', coordinates: [longitude, latitude] };
    
    if(!user) {
        return { err: "wrong username or password", status: 403 }
    }

    await Position.findOneAndUpdate(
        { user: user._id },
        { user, loc, created: Date.now() },
        { upsert: true, new: true }
    ).exec();

    const nearbyFriendsPositions = await findNearbyFriends(loc, distance);

    return {
        freinds: nearbyFriendsPositions.map((friend) => ({
            username: friend.user.username,
            longitude: friend.loc.coordinates[0],
            latitude: friend.loc.coordinates[1]
        }))
    }
}

findNearbyFriends = async(location, distance) => {
    return await Position.find({
		loc: {
			$near: {
				$geometry: location,
				$minDistance: .05,
				$maxDistance: distance * KILOMETER
			}
		}
	}).populate('user').exec();
}

module.exports = { login };