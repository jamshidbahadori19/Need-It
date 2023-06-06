
import axios from "axios";
import {NotificationManager,NotificationContainer} from 'react-notifications'

const PostRegisterData = async (data) => {

  try {
    let response = await axios.post("http://localhost:3000/user/signUp",data);
    if (response.data.msg==="registered successfully") {
      NotificationManager.success("registered successfully",'Close after 2000ms',2000)
    }else{
      NotificationManager.warning(response.data.msg,'Close after 2000ms',2000)
    }
  } catch (error) {
    alert("Unable to Register...");
    console.log(error);
  }
};

export default PostRegisterData;