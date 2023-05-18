
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { Button } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
function AddToCart({cardItem}) {
/*     const [color, setColor] = useState("blue") */
    const handleStyling ={
        width: '40vh',
        background:"blue",
        color:"black"
    }
/*    const click = color =>{
    setColor(color)
   }
   useEffect(()=>{
    document.getElementsByClassName('.addToCartButton').background= color
   },[color]) */

    async function handleAdding(){
        let token = localStorage.getItem("token") 
        let decoded;
    
        if (token) {
            try {
              decoded = jwt_decode(token);
            } catch (error) {
              console.log(error)
            }
          }

        try {
            let response = await axios.put(`http://localhost:3000/addToCart/${cardItem._id}`,cardItem,
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
        <>
            <Button className='addToCartButton' style={handleStyling} endIcon={<AddShoppingCartOutlinedIcon/>} onClick={()=>{handleAdding(); /* click("yellow") */ }}>addToCart</Button>
        </>
     );
}

export default AddToCart;