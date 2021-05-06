import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../css/Details.css'
import fire from "../../firebase";

export class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            detailId: this.props.match.params.id,
        }
    }
    getItemDetails = () => {
        if (this.state.detailId){
            fire.database().ref("products/" + this.state.detailId)
                .once('value', (snapshot)=>{
                    let child = []
                    child.push(snapshot.val())
                    this.setState({ product: child })
            })
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
