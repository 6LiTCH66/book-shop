import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../css/Products.css';
import {useProducts} from "../Context";
import {useAuth} from "../AuthContext";
import {useHistory} from "react-router-dom";

export default function Products() {
    const {products, addToCart} = useProducts();
    const {currentUser} = useAuth();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');

    function PushMain(){
        history.push("/login")
    }

    return (
        <div>
            <div className="searchForBook">
                <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder="Search..."/>
            </div>
            <div id="product">
                {
                    products.filter((value) => {
                        if(searchTerm === ""){
                            return value
                        }
                        else if(value.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return value
                        }
                    }).map(product => (
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
                            <button onClick={currentUser ? ()=> addToCart(product): PushMain}>Add to cart</button>
                        </div>
                    ))
                }
            </div>
        </div>

    );
}
