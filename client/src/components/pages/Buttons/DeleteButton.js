
import axios from 'axios'
import jwt_decode from "jwt-decode"

function DeleteButton({cardItem}) {
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
          } else {
            alert("Can not delete the card");
        }
        } catch (error) {
        console.log("Error deleting product");
        }
    }
    return ( 
    <>
        <button onClick={()=>handleDelete()}>delete</button>
    </>
     );
}

export default DeleteButton;