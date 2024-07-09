import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getPayload } from '../../lib/auth.js'
import '../../styles/App.css'
import '../../styles/HorizontalNavbar.css'

export default function HorizontalNavbar() {
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

    return (<div className="navbar-menu">
                <h1 className = "headerh1">ArtBoards</h1>
                    <div className="navbar-items">
                        <div className="buttons">
                            <Link to="/" className="button">Home</Link>
                            {!isLoggedIn && <Link to="/register" className="button">Register</Link>}
                            {!isLoggedIn && <Link to="/signin" className="button">Sign in</Link>}
                            {isLoggedIn && <Link to={`/${userId}`} className="button">Your boards</Link>}
                            {isLoggedIn && <Link to="/create" className="button" id="create">Create a new board</Link>}
                            <div className="logoutdiv">{isLoggedIn && <button className="logout" onClick={logout}>Sign out</button>}</div>
                        </div>
                    </div>
            </div>
    );
}