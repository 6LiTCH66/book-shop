import React from 'react';
import {Link} from 'react-router-dom'
import './css/AdminHeader.css'

export default function AdminHeader(){
    return(
        <header className="adminHeader">
            <div className="adminPanel">
                <Link to="/admin">Hello, admin</Link>
            </div>
        </header>
    )
}
