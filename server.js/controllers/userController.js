const express = require("express")

const User = require("../model/user")

const getAllUsers = async (req,res)=>{
    const get_users = await User.find(req.body)
    res.send({msg:"getting all the users",get_users})
}

const createNewUser = async (req,res)=>{
    const create_user = await User.create(req.body)
    res.send({msg:"new product created",create_user})
}

module.exports = {createNewUser,getAllUsers}