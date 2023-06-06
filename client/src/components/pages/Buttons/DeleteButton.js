
import axios from 'axios'
import jwt_decode from "jwt-decode"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton } from '@mui/material';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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

      async function handleNotification(response){
        let confirmation = window.confirm("Are you sure that you want to delete?")
        if(confirmation){
          if(response=="deleted product"){
            NotificationManager.success('deleted');
            props()
        }else{
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
        }
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
        handleNotification(response.data.msg)
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