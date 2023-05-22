
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
        console.log(response.data)
      }

      async function handleDelete(id){
        let confirmation = window.confirm("Are you sure that you want to logout?")
        if(confirmation){
          let response = await axios.delete(`http://localhost:3000/deleteWishProduct/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
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
        <div>
          {saveProduct.length > 0 &&(
          <div className='main' key={saveProduct.id}>
          {saveProduct.map((savedProduct)=>{
            return (
              <div className='card-container' key={savedProduct.id}>
                <Card sx={{ width: 400, display:"flex"}} className='card'>
                  <Link to={`/eachProduct/${saveProduct.id}`}>
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
                              <div className="main">
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