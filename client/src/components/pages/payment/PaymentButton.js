import axios from "axios"
/* import {Button} from "bootstrap" */

const PaymentButton = ({cardItem})=>{
    const handleCheckout=()=>{
        const response = axios.post("http://localhost:3000/create-checkout-session",
        cardItem,
        cardItem._id
        ).then((res)=>{
            console.log(cardItem)
            if(res.data.url){
                window.location.href= res.data.url
            }
        })
        
    }
    
    return (
        <div>
            <button onClick={()=>handleCheckout()}>checkout</button>
        </div>
    )
}

export default PaymentButton;