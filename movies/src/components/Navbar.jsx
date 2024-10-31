import React from 'react';
import './Navbar.jsx';
import "../styles.css"

const Navbar = () => {
    return (
        <nav className='navbar' >
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/liked'>Liked Movies</a></li>
                <li><a href='/blocked'>Blocked Movies</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;