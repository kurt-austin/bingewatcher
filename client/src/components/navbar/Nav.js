import React from "react";
import { Link, useLocation } from "react-router-dom";
function Nav() {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
                    Home
            </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/search"
                    className={location.pathname === "/search" ? "nav-link active" : "nav-link"}
                >
                    Search
            </Link>
            </li>
        </ul>
    );
}
export default Nav;