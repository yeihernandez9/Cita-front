import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="btn btn-outline-primary">
                    Home | 
                </Link>
                <Link to="/about" className="btn btn-outline-primary">
                     About | 
                </Link>
                <Link to="/blog" className="btn btn-outline-primary">
                    Blog
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
