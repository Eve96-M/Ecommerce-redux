import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const MyNavBar = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" to="/" as={Link}>E-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" as={Link} to="/Login">Login</Nav.Link>
                            <Nav.Link href="#features" as={Link} to="/Purchases">Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow}>Cart (Sidebar)</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleClose={handleClose} />
        </div>
    );
};

export default MyNavBar;