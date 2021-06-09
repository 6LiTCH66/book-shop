import React, {useState} from 'react';
import Menu from './svg/bars-solid.svg';
import Close from './svg/times-solid.svg';
import CartIcon from './svg/shopping-cart-solid.svg';
import {Link, useHistory} from 'react-router-dom';
import './css/Header.css';
import {useAuth} from "./AuthContext";
import {useProducts} from "./Context";

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const {quantity, setUserCart} = useProducts();

    function menuToggle(){
        setToggle(!toggle);
    }

    async function handleLogout(){
        try{
            await logout()
            setUserCart([])
            history.push('/')
        }
        catch(error) {
            alert(error.response);
        }
    }

    return (
        <header className="mainHeader">
            <div className="menu" onClick={menuToggle}>
                <img src={Menu} alt="" width="20"/>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">Book Store</Link>
                </h1>
            </div>
            <nav>
                <ul className={toggle ? "toggle": ""}>
                    <li>
                        <Link to="/" replace >Home</Link>
                    </li>

                    <li>
                        <Link to="/product" replace >Product</Link>
                    </li>

                    <li>
                        <Link to="/order" replace >My orders</Link>
                    </li>

                    <li>
                        {!currentUser ?(
                                <Link to="/login" replace >Login / Register</Link>
                            ):
                            (
                                <button onClick={handleLogout} className="logoutBtn">Log out</button>
                            )
                        }

                    </li>

                    <li>
                        <Link to="/profile" replace >Profile</Link>
                    </li>

                    <li className="close" onClick={menuToggle}>
                        <img src={Close} alt="" width="20"/>
                    </li>
                </ul>
                <div className="nav-cart">
                    <span>{quantity}</span>
                    <Link to="/cart">
                        <img src={CartIcon} alt="" width="20"/>
                    </Link>

                </div>
            </nav>
        </header>
    );
}
