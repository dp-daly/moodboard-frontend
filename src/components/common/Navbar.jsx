import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPayload } from '../../lib/auth.js';
import '../../styles/App.css';
import '../../styles/Navbar.css';

function Navbar() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); 

    let location = useLocation();

    useEffect(() => {
        const payload = getPayload();
        if (payload) {
            setIsLoggedIn(true);
            setUserId(payload.sub);
            console.log('HERE IS THE PAYLOAD ', payload)
        } else {
            setIsLoggedIn(false);
            setUserId(null);
            console.log('THERE IS NO PAYLOAD')
        }
    }, [location]);

    function logout() {
        setIsLoggedIn(false);
        setUserId(null);
        localStorage.removeItem('token');
    }

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
                            {!isLoggedIn && <Link to="/register" className="button">REGISTER</Link>}
                            {!isLoggedIn && <Link to="/signin" className="button">SIGN IN</Link>}
                            {isLoggedIn && <Link to={`/${userId}`} className="button">YOUR PROFILE</Link>}
                            <Link to="/create" className="button">CREATE BOARD</Link>
                            <div className="logoutdiv">{isLoggedIn && <button className="logout" onClick={logout}>Sign out</button>}</div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;