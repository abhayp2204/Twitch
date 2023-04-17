import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/Navbar.css'

// import home icon from react-icons
import { FaHome } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { UisHouseUser } from '@iconscout/react-unicons-solid'


function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                Twitchy
            </div>
            <ul className='navbar-menu'>
                {/* <Link to='/' className='navbar-link'>Home</Link> */}
                {/* Fahome icon remove bg */}
                <Link to='/' className='navbar-link'><UisHouseUser style={{ color: 'red' }} className='icon' /></Link>
            </ul>
        </nav>
    )
}

export default Navbar
