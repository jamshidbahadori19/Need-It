
import axios from 'axios'
import { useState } from 'react';
import jwt_decode from "jwt-decode"
import { Button } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
function AddToCart({cardItem}) {
    const [isAdded, setIsAdded] = useState(false);
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
            <Button endIcon={<AddShoppingCartOutlinedIcon/>} onClick={()=>handleAdding()}>addToCart</Button>
        </>
     );
}

export default AddToCart;