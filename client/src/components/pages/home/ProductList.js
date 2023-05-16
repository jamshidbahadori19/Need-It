
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import PaymentButton from "../payment/PaymentButton";

function ImgMediaCard() {
    let token = localStorage.getItem("token") 
    let decoded;

    if (token) {
        try {
          decoded = jwt_decode(token);
        } catch (error) {
          console.log(error)
        }
      }
    const [cards,setCards] = useState([])
    async function getAllCards(){
        let response = await axios.get("http://localhost:3000/getAllProducts")
        /* console.log(response.data.get_product) */
        setCards(response.data.get_product)
    }

    useEffect(()=>{
        getAllCards()
    },[])

    async function deleteItem(id){
        try {
            let response = await axios.delete(`http://localhost:3000/deleteProduct/${id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 200) {
            alert("Movie deleted successfully!");
            getAllCards()
          } else {
            alert("Can not delete the card");
        }
        } catch (error) {
        console.log("Error deleting movie");
        }
    }

    async function addToWishlist(card){
        try {
            let response = await axios.put(`http://localhost:3000/addToWishBasket`,card,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            })
            alert(response.data.msg)
        } catch (error) {
            console.error(error);
        }
    }

    async function addToCart(card){
        try {
            let response = await axios.put(`http://localhost:3000/addToCart/${card._id}`,card,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            })
            alert(response.data.msg)
        } catch (error) {
            console.error(error);
        }
    }

    return ( 
        <div style={{display:"flex",justifyContent:"space-evenly", margin:10,flexWrap:"wrap"}}>
            {cards.map((card)=>{
                return (
                    <div key={card._id}>
                        <Link to={`/eachProduct/${card._id}`}>
                        <div>{card.photo&&<img src={card.photo} alt="card" style={{width:200,height:200}} />}</div>
                        <div>
                            <h2>model:{card.name}</h2>
                            <h4>price:{card.price}$</h4>
                            <h4>Category:{card.category}</h4>
                            <p>description:{card.description}</p>
                            <p>place:{card.Place}</p>
                        </div>
                        </Link>
                        {token?(
                            <>
                            <button onClick={()=>addToWishlist(card)}>add to wish list</button>
                            <button onClick={()=>addToCart(card)}>add to cart</button>
                            <button onClick={()=>deleteItem(card._id)}>delete</button>
                            {/* <DeleteButton cardItem={card}/> */}
                            <PaymentButton cardItem={card}/>
                            </>
                        ):(
                            <>
                            <button disabled>like</button>
                            <button disabled>delete</button>

                            </>
                        )}
                       
                        
                    </div>
                )
            })}
        </div>
     );
}
export default ImgMediaCard;
