import { useState } from "react";
import {Button,Container,Form,Nav,Navbar,NavDropdown} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

function NavScrollExample() {
  let token = localStorage.getItem("token") 
  const navigate = useNavigate();
  let decoded;

  if (token) {
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  }

  function logout() {
    if(window.confirm("Are you sure that you want to logout?")){  
    localStorage.removeItem("token");
    }
  }

  return (
    <Navbar bg="light" expand="lg" className="m-3">
      <Container fluid>
        <Navbar.Brand href="#">NeedIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', margin:"20px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to={"home"}>Home</Nav.Link>
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
            <Nav.Link>favorites</Nav.Link>
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
          {token?(
          <>
          {/* <a to="#">{decoded ? decoded.username : null}</a> */}
          <Nav.Link as={Link} onClick={logout} to={"/user/singUp"}>logout</Nav.Link>
          </>)
          :
          (
          <>
            <Nav.Link as={Link} to={"/user/signUp"}>signup</Nav.Link>
            <Nav.Link as={Link} to={"/user/login"}>login</Nav.Link>
          </>)}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;