/* import ImgMediaCard from "../home/ProductList"; */
import { useEffect, useState } from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import {useParams} from 'react-router-dom';
import AddToCart from "../Buttons/AddToCart"

const thisCard={
    display:"flex",
    justifyContent:"space-evenly",
    flexWrap: "wrap",
    alignItems:"center",
    margin: "1rem",
    /* border:"1px solid black", */
    "box-shadow": "rgb(38, 57, 77) 0px 10px 30px -10px",
    height:"100vh",
}


function EachProduct(props) {
    let token = localStorage.getItem("token") 
    let decoded;

    if (token) {
        try {
          decoded = jwt_decode(token);
        } catch (error) {
          console.log(error)
        }
      }

    const {id} = useParams();
    const [card,setCard]=useState([])

    async function getCard(){
        let response = await axios.get(`http://localhost:3000/getSpecificProduct/${id}`)
        setCard(response.data.get_specific_product)
    }
    useEffect(()=>{
        getCard()
        
    },[])


    return (
        <div>
         {token?(<>
            <div style={{justifyContent:"space-around", border:"1px solid gray","padding":"40px"}}>
                <div style={thisCard}>
                    <div><img src={card.photo} alt="card" style={{"width":"30rem","height":"30rem"}} /></div>
                    <div>
                        <h2 style={{color:"black"}}>model:{card.name}</h2>
                        <h4 style={{color:"black"}}>price:{card.price}$</h4>
                        <h4 style={{color:"black"}}>Category:{card.category}</h4>
                        <p style={{color:"black"}}>description:{card.description}</p>
                        <p style={{color:"black"}}>place:{card.Place}</p>
                        <AddToCart cardItem={card}/>
                    </div>
                </div>
        </div>
        </>):(<>
            <div style={{display:"flex",justifyContent:"space-evenly", margin:10,flexWrap:"wrap"}}>
            <div><img src={card.photo} alt="card" style={{width:200,height:200}} /></div>
            <div>
                <h2>model:{card.name}</h2>
                <h4>price:{card.price}$</h4>
                <h4>Category:{card.category}</h4>
                <p>description:{card.description}</p>
                <p>place:{card.Place}</p>
            </div>
        </div>
        </>)}
       </div>
    )
}

export default EachProduct;