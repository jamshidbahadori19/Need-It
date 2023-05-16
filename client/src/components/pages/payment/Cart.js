
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentButton from "./PaymentButton";
import PayAllButton from "./PayAllButton";

function CartForm() {
    const [saveProduct, setSaveProduct] = useState([]);
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function getSavedProducts() {

        if (!token) {
          return navigate("/login");
        }
        let response = await axios.get("http://localhost:3000/getCartProducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSaveProduct(response.data) 
      }
    
      useEffect(() => {
        getSavedProducts();
      }, []);
    return ( 
        <div>
          {saveProduct.length > 0 && (
            <div className='saved-product'>
              {saveProduct.map((savedProduct) => (
               <div className='saved-product-item' key={savedProduct._id}>
                <div><img src={savedProduct.photo} alt="card" style={{width:200,height:200}} /></div>
                  <div>
                      <h2>model:{savedProduct.name}</h2>
                      <h4>price:{savedProduct.price}$</h4>
                      <h4>Category:{savedProduct.category}</h4>
                      <p>description:{savedProduct.description}</p>
                      <p>place:{savedProduct.Place}</p>
                  </div>
                  <PaymentButton cardItem={savedProduct}/>
               </div>
              ))}
               <PayAllButton cardItem={saveProduct}/>
            </div>
          )}
        </div>
     );
}

export default CartForm;