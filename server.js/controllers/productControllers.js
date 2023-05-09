const express = require("express")

const Product = require("../model/product")
const User = require("../model/user")

const getAllProducts = async (req,res)=>{
    const get_product = await Product.find(req.body)
    res.send({msg:"All the products: ",get_product})
}

const createProduct = async (req,res)=>{
    const create_Product = await Product.create(req.body)
    res.send({msg:"new product created",create_Product})
}

const deleteProduct = async (req,res)=>{
    const delete_product = await Product.deleteOne({_id:req.params.id},req.body)
    res.send({msg:"deleted product",delete_product})
}

const updateProduct = async (req,res)=>{
    const update_product = await Product.updateOne({_id:req.params.id},req.body)
    res.send({msg:"updated product",update_product})
}

// get specific product 

const getSpecificProduct = async (req,res)=>{
    const get_specific_product = await Product.findOne({_id:req.params.id},req.body)
    res.send({msg:"All specific products: ",get_specific_product})
}

//saving the liked movie 

const SaveLikedProduct = async(req,res)=>{
    try {
        let {id,
            name,
            category,
            photo,
            description,
            price,
            Place, } = req.body;
        let newProduct = {
            id,
            name,
            category,
            photo,
            description,
            price,
            Place,
        };
        let productId = req.params.id
        await User.findOneAndUpdate(
          { _id: productId },
          { $addToSet: { favorite: newProduct } }
        );
        return res.send({ msg: "Your product is saved successfully!", newProduct});
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
}

// get the liked movies 

const getLikedProducts = async (req,res)=>{
    try {
        const get_liked_products = await User.find()
        res.send(get_liked_products)
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
}


module.exports = {getAllProducts,createProduct,deleteProduct,updateProduct,getSpecificProduct,SaveLikedProduct,getLikedProducts}