import React from 'react';
import {Link} from "react-router-dom";
import '../css/Products.css';
import {useProducts} from "../Context";

export default function Products() {
    const {products, addToCart} = useProducts();

    return (
        <div id="product">
            {
                products.map(product => (
                    <div className="card" key={product.id ? product.id : 1}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt=""/>
                        </Link>
                        <div className="content">
                            <h3>
                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                            </h3>
                            <span>${product.price}</span>
                            <p>{product.description}</p>
                        </div>
                        <button onClick={() => addToCart(product)}>Add to card</button>
                    </div>
                ))
            }
        </div>
    );
}
