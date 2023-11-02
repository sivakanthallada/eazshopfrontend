import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../../Styles/ScroolingCards.css";
import Women_1 from "../../../Images/Women_1.jpg";
import Women_2 from "../../../Images/Women_2.jpg";
import Women_3 from "../../../Images/Women_3.jpg";
export default function WomenCourosel(){
    return(
        <Carousel className="z-0" style={{cursor:"pointer"}}>
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-flex w-100"
                        src={Women_1}
                        // src="Iphone.jpg/800x400?text=First slide&bg=373940"
                        alt="First slide"
                    />
                </div>
                {/*<Carousel.Caption className="displayText">*/}
                {/*    <h3>Electronics</h3>*/}
                {/*    <p>"Each of us is now electronically connected to the globe, and yet we feel utterly alone."</p>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-flex w-100"
                        src={Women_2}
                        alt="Second slide"
                    />
                </div>
                {/*<Carousel.Caption>*/}
                {/*    <h3>Women's Clothing</h3>*/}
                {/*    <p>"What you wear is how you present yourself to the world."</p>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-flex w-100"
                        src={Women_3}
                        alt="Third slide"
                    />
                </div>
                {/*<Carousel.Caption>*/}
                {/*    <h3>Men's Fashion</h3>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
        </Carousel>
    );
}