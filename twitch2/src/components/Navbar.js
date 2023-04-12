import React from 'react'
import '../css/Navbar.css'

function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                Twitch
            </div>
            <ul className='navbar-menu'>
                <li className='navbar-item'>
                    <a href='#' className='navbar-link'>Home</a>
                </li>
                <li className='navbar-item'>
                    <a href='#' className='navbar-link'>Rooms</a>
                </li>
                <li className='navbar-item'>
                    <a href='#' className='navbar-link'>About</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
