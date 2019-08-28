import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <Link to="/">
                <i className="fa fa-home"></i> Home
            </Link>
            <Link to="/messeges">
                <i className="fa fa-comments-o"></i> Messanger
            </Link>            
        </nav>
    </aside>