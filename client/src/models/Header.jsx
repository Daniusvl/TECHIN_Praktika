import React from 'react'
import { Link } from 'react-router-dom';

import styles from "./Header.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
    return (
        <header>
            <Navbar expand="md" className={`bg-body-tertiary ${styles.header}`}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className={styles.navbar_brand}>Ekskursijos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className={styles.navbar_collapse}>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard">dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/admin-dashboard">Admin dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
