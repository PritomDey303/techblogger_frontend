import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navItems = (
    <>
      <li>
        <Link
          className="text-decoration-none text-dark fw-semibold px-2 mx-1"
          to={"/"}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="text-decoration-none text-dark fw-semibold px-2 mx-1"
          to={"/blogs"}
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link
          className="text-decoration-none text-dark fw-semibold px-2 mx-1"
          to={"/login"}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className="text-decoration-none text-dark fw-semibold px-2 mx-1"
          to={"/register"}
        >
          Register
        </Link>
      </li>
      <li>
        <NavDropdownMenu
          title="Dashboard"
          id="collasible-nav-dropdown"
          className="text-dark fw-semibold dd-menu"
        >
          <DropdownSubmenu href="#action/3.7" title="Manage Blogs">
            <NavDropdown.Item href="#action/8.1">Create Blog</NavDropdown.Item>

            <NavDropdown.Item href="#action/9.1">Update Blog</NavDropdown.Item>
          </DropdownSubmenu>
        </NavDropdownMenu>
      </li>
    </>
  );

  return (
    <Navbar bg="light shadow py-3" expand="lg">
      <Container>
        <Link className="text-decoration-none text-dark fw-bold fs-4" to={"/"}>
          TechBlogger
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">{navItems}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
