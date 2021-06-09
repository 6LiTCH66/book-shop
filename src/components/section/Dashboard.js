import React, {useEffect, useState} from 'react';
import {useProducts} from "../Context";
import "../css/Dashboard.css"
import {faChevronLeft, faChevronRight, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import ItemsCarousel from 'react-items-carousel';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHistory} from "react-router-dom";
import 'swiper/swiper.scss';


export default function Dashboard () {
    const {getUserCart, products, getUserOrder} = useProducts()
    const [size, setSize] = useState(4);

    const [windowWidth, setWindowWidth] = useState(0);
    let history = useHistory()
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth <= 414){
            setSize(2)
        }
        else {
            setSize(4)
        }
    };

    function toProducts(){
        history.push("/product")
    }

    useEffect(()=>{
        getUserOrder()
        getUserCart();
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    },[])

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    return (
        <div style={{ padding: `0 ${chevronWidth}px` }} className="mainCon">
            <div className="main-carousel">
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={size}
                    gutter={20}
                    leftChevron={<FontAwesomeIcon icon={faChevronLeft} size="lg"/>}
                    rightChevron={<FontAwesomeIcon icon={faChevronRight} size="lg"/>}
                    outsideChevron
                    infiniteLoop={true}
                    chevronWidth={chevronWidth}>
                    {products.map((images, idx) => (
                        <div key={idx} className="mainImages">
                            <img src={images.image} alt=""/>
                            <strong>{images.title}</strong>
                            <p>{images.price} €</p>
                        </div>
                    ))}
                </ItemsCarousel>

                <div className="buttons">
                    <button className="viewBtn" onClick={toProducts}>View more <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>

            </div>
        </div>

    );
}

