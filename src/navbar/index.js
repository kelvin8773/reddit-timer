import React from 'react';
import {
    Link
} from "react-router-dom";

const Navbar = () => (
    <div className="Navbar">
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/search">Search</Link>
            </li>
            <li>
                <Link to="/work">How it works</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>
    </div>
);

export default Navbar;



