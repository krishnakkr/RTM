import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Register_Login_NavBar = ({login, setLogin}) => {
  return (
    <Navbar bg="dark" variant="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/register">PageHeader</Link>
        </Navbar.Brand>

        <Nav className="ms-auto">

        {login &&
            <>
            <Nav.Link>
                <div style={{ color: "white" }}>
                <Link to="/login">Login</Link>
                </div>
            </Nav.Link>
            <Nav.Link>
                <div style={{ color: "white" }}>
                <Link to="/register">Register</Link>
                </div>
            </Nav.Link>
            </>
        }

        {!login &&
            <Nav.Link>
                <div style={{ color: "white" }}>
                <Link to="/register" onClick={()=>{setLogin(true)}}>Logout</Link>
                </div>
            </Nav.Link>
        }

        </Nav>
      </Container>
    </Navbar>
  );
};


export default Register_Login_NavBar;

