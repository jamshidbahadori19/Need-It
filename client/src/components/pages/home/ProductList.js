
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import "./style.css"     
import AddToCart from "../Buttons/AddToCart";
import WishButton from "../Buttons/AddToWishList";
import DeleteButton from "../Buttons/DeleteButton" 



export default function RecipeReviewCard() {
  const [cards,setCards] = useState([])

  let token = localStorage.getItem("token") 
    let decoded;

    if (token) {
        try {
          decoded = jwt_decode(token);
        } catch (error) {
          console.log(error)
        }
      }

    async function getAllCards(){
        let response = await axios.get("http://localhost:3000/getAllProducts")
        setCards(response.data.get_product)
    }

    useEffect(()=>{
        getAllCards()
    },[])

  return (
    <div className="main">
        {cards.map((card)=>{
            return(
                <div className='card-container' key={card._id}>
                    <Card sx={{ width: 350}} className='card'>
                    <Link to={`/eachProduct/${card._id}`}>
                    <CardMedia
                        className='image'
                        component="img"
                        sx={{ height: 300,"width":"100%" }}
                        image={card.photo}
                        alt="cardPhoto"
                    />
                    </Link>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        model:{card.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Category:{card.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        price:{card.price}$
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        place:{card.Place}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        description:{card.description}
                        </Typography>
                    </CardContent>
                    
                    {token?(
                            <>
                                <div className='card_button'>
                                    <span><WishButton cardItem={card} /></span>
                                    <span><AddToCart cardItem= {card}/></span>
                                    <span><DeleteButton cardItem={card} props={()=>getAllCards()}/></span>
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
  );
}
