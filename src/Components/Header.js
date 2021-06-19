import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap' 
import {LinkContainer} from 'react-router-bootstrap'
import '../Components/Header.css'
import {Link} from 'react-router-dom'

function Header({color,color2}) {
    return (
        <header>
            <Navbar bg="dark" sticky="top" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/" className="text-decoration-none">
                        <Navbar.Brand >BoiPoka.com</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="header-component">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>CART</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/wishlist">
                                <Nav.Link><i style={{color}} className="fas fa-heart"></i>Wishlist</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i>SIGN IN</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

Header.defaultProps = {
    color: '#E30743',
}

export default Header

