const express = require("express")

const Product = require("../model/product")

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



module.exports = {getAllProducts,createProduct,deleteProduct,updateProduct}