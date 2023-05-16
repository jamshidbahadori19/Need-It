
import {Button,Container,Form,Nav,Navbar,NavDropdown} from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import Cart from "../pages/payment/Cart";
import CartForm from "../pages/payment/Cart";


function NavScrollExample() {
  let token = localStorage.getItem("token") 
  let navigate = useNavigate()
  let decoded;

  if (token) {
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  function logout() {
    if(window.confirm("Are you sure that you want to logout?")){  
    localStorage.removeItem("token")
    }
  }

  return (
    <Navbar bg="light" expand="lg" className="m-3">
      <Container fluid>
        <Navbar.Brand href="#">NeedIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        {token?(
            <>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', margin:"20px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"productForm"}>Add Products</Nav.Link>
            <NavDropdown title="Category" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Shirt</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
               Jeans
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                T-shirt
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
            <Nav.Link  as={Link} to={"/wishList"} >Wish-List</Nav.Link>
            <Button as={Link} to={"/cartForm"} style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle">
              <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"-12"}} width="30" height="30" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg> 
              <div className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
                style={{color:"white",width:"1.5rem",height:"1rem",position:"absolute", bottom:0, right:0, transform:"translate(25%,25%)"}}>0</div>
              
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
            {/* <Nav.Link as={Link} to={"/user/singUp"}>signup</Nav.Link> */}
          </Form>
          
          {/* <a to="#">{decoded ? decoded.username : null}</a> */}
          <Nav.Link as={Link} onClick={logout} to={"/user/login"}>logout</Nav.Link>
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