import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Product from "./components/pages/home/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ProductForm from "./components/pages/productForm/AddProduct";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Product/>
      <Footer/>
      <ProductForm/>
    </div>
  );
}

export default App;
