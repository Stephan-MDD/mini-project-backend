var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
 type: String,
 company: String,
 companyUrl : String
})

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    job: [JobSchema],
    created: { type: Date, default: Date.now },
    lastUpdated: Date
})

UserSchema.pre('save', function(next) {
    this.password = 'hash && salt' + this.password
    next()
})

UserSchema.pre('update', function(next) {
    this.update({}, {$set: {lastUpdated: new Date}})
    next()
})

let User = mongoose.model('User', UserSchema)

module.exports = User