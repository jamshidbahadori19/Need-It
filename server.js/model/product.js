/* this is Schema is for adding product */

const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name : {type:String, require:[true, "Please provide a name"]},
    category:[],
    photo: {type:String, require:[true, "Please provide an image"]},
    description: {type:String, require:[true, "Please provide a description"]},
    price:{type:String, require:[true, "Please provide a price"]},
    Place:{type:String, require:[true, "Please provide a place"]}
})

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product