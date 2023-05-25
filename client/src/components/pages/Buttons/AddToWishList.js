import axios from 'axios'
import jwt_decode from "jwt-decode"
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { IconButton } from '@mui/material';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function WishButton({cardItem}) {
    let token = localStorage.getItem("token") 
    let decoded;

    if (token) {
        try {
          decoded = jwt_decode(token);
        } catch (error) {
          console.log(error)
        }
      }

    async function addToWishBasket(){
        try {
            let response = await axios.put(`http://localhost:3000/addToWishBasket/${cardItem._id}`,cardItem
            ,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            })
            if (response.status === 200) {
                NotificationManager.success("Added to wish Basket!",'Close after 2000ms',2000);
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
  {/*       <button onClick={()=>addToWishBasket()}>wish<BookmarkAddOutlinedIcon/></button> */}
            <IconButton aria-label="add to favorites" onClick={()=>addToWishBasket()}>
                <BookmarkAddOutlinedIcon/>
            </IconButton>
            <NotificationContainer/>
    </> );
}

export default WishButton;