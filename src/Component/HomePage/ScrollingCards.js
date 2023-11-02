import React from "react";
import Iphone from '../../Images/Iphone.jpg';
import Clothing from '../../Images/Clothing.jpg';
import Carousel from 'react-bootstrap/Carousel';
import MenFashion from "../../Images/MenFashion.jpg";
import "../../Styles/ScroolingCards.css";
export default function ScrollingCards(){
    return(
        <Carousel className="m-2 mt-0 mb-0 rounded z-0">
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-flex w-100 justify-content-center"
                        src={Iphone}
                        // src="Iphone.jpg/800x400?text=First slide&bg=373940"
                        alt="First slide"
                    />
                </div>
                <Carousel.Caption className="displayText">
                    <h3>Electronics</h3>
                    <p>"Each of us is now electronically connected to the globe, and yet we feel utterly alone."</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-block w-100"
                        src={Clothing}
                        alt="Second slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3>Women's Clothing</h3>
                    <p>"What you wear is how you present yourself to the world."</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-block w-100"
                        src={MenFashion}
                        alt="Third slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3>Men's Fashion</h3>
                    <p>
                        "Fashion is what you adopt when you don’t know who you are."
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}