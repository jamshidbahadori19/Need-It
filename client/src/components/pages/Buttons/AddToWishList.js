import axios from 'axios'
import jwt_decode from "jwt-decode"

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
            let response = await axios.put(`http://localhost:3000/addToWishBasket`,cardItem,
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
        <button onClick={()=>addToWishBasket()}>wish it</button>
    </> );
}

export default WishButton;