var connect = require("./dbConnect.js");
connect(require("./settings").DEV_DB_URI);

var User = require("./models/User.js");
var LocationBlog = require("./models/LocationBlog.js");
var Position = require("./models/Position.js");

function positionCreator(lon, lat, userId, dateInFuture) {
    var posDetail = {
        user: userId,
        loc: {
            coordinates: [lon, lat]
        }
    }
    if (dateInFuture) {
        posDetail.created = "2022-09-25T20:40:21.899Z"
    }
    return posDetail;
}
async function makeData() {
    console.log("Making users")
    try {
        var userInfos = [{
            firstName: 'a',
            lastName: 'a.',
            username: 'marc',
            password: 'test',
            email: 'marc@mail.io',
            job: [{
                type: 'developer',
                company: 'io',
                companyUrl: 'io.io'
            }, {
                type: 'developer',
                company: 'io',
                companyUrl: 'io.io'
            }]
        }, {
            firstName: 'b',
            lastName: 'b.',
            username: 'b',
            password: 'test',
            email: 'b@mail.io',
            job: [{
                type: 'developer',
                company: 'io',
                companyUrl: 'io.io'
            }, {
                type: 'developer',
                company: 'io',
                companyUrl: 'io.io'
            }]
        }, {
            firstName: 'c',
            lastName: 'c.',
            username: 'c',
            password: 'test',
            email: 'c@mail.io',
            job: [{
                type: 'developer',
                company: 'io',
                companyUrl: 'io.io'
            }, {
                type: 'developer',
                company: 'io',
                companyUrl: 'io.io'
            }]
        }];
        await User.deleteMany({});
        await Position.deleteMany({});
        await LocationBlog.deleteMany({})

        var users = await User.insertMany(userInfos);

        console.log(users)
        var positions = [positionCreator(10, 11, users[0]._id), positionCreator(11, 12, users[1]._id, true)]
        await Position.insertMany(positions)
        
        var blogs = [{
            info: "Cool Place",
            pos: {
                longitude: 26,
                latitude: 57
            },
            author: users[0]._id
        }]

        let bs = await LocationBlog.insertMany(blogs)
        console.log(bs)

    } catch (err) {
        console.log(err);
    }
}
makeData();