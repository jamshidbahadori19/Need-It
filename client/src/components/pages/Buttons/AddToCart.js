
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { Button } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {NotificationManager,NotificationContainer} from 'react-notifications';

function AddToCart({cardItem}) {
/*     const [color, setColor] = useState("blue") */
    const handleStyling ={
        width: '16.2rem',
        background:"blue",
        color:"black"
    }

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
            if (response.status === 200) {
                NotificationManager.success('added to the cart basket','Close after 2000ms',2000);
              } else {
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                  alert('callback');
                });
            }

        } catch (error) {
            console.error(error);
        }
    }
    return ( 
        <>
            <Button className='addToCartButton' style={handleStyling} endIcon={<AddShoppingCartOutlinedIcon/>} onClick={()=>handleAdding()}>addToCart</Button>
            <NotificationContainer/>
        </>
     );
}

export default AddToCart;