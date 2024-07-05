import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
    const [isExpanded, setIsExpanded] = useState(true); 

    function toggleNavbar() {
        setIsExpanded(!isExpanded);
    }

    return (
        <nav className={`navbar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="navbar-toggle" onClick={toggleNavbar}>
                {isExpanded ? '-' : '+'}
            </div>
            <div className="navbar-menu">
                <Link to="/"><div className="logo"></div></Link>
                {isExpanded && (
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/" className="button">HOME</Link>
                            <Link to="/signup" className="button">REGISTER</Link>
                            <Link to="/signin" className="button">SIGN IN</Link>
                            <Link to="/create" className="button">CREATE BOARD</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;