import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div id="branding">
                    <h1><span className='highlight'>Kosela</span> Motors</h1>
                </div>
                <nav>
                    <ul>
                        <li className='current'><Link to="/">Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/services'>Services</Link></li>
                        <li><Link to='/gallery'>Gallery</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
