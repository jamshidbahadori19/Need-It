/* import ImgMediaCard from "../home/ProductList"; */
import { useEffect, useState } from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import {useParams} from 'react-router-dom';
import PaymentButton from "../payment/PaymentButton";


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
    const [cards,setCards]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3000/getSpecificProduct/${id}`)
        .then(response=>{
            setCards(response.data.get_specific_product)
        })
        
    },[])
    return (
        <div>
        {token?(<>
            <div style={{display:"flex",justifyContent:"space-evenly", margin:10,flexWrap:"wrap"}}>
            <div><img src={cards.photo} alt="card" style={{width:200,height:200}} /></div>
            <div>
                <h2>model:{cards.name}</h2>
                <h4>price:{cards.price}$</h4>
                <h4>Category:{cards.category}</h4>
                <p>description:{cards.description}</p>
                <p>place:{cards.Place}</p>
            </div>
            <PaymentButton cardItem={cards}/>
        </div>
        </>):(<>
            <div style={{display:"flex",justifyContent:"space-evenly", margin:10,flexWrap:"wrap"}}>
            <div><img src={cards.photo} alt="card" style={{width:200,height:200}} /></div>
            <div>
                <h2>model:{cards.name}</h2>
                <h4>price:{cards.price}$</h4>
                <h4>Category:{cards.category}</h4>
                <p>description:{cards.description}</p>
                <p>place:{cards.Place}</p>
            </div>
        </div>
        </>)}
       </div>
    )
}

export default EachProduct;