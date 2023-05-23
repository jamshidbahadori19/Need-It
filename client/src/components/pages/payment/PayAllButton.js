import axios from "axios"
/* import {Button} from "bootstrap" */

const checkoutButton = {
    alignItems:"center",
    width : "100%",
    color:"black",
    fontSize:22,
    borderRadius:30,
    border:"1px solid green",
    padding:12,
    background:"#8eb1de"
}

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
        <div style={{display:"flex",justifyContent:"center", alignContent:"center"}}>
            <button style={checkoutButton} onClick={()=>handleCheckout()}>checkout-All</button>
        </div>
    )
}

export default PayAllButton;