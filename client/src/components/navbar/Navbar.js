
import {Button,Container,Form,Nav,Navbar,NavDropdown} from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import axios from "axios";
import {useState } from "react";
import { useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

function NavScrollExample() {
  const [cartLength, setCartLength] = useState(0)
  let token = localStorage.getItem("token") 
  let navigate = useNavigate()
  let decoded;

  function logout() {
    let confirmation = window.confirm("Are you sure that you want to logout?")
    if(confirmation){  
    localStorage.removeItem("token")
    navigate("/user/login")
    }else{
      return
    }
  }

  if (token) {
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

 

  async function getLengthOfCart(){
    let response = await axios.get("http://localhost:3000/getCartProducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartLength(response.data.length)
  }

  useEffect(() => {
    getLengthOfCart();
  }, []);


  return (
    <Navbar bg="light" expand="lg" className="m-3">
      <Container fluid>
        <Navbar.Brand href="#">NeedIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll" >
        {token?(
            <>
          <Nav
            className="me-auto my-2 my-lg-1"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link as={Link} to={"/"}><HomeOutlinedIcon/></Nav.Link>
            <Nav.Link as={Link} to={"productForm"}><AddOutlinedIcon/> Products</Nav.Link>
            <NavDropdown title="Category" id="navbarScrollingDropdown" disabled>
              <NavDropdown.Item href="#action3">Shirt</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
               Jeans
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                T-shirt
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
            <Nav.Link  as={Link} to={"/wishList"} >Wish-List<BookmarkAddedOutlinedIcon/></Nav.Link>
            <Button as={Link} to={"/cartForm"} style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle">
              <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"-12"}} width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg> 
              <div className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
                style={{color:"white",width:"1.5rem",height:"1rem",position:"absolute", bottom:0, right:0, transform:"translate(25%,25%)"}}>
                  {cartLength}
                </div>
            </Button>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
          <Nav.Link as={Link} onClick={logout}><LogoutIcon/></Nav.Link>
          </>
          )
          :
          (
          <>
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link disabled>Add Products</Nav.Link>
            <NavDropdown title="Category" id="navbarScrollingDropdown" disabled></NavDropdown>
            <Nav.Link disabled>favorites</Nav.Link>
            <Nav.Link as={Link} to={"/user/signUp"}>signup</Nav.Link>
            <Nav.Link as={Link} to={"/user/login"}>login</Nav.Link>
          </>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;