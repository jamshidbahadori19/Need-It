const express  = require("express")
const router = express.Router()
const {getAllProducts,createProduct,deleteProduct,updateProduct} = require("../controllers/productControllers")
const {createNewUser,getUser, getAllUsers} = require("../controllers/userController")
const verifyToken = require("../middleware/auth")
/* product router */
router.get("/getAllProducts",getAllProducts)
router.post("/createProduct",verifyToken,createProduct)
router.put("/updateProduct/:id",verifyToken,updateProduct)
router.delete("/deleteProduct/:id",verifyToken,deleteProduct) 

/* User router */
router.post("/user/login",getUser)
router.post("/user/signUp",createNewUser)
router.get("/getAllUsers",getAllUsers)

module.exports = router
