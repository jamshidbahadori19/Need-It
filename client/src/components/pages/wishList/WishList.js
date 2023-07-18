
import { useState, useEffect } from "react";
import "./wishStyle.css"
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
          <h1 style={{color:"blue"}}>My Wishes</h1>
          {saveProduct.length > 0 &&(
          <div className='main' key={saveProduct.id}>
          {saveProduct.map((savedProduct)=>{
            return (
              <div class="wish-container">
              <div class="wish-card">
                  <div class="wish-card-content">
                      <div class="image-container">
                          <img src={savedProduct.photo} alt="" />
                      </div>
                      <div class="card-details">
                        <div>
                          <h2>model:{savedProduct.name}</h2>
                          <p>Category:{savedProduct.category}</p>
                          <p>price:{savedProduct.price}$</p>
                          <p>place:{savedProduct.Place}</p>
                          <p> description:{savedProduct.description}</p>
                        </div>
                          <NotificationContainer/>
                          {token?(
                          <>
                              <div>
                                  <span><AddToCart cardItem={savedProduct}/></span>
                                  <span>  <IconButton aria-label="delete" /* 
                                   */ onClick={()=>handleDelete(savedProduct.id)}>
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
                      </div>
                  </div>
              </div>
      </div>
                    )
                  })}
          </div>
        )}
        </div>
      );
}

export default WishList;

