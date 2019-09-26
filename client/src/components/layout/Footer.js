import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>
                <Link to='/dashboard'>Kosela</Link> Motors, Copyright &copy; 2019
            </p>
        </footer>
    )
}

export default Footer
