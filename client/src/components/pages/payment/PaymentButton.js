import axios from "axios"
/* import {Button} from "bootstrap" */

const PaymentButton = ({cardItem})=>{
    const handleCheckout=()=>{
        axios.post(`http://localhost:3000/create-checkout-session`,{
            cardItem, 
            userId : cardItem._id
        })
        .then((res)=>{
            if(res.data.url){
                window.location.href= res.data.url
            }
        })
        
    }
    
    return (
        <div>
            <button onClick={()=>handleCheckout()}>Buy now</button>
        </div>
    )
}

export default PaymentButton;