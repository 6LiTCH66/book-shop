import React, {Component, useEffect} from 'react';
import '../css/UserOrder.css'
import {useProducts} from "../Context";
import {useAuth} from "../AuthContext";
import {Link} from "react-router-dom";

export default function UserOrder() {
    const { userOrder, getUserOrder } = useProducts();
    const {currentUser} = useAuth();

    useEffect(()=>{
        getUserOrder()
    }, [])
    if (currentUser){
        return (
            <div>
                <h1 id='title'>Orders</h1>
                <table id='order'>
                    <tbody>
                    <tr>
                        <th>NUMBER</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                    </tr>
                    {userOrder.map((order, index) => (
                        <tr key={index}>
                            <td>{order.orderNumber}</td>
                            <td>{order.status}</td>
                            <td>{order.time}</td>
                            <td>{order.totalAmount} €</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div className="noUser">
                <Link to="/login">
                    <strong>You need to be logged in.</strong>
                </Link>


            </div>
        )
    }

}
