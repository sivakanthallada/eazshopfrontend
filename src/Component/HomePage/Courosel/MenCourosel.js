import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../../Styles/ScroolingCards.css";
import Men_1 from "../../../Images/Men_1.jpg";
import Men_2 from "../../../Images/Men_2.jpg";
import Men_3 from "../../../Images/Men_3.jpg";
export default function MenCourosel(){
    return(
        <Carousel style={{cursor:"pointer"}}>
            <Carousel.Item>
                <div className="item">
                    <img
                        className="d-flex w-100"
                        src={Men_1}
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
                        src={Men_2}
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
                        src={Men_3}
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