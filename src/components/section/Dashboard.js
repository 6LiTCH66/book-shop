import React, {useEffect, useState} from 'react';
import {useProducts} from "../Context";
import "../css/Dashboard.css"
export default function Dashboard () {
    const {getUserCart, products} = useProducts()

    useEffect(()=>{
        getUserCart();
    },[])

    return (
        <div>
            Dashboard
        </div>
    );
}

