import React from 'react';
import './Navbar.jsx';
import '../styles.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar' >
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/liked'>Liked Movies</Link></li>
                <li><Link to='/blocked'>Blocked Movies</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;