import Navbar from "./components/navbar/Navbar";
import Products from "./components/pages/home/Products"
import Footer from "./components/footer/Footer";
import { Route,Routes } from "react-router-dom";
import ProductForm from "./components/pages/addProduct/AddProduct";
import ImgMediaCard from "./components/pages/home/ProductList";
/* import MultiActionAreaCard from "./components/pages/home/ProductList"; */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/productForm" element={<ProductForm/>}></Route>
        <Route path="/home" element={<Products/>}></Route>
      </Routes>
      <ImgMediaCard/>
      <Footer/>
    </div>
  );
}

export default App;
