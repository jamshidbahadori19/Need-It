
import { useEffect, useState } from "react";
import axios from 'axios'

function ImgMediaCard() {
    const [cards,setCards] = useState([])
    async function getAllCards(){
        let response = await axios.get("http://localhost:3000/getAllProducts")
        /* console.log(response.data.get_product) */
        setCards(response.data.get_product)
    }
    useEffect(()=>{
        getAllCards()
    },[])
    return ( 
        <div style={{display:"flex",justifyContent:"space-evenly", margin:10}}>
            {cards.map((card)=>{
                return (
                    <div key={card._id}>
                        <div>{card.photo&&<img src={card.photo} alt="card" style={{width:200,height:200}} />}</div>
                        <div>
                            <h2>model:{card.name}</h2>
                            <h4>price:{card.price}$</h4>
                            <h4>Category:{card.category}</h4>
                            <p>description:{card.description}</p>
                            <p>place:{card.Place}</p>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
export default ImgMediaCard;
