import React, {Component} from 'react';
import Products from './section/Products';
import Details from "./section/Details";
import Login from "./section/Login";
import Profile from "./section/Profile";
import ShoppingCart from "./section/ShoppingCart";
import UserOrder from "./section/UserOrder";

import {Route, Switch} from 'react-router-dom';

class Section extends Component {
    render() {
        return (
            <section>
                <Switch>
                    <Route exact path="/product" component={Products}/>
                    <Route path="/product/:id" component={Details}/>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/cart" component={ShoppingCart}/>
                    <Route path="/order" component={UserOrder}/>
                </Switch>
            </section>
        );
    }
}

export default Section;
