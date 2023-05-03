import Navbar from "./components/navbar/Navbar";
import Products from "./components/pages/home/Products"
import Footer from "./components/footer/Footer";
import { Route,Routes } from "react-router-dom";
import ProductForm from "./components/pages/addProduct/AddProduct";
import ImgMediaCard from "./components/pages/home/ProductList";
/* import MultiActionAreaCard from "./components/pages/home/ProductList"; */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AuthenticationForm from "./components/pages/authonticationForm/AuthenticationForm";
import LoginForm from "./components/pages/authonticationForm/LoginForm";

/* import RecipeReviewCard from "./components/cards/Cards"; */


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/productForm" element={<ProductForm/>}></Route>
        <Route path="/" element={<><Products/><ImgMediaCard/> </>}></Route>
        <Route path="/user/signUp" element={<AuthenticationForm/>}></Route>
        <Route path="/user/login" element={<LoginForm/>}></Route>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
