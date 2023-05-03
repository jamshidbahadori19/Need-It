/* verifying token to protect routes */
const jwt = require("jsonwebtoken")
require("dotenv").config()
const verifyToken = (req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.send({msg:"not authorized"})
        }
        let token = req.headers.authorization.split(" ")[1]
        if(!token){
            res.status(401).send({msg:"unauthorized"})
        }
        let verifiedToken = jwt.verify(token,process.env.Private_key)
        console.log(verifiedToken)
        if(!verifiedToken){
            res.send({msg:"not a valid token"})
        }else{
         // to use the user for any type of comparison later on
            req.user = verifiedToken
           next()
        }
    } catch (error) {
        res.status(500).send({msg:"Error",Error:error})
    }
    
}

module.exports = verifyToken