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



//Cart controllers

const addToCart = async (req,res)=>{
    try {
        let {_id:id,
            name,
            category,
            photo,
            description,
            price,
            Place, } = req.body;
        let addProduct = {
            id,
            name,
            category,
            photo,
            description,
            price,
            Place,
        };
        let productId = req.user.userId
        await User.findOneAndUpdate(
          { _id: productId },
          { $addToSet: { cartBasket: addProduct } }
        );
        return res.send({ msg: "Added to cart Basket!", addProduct});
        
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
}
const getSavedCartProducts = async (req,res)=>{
    try {
        let productId = req.user.userId
        let product = await User.findById(productId);
        let getAllCartProducts = product.cartBasket;
        res.json(getAllCartProducts);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
}


const deleteCartProduct = async (req,res)=>{
  try {
    let productId = req.params.id;
    let userid = req.user.userId;

    let user = await User.findById(userid);
    let allCartProducts = user.cartBasket;
    for (let i = 0; i < allCartProducts.length; i++) {
      if (productId === allCartProducts[i].id) {
        await User.findOneAndUpdate(
          { _id: userid },
          { $pull: { cartBasket: allCartProducts[i] } }
        );
      }
    }
    res.send("product deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

// get specific product 

const getSpecificProduct = async (req,res)=>{
    const get_specific_product = await Product.findOne({_id:req.params.id},req.body)
    res.send({msg:"All specific products: ",get_specific_product})
}

//saving the wish products 

const SaveWishProduct = async(req,res)=>{
    try {
        let {_id:id,
            name,
            category,
            photo,
            description,
            price,
            Place, } = req.body;
        let wishedProduct = {
          id,
            name,
            category,
            photo,
            description,
            price,
            Place,
        };
        let productId = req.user.userId
        await User.findOneAndUpdate(
          { _id: productId },
          { $addToSet: { wishList: wishedProduct } }
        );
        return res.send({ msg: "Added to wish Basket!",wishedProduct});
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
}

// get the wished products 

const getSavedProducts = async (req,res)=>{
    try {
        let productId = req.user.userId
        let user = await User.findById(productId);
        let getAllSavedProducts = user.wishList;
        res.json(getAllSavedProducts);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
}

//delete wish product

const deleteWishProduct = async (req,res)=>{
  try {
    let productId = req.params.id;
    let userid = req.user.userId;

    let user = await User.findById(userid);
    let allWishProducts = user.wishList;
    for (let i = 0; i < allWishProducts.length; i++) {
      if (productId === allWishProducts[i].id) {
        await User.findOneAndUpdate(
          { _id: userid },
          { $pull: { wishList: allWishProducts[i] } }
        );
      }
    }
    res.send("product deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}


module.exports = {getAllProducts,createProduct,deleteProduct,addToCart,getSavedCartProducts,getSpecificProduct,SaveWishProduct,getSavedProducts,deleteWishProduct,deleteCartProduct}