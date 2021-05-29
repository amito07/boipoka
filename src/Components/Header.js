import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap' 
import '../Components/Header.css'

function Header() {
    return (
        <header>
            <Navbar bg="dark" sticky="top" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">BoiPoka.com</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="header-component">
                        <Nav.Link href="/cart"><i class="fas fa-shopping-cart"></i>CART</Nav.Link>
                        <Nav.Link href="/login"><i class="fas fa-user"></i>SIGN IN</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

