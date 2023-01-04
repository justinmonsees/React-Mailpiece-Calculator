import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>MailPiece Calculator</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
