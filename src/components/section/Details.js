import React, {useEffect, useState} from 'react';
import '../css/Details.css'
import fire from "../../firebase";
import {useProducts} from "../Context";
import {useAuth} from "../AuthContext";
import RatingIcon from '../section/RatingIcon'
import {useHistory} from "react-router-dom";

export default function Details(props) {
    const [product, setProduct] = useState([]);
    const detailId = props.match.params.id;
    const {addToCart, rating, getUsersRating} = useProducts();
    const {currentUser} = useAuth();
    const history = useHistory();

    function PushMain(){
        history.push("/login")
    }
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

    useEffect(() => {
        getItemDetails()
        getUsersRating(detailId);

    }, [])

    const [hoverRating, setHoverRating] = useState(0);

    const onMouseEnter = (index) => {
        setHoverRating(index)
    }
    const onMouseLeave = () => {
        setHoverRating(0)
    }

    const onSaveRating = (index) => {
        console.log(rating)
        if (currentUser){
            fire.database().ref("products/" + detailId + "/users-rate/" + currentUser.uid + "/").update({
                rating: index,
            })
        }
        else {
            PushMain()
        }
    }

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
                            <button className="cart" onClick={currentUser ? ()=> addToCart(product): PushMain}>Add to Cart</button>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((index, key) => {
                                    return(
                                        <RatingIcon
                                            key={key}
                                            index={index}
                                            rating={rating}
                                            hoverRating={hoverRating}
                                            onMouseEnter={onMouseEnter}
                                            onMouseLeave={onMouseLeave}
                                            onSaveRating={onSaveRating}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))
            }


        </>
    );
}
