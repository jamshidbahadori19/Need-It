
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteButton from "../Buttons/DeleteButton"
import AddToCart from "../Buttons/AddToCart";

function WishList() {
    const [saveProduct, setSaveProduct] = useState([]);
    let token = localStorage.getItem("token");
  
    const navigate = useNavigate();

    async function getSavedProducts() {

        if (!token) {
          return navigate("/login");
        }
        let response = await axios.get("http://localhost:3000/getSavedProduct", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSaveProduct(response.data);
      }

      async function handleDelete(id){
        console.log(id)
        let response = await axios.delete(`http://localhost:3000/deleteWishProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      if (response.status === 200) {
        alert("Product deleted successfully!");
      } else {
        alert("Can not delete the card");
    }
      }
    
      useEffect(() => {
        getSavedProducts();
      }, []);
    
      return (
        <div>
          {saveProduct.length > 0 && (
            <div className='saved-product' key={saveProduct._id}>
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
                  <AddToCart cardItem={savedProduct}/>
                  <button onClick={()=>handleDelete(savedProduct.id)}>delete</button>
                  
               </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default WishList;