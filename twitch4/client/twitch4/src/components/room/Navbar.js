import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/Navbar.css'

// import home icon from react-icons
import { FaHome } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { UisHouseUser } from '@iconscout/react-unicons-solid'
import { UilSync } from '@iconscout/react-unicons'

function Navbar() {
    const [syncToggle, setSyncToggle] = useState(false)

    const styles = {
        color: 'red',
        border: '0',
    }

    

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                Twitchy
            </div>
            <ul className='navbar-menu'>
                <Link className='navbar-link'><UisHouseUser style={styles} className='icon' /></Link>
            </ul>
        </nav>
    )
}

export default Navbar
