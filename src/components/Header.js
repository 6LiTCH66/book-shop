import React, {Component} from 'react';
import Menu from './svg/bars-solid.svg';
import Close from './svg/times-solid.svg';
import CartIcon from './svg/shopping-cart-solid.svg';
import {Link} from 'react-router-dom';
import './css/Header.css';


class Header extends Component {
    state = {
        toggle: false
    }
    menuToggle = () => {
        this.setState({toggle: !this.state.toggle})
    }
    render() {
        const {toggle} = this.state;
        return (
            <header>
                <div className="menu" onClick={this.menuToggle}>
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
                            <Link to="/login" replace >Login / Register</Link>
                        </li>

                        <li>
                            <Link to="/profile" replace >Profile</Link>
                        </li>

                        <li className="close" onClick={this.menuToggle}>
                            <img src={Close} alt="" width="20"/>
                        </li>
                    </ul>
                    <div className="nav-cart">
                        <span>0</span>
                        <Link to="/cart">
                            <img src={CartIcon} alt="" width="20"/>
                        </Link>

                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
