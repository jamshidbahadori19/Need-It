
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentButton from "./PaymentButton";
import PayAllButton from "./PayAllButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
        let confirmation = window.confirm("Are you sure that you want to logout?")
        if(confirmation){
          let response = await axios.delete(`http://localhost:3000/deleteCartProduct/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            if (response.status === 200) {
              alert("Product deleted successfully!");
              getSavedProducts();
            } else {
              alert("Can not delete the card");
          }
            }
        }
        
    
      useEffect(() => {
          getSavedProducts();
      }, []);
    return ( 
        <div >
          {saveProduct.length > 0 && (
            <div className='main'>
              
              {saveProduct.map((savedProduct) => (
              <div className="card-container">
               <div className='card' key={savedProduct._id} >
                <div><img src={savedProduct.photo} alt="card" style={{width:400,height:400}} className='image' /></div>
                  <div>
                      <h2>model:{savedProduct.name}</h2>
                      <h4>price:{savedProduct.price}$</h4>
                      <h4>Category:{savedProduct.category}</h4>
                      <p>description:{savedProduct.description}</p>
                      <p>place:{savedProduct.Place}</p>
                  </div>
                  <div>
                  <PaymentButton cardItem={savedProduct}/>
                  <button style={{width:400,color:"white",background:"#D10000"}} onClick={()=>handleDelete(savedProduct.id)}><DeleteOutlineOutlinedIcon/></button>
                  </div>
                  </div>
               </div>
              ))}
              
            </div>
            
          )}
          {saveProduct.length>0?(<>
            <div className="card-container" style={{margin:10, padding:10}}>
              <PayAllButton cardItem={saveProduct}/>
            </div>
          </>):(<div></div>)}
            
        </div>
     );
}

export default CartForm;