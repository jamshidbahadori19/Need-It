
import axios from 'axios'
import jwt_decode from "jwt-decode"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton } from '@mui/material';
import { useEffect } from "react";

function DeleteButton({cardItem,props}) {
    let token = localStorage.getItem("token") 
    let decoded;

    if (token) {
        try {
          decoded = jwt_decode(token);
        } catch (error) {
          console.log(error)
        }
      }

    async function handleDelete(){
        try {
            let response = await axios.delete(`http://localhost:3000/deleteProduct/${cardItem._id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 200) {
            alert("Product deleted successfully!");
            props()
          } else {
            alert("Can not delete the card");
        }
        } catch (error) {
        console.log("Error deleting product");
        }
    }

    return ( 
    <>
        <IconButton aria-label="delete"  onClick={()=>handleDelete()}>
            <DeleteRoundedIcon />
        </IconButton>
    </>
     );
}

export default DeleteButton;