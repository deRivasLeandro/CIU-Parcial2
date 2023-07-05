import React from 'react';
import '../css/footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../img/bb_logo.png';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={12} md={4} className='columna'>
            <h3>Créditos</h3>
            <p>Página realizada por Leandro de Rivas</p>
          </Col>
          <Col xs={12} md={4} className='columna'>
                <img src={logo} className='logo' alt="Logo de la página"/>
          </Col>
          <Col xs={12} md={4} className='columna'>
            <h3>Copyright &copy;</h3>
            <p>Las imágenes y las frases no son de mi propiedad, todos los derechos reservados para los autores.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;