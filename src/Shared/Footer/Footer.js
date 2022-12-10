import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
    </>
  );
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          {navItems}
        </ul>
        <p className="text-center text-muted">&copy; 2022 TechBlogger</p>
      </footer>
    </div>
  );
};

export default Footer;
