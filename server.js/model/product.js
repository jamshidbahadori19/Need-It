/* this is Schema is for adding product */

const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name : String,
    category:String,
    photo: String,
    description: String,
    price:Number,
    Place:String
})

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product