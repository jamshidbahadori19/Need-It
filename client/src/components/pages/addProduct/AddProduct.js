import { useState } from 'react';
import {Button,Col,Form,InputGroup,Row} from "react-bootstrap"
import axios from 'axios'
import {useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

function ProductForm() {
  const[name,setName]=useState("")
  const[category,setCategory] = useState("")
  const[image,setImage]=useState("") 
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[place,setPlace] = useState("")

  let token = localStorage.getItem("token") 
  let navigate = useNavigate()
  let decoded;

  if (token) {
    try {
      decoded = jwt_decode(token);
      console.log(decoded)
    } catch (error) {
      navigate("/user/login");
    }
  }


  async function addProduct(e){
      e.preventDefault()
      let addProduct = {
        name : name,
        category:category,
        photo: image,
        description: description,
        price:price,
        Place:place,
      }
      let response = await axios.post("http://localhost:3000/createProduct",
      addProduct,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res)=>alert(res.data.msg))
      
  }



  return (
    <Form noValidate onSubmit={addProduct}>
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
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>category</Form.Label>
          {/* <Form.Control
            required
            type="text"
            placeholder="category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          /> */}
          <Form.Select required value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option>shirt</option>
            <option>Jeans</option>
            <option>T-shirt</option>
          </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>photo</Form.Label>
          <InputGroup hasValidation>
            {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
            <Form.Control
              type="text"
              placeholder="photo Url"
              required
              value={image}
              onChange={(e)=>setImage(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>description</Form.Label>
          <Form.Control type="text" placeholder="description your product" required value={description}
            onChange={(e)=>setDescription(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Price</Form.Label>
          <Form.Control type="price" placeholder="Price in kr" required  value={price}
            onChange={(e)=>setPrice(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Place</Form.Label>
          <Form.Control type="text" placeholder="place" required   value={place}
            onChange={(e)=>setPlace(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
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
  );
}

export default ProductForm;