import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../shared/hooks/useAuth";
import { USER_ROLE, ADMIN_ROLE } from "../../shared/userRoles.mjs";

export const Header = () => {

    const {isAuthenticated, logout, user} = useAuth();

    return (
        <header>
            <Navbar expand="md" className={styles.header}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className={styles.navbar_brand}>Tours</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className={styles.navbar_collapse}>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            {
                                isAuthenticated ? 
                                    <>
                                        {
                                            user.role === USER_ROLE && 
                                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                        }
                                        {
                                            user.role === ADMIN_ROLE &&
                                            <Nav.Link as={Link} to="/admin-dashboard">Dashboard</Nav.Link>
                                        }
                                        <Nav.Link as={Link} onClick={logout}>Logout</Nav.Link>
                                    </> :
                                    <>
                                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
