const express  = require("express")
const router = express.Router()
const {getAllProducts,createProduct,deleteProduct,addToCart,getSavedCartProducts,getSpecificProduct,SaveWishProduct,getSavedProducts,deleteWishProduct,deleteCartProduct} = require("../controllers/productControllers")
const {createNewUser,getUser, getAllUsers} = require("../controllers/userController")
const verifyToken = require("../middleware/auth")
const {payment,payAllProducts} = require("../controllers/strip_payment")

/* product router */
router.get("/getAllProducts",getAllProducts)
router.post("/createProduct",verifyToken,createProduct)
router.delete("/deleteProduct/:id",verifyToken,deleteProduct) 

//get single product 
router.get("/getSpecificProduct/:id",getSpecificProduct)

/* User router */
router.post("/user/login",getUser)
router.post("/user/signUp",createNewUser)
router.get("/getAllUsers",getAllUsers)

//payment 
router.post("/create-checkout-session",payment)
router.post("/payAllProducts",payAllProducts)

//Wish basket 
router.put("/addToWishBasket/:id",verifyToken,SaveWishProduct)
router.get("/getSavedProduct",verifyToken,getSavedProducts)
router.delete("/deleteWishProduct/:id",verifyToken,deleteWishProduct) 

//Cart basket
router.put("/addToCart/:id",verifyToken,addToCart)
router.get("/getCartProducts",verifyToken,getSavedCartProducts)
router.delete("/deleteCartProduct/:id",verifyToken,deleteCartProduct) 
module.exports = router
