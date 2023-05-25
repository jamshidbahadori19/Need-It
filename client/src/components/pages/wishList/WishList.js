
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, IconButton } from "@mui/material";
import AddToCart from "../Buttons/AddToCart";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {NotificationManager,NotificationContainer} from 'react-notifications';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';


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
        let confirmation = window.confirm("Are you sure that you want to delete?")
        if(confirmation){
          let response = await axios.delete(`http://localhost:3000/deleteWishProduct/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
              NotificationManager.success('deleted successfully','Close after 2000ms',2000)
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
        <div key={saveProduct.id}>
          <h1>My Wishes</h1>
          {saveProduct.length > 0 &&(
          <div className='main' key={saveProduct.id}>
          {saveProduct.map((savedProduct)=>{
            return (
              <div className='main' style={{"box-shadow": "rgb(38, 57, 77) 0px 20px 30px -10px"}} key={savedProduct.id}>
                <Card sx={{ display:"flex"}} className='card'>
                  <CardMedia
                      className='image'
                      component="img"
                      sx={{ "height": "30rem", "width":"30rem"}}
                      image={savedProduct.photo}
                      alt="cardPhoto"
                  />
                  </Card>
                  <Card>
                  <CardContent className="card-content">
                      <Typography gutterBottom variant="h5" component="div">
                      model:{savedProduct.name}
                      </Typography>
                      <Typography color="text.secondary">
                      Category:{savedProduct.category}
                      </Typography>
                      <Typography color="text.secondary">
                      price:{savedProduct.price}$
                      </Typography>
                      <Typography color="text.secondary">
                      place:{savedProduct.Place}
                      </Typography>
                      <Typography color="text.secondary">
                      description:{savedProduct.description}
                      </Typography>
                  </CardContent>
                  <NotificationContainer/>
                  {token?(
                          <>
                              <div className="main" style={{display:"grid"}}>
                                  <span><AddToCart cardItem={savedProduct}/></span>
                                  <span>  <IconButton aria-label="delete" sx={{ backgroundColor:"red",borderRadius:0,"width":"16.2rem"}} onClick={()=>handleDelete(savedProduct.id)}>
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