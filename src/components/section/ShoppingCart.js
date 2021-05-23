import React, {useEffect} from 'react';
import '../css/ShoppingCart.css'
import {useProducts} from "../Context";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default function ShoppingCart() {
    const {userCart, increaseItem, decreaseItem, deleteItem, totalAmount, quantity, getUserCart} = useProducts();

    useEffect(()=>{
        getUserCart()
    },[])

    if (userCart.length > 0) {
        return (
            <>
                {userCart.map(item => (
                    <div className="details cart" key={item.id ? item.id : 1}>
                        <img src={item.image} alt=""/>
                        <div className="box">
                            <div className="row">
                                <h2>{item.title}</h2>
                                <span>${Math.fround(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <p>{item.description}</p>
                            <p>{item.content}</p>
                            <div className="amount">
                                <FontAwesomeIcon icon={faMinus} onClick={() => decreaseItem(item)} className="count" size="sm"/>
                                <span>{item.quantity}</span>
                                <FontAwesomeIcon icon={faPlus} onClick={() => increaseItem(item)} className="count" size="sm"/>
                            </div>
                        </div>
                        <div className="delete">
                            <button onClick={() => deleteItem(item)} className="btnDelete">Delete</button>
                        </div>
                    </div>
                ))
                }
                <div className="total">
                    <Link to="/">Payment</Link>
                    <h3>Total:
                        {Math.fround(totalAmount).toFixed(2)}
                    </h3>
                </div>
            </>
        );
    } else {
        return (
            <div className="emptyCart">
                <Link to="/product">
                    <h2 className="nothingHere">Back to books shopping</h2>
                </Link>
            </div>

        )
    }
}

