import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../css/Products.css';
import {DataContext} from "../Context";


export class Products extends Component {
    static contextType = DataContext;

    render() {
        const {products} = this.context;
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
                            <button>Add to card</button>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Products;
