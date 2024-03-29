import Navbar from "./components/navbar/Navbar";
import Products from "./components/pages/home/Products"
import Footer from "./components/footer/Footer";
import { Route,Routes } from "react-router-dom";
import ProductForm from "./components/pages/addProduct/AddProduct";
import RecipeReviewCard from "./components/pages/home/ProductList";
/* import MultiActionAreaCard from "./components/pages/home/ProductList"; */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AuthenticationForm from "./components/pages/authonticationForm/AuthenticationForm";
import LoginForm from "./components/pages/authonticationForm/LoginForm";
import EachProduct from "./components/pages/products/EachProduct";
import CartForm from "./components/pages/payment/Cart";
import WishList from "./components/pages/wishList/WishList";
import background from "./background.jpg"

/* import RecipeReviewCard from "./components/cards/Cards"; */


function App() {
  return (
    <div className="App" style={{background:`url(${background})`,backgroundSize:"cover"}}>
      <Navbar/>
      <Routes>
        <Route path="/productForm" element={<ProductForm/>}></Route>
        <Route path="/" element={<><Products/><RecipeReviewCard/> </>}></Route>
        <Route path="/user/signUp" element={<AuthenticationForm/>}></Route>
        <Route path="/user/login" element={<LoginForm/>}></Route>
        <Route path="/eachProduct/:id" element={<EachProduct/>}></Route>
        <Route path="/cartForm" element={<CartForm/>}></Route>
        <Route path="/wishList" element={<WishList/>}></Route>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
