
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentButton from "./PaymentButton";
import PayAllButton from "./PayAllButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./payment.css"
import {NotificationManager,NotificationContainer} from 'react-notifications';

function CartForm() {
    const [saveProduct, setSaveProduct] = useState([]);
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function getSavedProducts() {

        if (!token) {
          return navigate("/user/login");
        }
        let response = await axios.get("http://localhost:3000/getCartProducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSaveProduct(response.data) 
      }


      async function handleDelete(id){
        let confirmation = window.confirm("Are you sure that you want to delete?")
        if(confirmation){
          let response = await axios.delete(`http://localhost:3000/deleteCartProduct/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            if (response.status === 200) {
              NotificationManager.success('deleted successfully','Close after 2000ms',2000)
              getSavedProducts();
            } else {
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
          }
            }
        }
        
    
      useEffect(() => {
          getSavedProducts();
      }, []);
    return ( 
        <div key={saveProduct._id}>
          <h1 style={{marginLeft:20}}>lets Buy</h1>
          <div className="body" key={saveProduct._id}>
          {saveProduct.length > 0 && (
            <div key={saveProduct.id}>
              {saveProduct.map((savedProduct) => (
               <div className="cart-container" key={savedProduct._id} >
                <div className="imgBx" style={{border:"1px solid blue"}}>
                  <img src={savedProduct.photo} alt="card"/>
                </div>
                <div className="details">
                  <div className="content" >
                    <h2>{savedProduct.name} <br/>
                    <span>{savedProduct.category}</span>
                    </h2>
                    <p>
                    description:{savedProduct.description}
                    place:{savedProduct.Place}
                    </p>
                    <h3>Price.{savedProduct.price}$</h3>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <PaymentButton cardItem={savedProduct}/>
                      <button onClick={()=>handleDelete(savedProduct.id)}><DeleteOutlineOutlinedIcon/></button>
                    </div>
                  </div>
                  </div>
                  <NotificationContainer/>
              </div>
              ))}
            </div>
          )}
          </div>
            {saveProduct.length>0?(<>
            <div className="card-container" style={{margin:10, padding:10}}>
              <PayAllButton cardItem={saveProduct}/>
            </div>
          </>):(<div></div>)}
          
        </div>
     );
}

export default CartForm;