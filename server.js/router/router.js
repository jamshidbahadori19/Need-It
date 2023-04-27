const express  = require("express")
const router = express.Router()
const {getAllProducts,createProduct,deleteProduct,updateProduct} = require("../controllers/productControllers")
const {createNewUser,getAllUsers} = require("../controllers/userController")
/* product router */
router.get("/getAllProducts",getAllProducts)
router.post("/createProduct",createProduct)
router.put("/updateProduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct) 

/* User router */
router.get("/getAllUsers",getAllUsers)
router.post("/createNewUser",createNewUser)

module.exports = router
