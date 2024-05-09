import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    console.log(user);
    console.log(cartItems);

    const logoutHandler = () => {
        setUser(null)
        localStorage.setItem('user', null);
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">DevShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart">
                                <i className='fas fa-shopping-cart'></i> Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                            { cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                                        </Badge>
                                    )
                                }
                                </Nav.Link>
                                { user ? (
                                    <NavDropdown title={user.name} id='username'>
                                        <Nav.Link href="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </Nav.Link>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (

                                    <Nav.Link href="/login"><i className='fas fa-user'></i> Sign In</Nav.Link>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header