import React from "react";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <NavbarBs>
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/dashboard" as={NavLink}>
            Dashboard
          </Nav.Link>
          <Nav.Link to="/browse" as={NavLink}>
            Browse
          </Nav.Link>
          <Nav.Link to="/progress" as={NavLink}>
            Progress
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
