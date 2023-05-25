import { useState,useEffect } from 'react';
import {Button,Col,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import storage from '../../fireBase/FireBase';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import {v4} from "uuid"
import "./addProduct.css"
function ProductForm() {
  const[name,setName]=useState("")
  const[category,setCategory] = useState("")
  const[image,setImage]=useState("")
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[place,setPlace] = useState("")
  const [validated, setValidated] = useState(false);

  let token = localStorage.getItem("token") 
  let navigate = useNavigate()
  let decoded;

  if (token) {
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      navigate("/user/login");
    }
  }

/*   const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }; */

  async function handleSubmit(e){
      let addProduct = {
        name : name,
        category:category,
        photo: image,
        description: description,
        price:price,
        Place:place,
      }
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } 
      setValidated(true)
        if(validated== true){
        let response = await axios.post("http://localhost:3000/createProduct",
        addProduct,{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        },)
        .then((res)=>alert(res.data.msg))
      }
  }


   const handleImageUpload = async()=>{
    const imageRef = ref(storage, `images/${image.name + v4()}`)
    const snapShot = await uploadBytes(imageRef,image)
    const url = await getDownloadURL(snapShot.ref)
    const settingImage = setImage(url)
    console.log(url)
    
  }

  return (
    <div className='formContainer'>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='subFormContainer'>
      {token?(<>
        <Form.Group as={Col} md="8" controlId="validationCustom01" className='formGroup' >
          
          <Form.Label className='formLabel'>Name of product</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="product Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom02" className='formGroup'>
          <Form.Label className='formLabel'>category</Form.Label>
          <Form.Select required value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option>Jeans</option>
            <option>Shirt</option>
            <option>T-shirt</option>
            <option>Hoodies</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustomUsername" className='formGroup'>
          <Form.Label className='formLabel'>photo</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
             required
              type="file"
              placeholder="photo Url"
              name="picture"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </InputGroup>
          <Button onClick={handleImageUpload} style={{backgroundColor:"darkolivegreen"}}>addingPhoto</Button>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom03" className='formGroup'>
          <Form.Label className='formLabel'>description</Form.Label>
          <Form.Control  required type="text" placeholder="description your product" value={description}
            onChange={(e)=>setDescription(e.target.value)}/>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom04" className='formGroup'>
          <Form.Label className='formLabel'>Price</Form.Label>
          <Form.Control required type="price" placeholder="Price in kr"  value={price}
            onChange={(e)=>setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="validationCustom05" className='formGroup'>
          <Form.Label className='formLabel'>Place</Form.Label>
          <Form.Control required  type="text" placeholder="place" value={place}
            onChange={(e)=>setPlace(e.target.value)}/>
        </Form.Group>
      <Form.Group className="mb-3 formGroup">
      </Form.Group>
      <Button type="submit">Submit form</Button>
      </>):(<>
        <div>
          please log in first
        </div>
      </>)}
    </Form> 
    </div>
  );
}

export default ProductForm;