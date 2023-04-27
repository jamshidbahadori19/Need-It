const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : String,
    password: String,
    /* adding the favorite section */
    favorite:[]
})

const User = mongoose.model("User",UserSchema)
module.exports = User