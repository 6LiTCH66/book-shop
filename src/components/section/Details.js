import React, {Component} from 'react';
import {DataContext} from "../Context";
import {Link} from "react-router-dom";
import '../css/Details.css'

export class Details extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }
    getItemDetails = () => {
        if (this.props.match.params.id){
            const res = this.context.products;
            const findItem = res.filter(item => {
                return item.id === this.props.match.params.id
            })
            this.setState({ product:findItem });
        }
    }
    componentDidMount() {
        this.getItemDetails();
    }

    render() {
        const {product} = this.state;
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
                                <Link to="/cart" className="cart">Add to Cart</Link>
                            </div>
                        </div>
                    ))
                }
            </>
        );
    }
}

export default Details;
