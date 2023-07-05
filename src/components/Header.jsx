import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../img/bb_logo.png';
import '../css/header.css';

const Header = () => {
    return (
        <Navbar fixed="top" expand="lg" id='navegacion'>
          <Container>
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo de la página" className='logo'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto me-auto">
                <Nav.Link href="#fix-personajes">Personajes</Nav.Link>
                <Nav.Link href="#fix-buscador">Buscador</Nav.Link>
                <Nav.Link href="#fix-frases">Frases</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="https://www.facebook.com/BreakingBad/?locale=es_LA" target='__blank'>Facebook</Nav.Link>
                <Nav.Link href="https://twitter.com/i/flow/login?redirect_after_login=%2FBreakingBad" target='__blank'>Twitter</Nav.Link>
                <Nav.Link href="https://www.instagram.com/breakingbad/?hl=es" target='__blank'>Instagram</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}
 
export default Header;