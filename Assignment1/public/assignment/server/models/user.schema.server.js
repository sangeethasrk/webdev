var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        roles:[String],
        emails:[String],
        phones:[String]
    },{collection:'user'});
    return UserSchema;
};