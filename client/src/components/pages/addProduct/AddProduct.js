import { useState,useEffect } from 'react';
import {Button,Col,Form,InputGroup,Row} from "react-bootstrap"
import axios from 'axios'
import {useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import storage from '../../fireBase/FireBase';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import {v4} from "uuid"

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
    setImage(url)
    console.log(url)
  }

  return (
    <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {token?(<>
        <Row className="mb-3" >
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name of product</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="product Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
  
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Please choose a name.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>category</Form.Label>
          <Form.Select required value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option disabled>Choose</option>
            <option>shirt</option>
            <option>Jeans</option>
            <option>T-shirt</option>
          </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>photo</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
             required
              type="file"
              placeholder="photo Url"
              name="picture"
              onChange={(e)=>setImage(e.target.files[0])}
            />
        <Button onClick={handleImageUpload}>addingPhoto</Button>
        <Form.Control.Feedback>remember to click on the addingPhoto!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose an image.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>description</Form.Label>
          <Form.Control  required type="text" placeholder="description your product" value={description}
            onChange={(e)=>setDescription(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide description.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Price</Form.Label>
          <Form.Control required type="price" placeholder="Price in kr"  value={price}
            onChange={(e)=>setPrice(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please set a Price.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Place</Form.Label>
          <Form.Control required  type="text" placeholder="place" value={place}
            onChange={(e)=>setPlace(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a place.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
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