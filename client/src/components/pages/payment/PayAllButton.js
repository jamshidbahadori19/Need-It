import axios from "axios"
/* import {Button} from "bootstrap" */

const PayAllButton = ({cardItem})=>{
    const handleCheckout=()=>{
        axios.post(`http://localhost:3000/payAllProducts`,{
            cardItem
        })
        .then((res)=>{
            if(res.data.url){
                window.location.href= res.data.url
            }
        })
        
    }
    
    return (
        <div>
            <button onClick={()=>handleCheckout()}>checkout-All</button>
        </div>
    )
}

export default PayAllButton;