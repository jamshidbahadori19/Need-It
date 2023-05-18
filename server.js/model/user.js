/* this is user Schema in where we can log in or sign up */

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    /* adding the favorite section */
    wishList:[],
    cartBasket:[]
})

const User = mongoose.model("User",UserSchema)
module.exports = User