const express  = require("express")
const router = express.Router()
const {getAllProducts,createProduct,deleteProduct,updateProduct,getSpecificProduct,SaveLikedProduct,getLikedProducts} = require("../controllers/productControllers")
const {createNewUser,getUser, getAllUsers} = require("../controllers/userController")
const verifyToken = require("../middleware/auth")
/* product router */
router.get("/getAllProducts",getAllProducts)
router.post("/createProduct",verifyToken,createProduct)
router.put("/updateProduct/:id",verifyToken,updateProduct)
router.delete("/deleteProduct/:id",verifyToken,deleteProduct) 
// liked product routes
router.put("/likedProduct/:id",SaveLikedProduct)
router.get("/getLikedProducts",getLikedProducts)

//get single product 
router.get("/getSpecificProduct/:id",getSpecificProduct)

/* User router */
router.post("/user/login",getUser)
router.post("/user/signUp",createNewUser)
router.get("/getAllUsers",getAllUsers)

module.exports = router
