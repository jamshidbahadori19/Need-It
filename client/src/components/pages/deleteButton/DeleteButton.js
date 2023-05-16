
import axios from 'axios'
import jwt_decode from "jwt-decode"

const DeleteButton = ({cardItem})=>{
    if (token) {
        try {
          decoded = jwt_decode(token);
        } catch (error) {
          console.log(error)
        }
      }
      
    const deleteProduct=()=>{
        axios.delete(`http://localhost:3000/deleteProduct/${cardItem._id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        .then((response)=>{
            if (response.status === 200) {
                alert("Movie deleted successfully!");
                getAllCards()
              } else {
                alert("Can not delete the card");
            }
        })
        
    }
    return ( 
    <>
    <button onClick={()=>deleteProduct()}>delete</button>
    </> 
    );
}

export default DeleteButton;