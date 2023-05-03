const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../model/user")
require("dotenv").config()
const salt = Number(process.env.Salt_round)
const jwt = require("jsonwebtoken")

/* createNewUser is for sign up */

const createNewUser = async (req,res)=>{
    try {
        let {username,password} = req.body
        if(!username || !password){
            return res.send({msg:"both username and password are required"})
        }
        let userFound = await User.findOne({username})
        if(userFound){
            return res.send({msg:"the user exist before please login or sign up with another gmail"})
        }else{
            let hashedPassword = await bcrypt.hash(password,salt)
            let newUser = await User.create({
                username,
                password: hashedPassword
            })
            return res.send({msg:"registered successfully", newUser})
        }
        } catch (error) {
            res.status(500).send({msg:"can not signup, please try again later",error})
        }
}
/* get user is for log in */
const getUser = async (req,res)=>{
   try {
    let {username,password} = req.body
    if(!username || !password){
        return res.send({msg:"both username and password are required"})
    }
    let userFound = await User.findOne({username})
    if(!userFound){
        return res.send({msg:"username does not exist, please sign up first"})
    }else{
        let validatePassword = await bcrypt.compare(password, userFound.password)
        if(!validatePassword){
            return res.send({msg:"please enter valid a password"})
        }else{
            let token = jwt.sign(
                {userId: userFound._id,username:userFound.username},
                process.env.Private_key,
                { expiresIn: 60 * 60 }
                )
            res.send({msg:"welcome",token})
        }
    }
   } catch (error) {
    res.status(500).send({msg:"can not login, please try again later",error})
   }
}
/* getting all the user is just for testing to make sure that we can create user */
const getAllUsers = async (req,res)=>{
    const response = await User.find(req.body)
    res.send(response)
}



module.exports = {createNewUser,getUser,getAllUsers}