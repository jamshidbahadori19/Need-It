
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import PaymentButton from "../payment/PaymentButton";

function ImgMediaCard({id}) {
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
                            <button>like</button>
                            <button onClick={()=>deleteItem(card._id)}>delete</button>
                            <PaymentButton cardItem={cards}/>
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
