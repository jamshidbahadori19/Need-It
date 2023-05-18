
import axios from "axios";

const PostRegisterData = async (data) => {

  try {
    let response = await axios.post("http://localhost:3000/user/signUp",data);
    if (response.data.msg) {
        alert(response.data.msg);
    }
  } catch (error) {
    alert("Unable to Register...");
    console.log(error);
  }
};

export default PostRegisterData;