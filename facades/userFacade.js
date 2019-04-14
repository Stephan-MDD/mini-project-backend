var User = require("../models/User");

getAllUsers = async() => {
    return User.find({}).exec();
}

addUser = async(firstName, lastName, username, password, email) => {
    return User.insertMany({ firstName, lastName, username, password, email })
}

findByUsername = async(username) => {
    return User.find({ username }).exec();
}

findById = async(_id) => {
    return User.findById({ _id }).exec();
}

module.exports = {
    getAllUsers,
    addUser,
    findByUsername,
    findById
}