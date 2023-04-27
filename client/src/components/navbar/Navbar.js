import { useState } from "react";
import {Button,Container,Form,Nav,Navbar,NavDropdown} from "react-bootstrap"
import { Link } from "react-router-dom";

function NavScrollExample() {
  
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
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;