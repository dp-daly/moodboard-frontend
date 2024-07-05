import { Link } from 'react-router-dom'

function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-menu is-active">
                <Link to="/"><div className="logo"></div></Link>
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to="/" className="button is-dark">Home</Link>
                        <Link to="/signup" className="button is-warning">Sign up</Link>
                        <Link to="/signin" className="button is-success">Sign in</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar