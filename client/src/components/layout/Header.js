import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const onClick = e => {
        if (e.target.closest('a')) {
            document.querySelectorAll("a").forEach(node => node.classList.remove('highlight'));
            e.target.closest('a').classList.add("highlight");
        }
    }

    return (
        <header>
            <div className="container">
                <div id="branding">
                    <h1><span className='highlight'>Kosela</span> Motors</h1>
                </div>
                <nav>
                    <ul>
                        <li onClick={onClick}><Link to="/" className='highlight'>Home</Link></li>
                        <li onClick={onClick}><Link to='/about'>About</Link></li>
                        <li onClick={onClick}><Link to='/services'>Services</Link></li>
                        <li onClick={onClick}><Link to='/gallery'>Gallery</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
