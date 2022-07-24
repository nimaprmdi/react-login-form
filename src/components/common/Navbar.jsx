import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <a className="navbar-brand" href="#">
                Navbar
            </a>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/login" className="mr-2">
                            Login
                        </Link>

                        <Link to="/register" className="mr-2">
                            register
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
