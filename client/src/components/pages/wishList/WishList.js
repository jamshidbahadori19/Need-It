
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, IconButton } from "@mui/material";
import AddToCart from "../Buttons/AddToCart";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";

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
        /* <div>
          {saveProduct.length > 0 && (
            <div className='saved-product' key={saveProduct.id}>
              {saveProduct.map((savedProduct) => (
               <div className='saved-product-item' key={savedProduct.id}>
                <div><img src={savedProduct.photo} alt="card" style={{width:200,height:200}} /></div>
                  <div>
                      <h2>model:{savedProduct.name}</h2>
                      <h4>price:{savedProduct.price}$</h4>
                      <h4>Category:{savedProduct.category}</h4>
                      <p>description:{savedProduct.description}</p>
                      <p>place:{savedProduct.Place}</p>
                  </div>
                  <AddToCart cardItem={savedProduct}/>
                  <IconButton aria-label="delete" onClick={()=>handleDelete(savedProduct.id)}>
                      <DeleteOutlineOutlinedIcon/>
                  </IconButton>
                  
               </div>
              ))}
            </div>
          )}
        </div> */
        <div>
          {saveProduct.length > 0 &&(
          <div className='saved-product' key={saveProduct.id}>
          {saveProduct.map((savedProduct)=>{
            return (
              <div className='card-container' key={savedProduct.id}>
                <Card sx={{ width: 400, display:"flex"}} className='card'>
                  <Link to={`/eachProduct/${savedProduct.id}`}>
                  <CardMedia
                      className='image'
                      component="img"
                      sx={{ height: 300 }}
                      image={savedProduct.photo}
                      alt="cardPhoto"
                  />
                  </Link>
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      model:{savedProduct.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Category:{savedProduct.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      price:{savedProduct.price}$
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      place:{savedProduct.Place}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      description:{savedProduct.description}
                      </Typography>
                  </CardContent>
                  
                  {token?(
                          <>
                              <div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap"}}>
                                  <span><AddToCart cardItem={savedProduct}/></span>
                                  <span>  <IconButton aria-label="delete" onClick={()=>handleDelete(savedProduct.id)}>
                                              <DeleteOutlineOutlinedIcon/>
                                          </IconButton>
                                  </span> 
                                </div>
                          </>
                      ):(
                          <>
                          <button disabled>like</button>
                          <button disabled>delete</button>

                          </>
                      )}
              </Card>
            </div>
                    )
                  })}
          </div>
        )}
        </div>
      );
}

export default WishList;