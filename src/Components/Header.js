import React from 'react'
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap' 
import {LinkContainer} from 'react-router-bootstrap'
import '../Components/Header.css'
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {logout} from '../Actions/userAction'

function Header({color,color2}) {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        dispatch(logout())
    }

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
                            {userInfo ?  (
                                <NavDropdown title={userInfo.name} id='username'>
                                    {/* profile */}
                                    <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/myorders'>
                                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                        ):(
                                        <LinkContainer to="/login">
                                        <Nav.Link><i className="fas fa-user"></i>SIGN IN</Nav.Link>
                                        </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/getalluser'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/productlist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>

                                </NavDropdown>
                            )}
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

