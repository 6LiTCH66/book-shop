import React, {useEffect} from 'react';
import {useProducts} from "../Context";

export default function Dashboard () {
    const {getUserCart, userCart} = useProducts()

    useEffect(()=>{
        getUserCart();
    },[])

    return (
        <div>
            DashBoard
        </div>
    );
}

