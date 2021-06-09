import React from 'react';
import Products from './section/Products';
import Details from "./section/Details";
import Login from "./section/Login";
import Profile from "./section/Profile";
import ShoppingCart from "./section/ShoppingCart";
import Dashboard from "./section/Dashboard";
import UserOrder from "./section/UserOrder";
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import {useAuth} from "./AuthContext";
import Admin from "./section/Admin";

export default function Section() {
    const {currentUser} = useAuth();
    const location = useLocation()
    return (
        <section>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/product" component={Products}/>
                <Route path="/product/:id" component={Details}/>

                {currentUser && location.pathname === '/login' ? (
                    <Redirect to="/" />
                ):(
                    <Route exact path="/login" component={Login}/>
                )}

                {!currentUser && location.pathname === '/profile' ? (
                    <Redirect to="/login" />

                ):(
                    <Route path="/profile" component={Profile}/>

                )}


                <Route path="/cart" component={ShoppingCart}/>

                <Route path="/order" component={UserOrder}/>

                {currentUser !== null && currentUser.email === "admin@admin.com" && location.pathname === '/admin' ? (
                    <Route path="/admin" component={Admin}/>
                ):(
                    <Redirect to="/" />
                )}

            </Switch>
        </section>
    );
}
