import React, {useEffect, useState} from 'react';

import '../css/Details.css'
import fire from "../../firebase";
import {useProducts} from "../Context";


export default function Details(props) {
    const [product, setProduct] = useState([]);
    const detailId = props.match.params.id;

    const {addToCart} = useProducts();

    const getItemDetails = () => {
        if (detailId){
            fire.database().ref("products/" + detailId)
                .once('value', (snapshot)=>{
                    let child = []
                    child.push(snapshot.val())
                    setProduct(child)
            })
        }
    }

    useEffect(()=>{
        getItemDetails()
    }, [])

    return (
        <>
            {
                product.map(item => (
                    <div className="details" key={item.id ? item.id: 1}>
                        <img src={item.image} alt=""/>
                        <div className="box">
                            <div className="row">
                                <h2>{item.title}</h2>
                                <span>${item.price}</span>
                            </div>
                            <p>{item.description}</p>
                            <p>{item.content}</p>
                            <button className="cart" onClick={() => addToCart(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))
            }
        </>
    );
}
