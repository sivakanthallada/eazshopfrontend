import React from "react";
import ScrollingCards from "./ScrollingCards";
import ProductDisplay from "./ProductDisplay";
import NavigationBar from "../Navbar/Navbar";
import {BrowserRouter as HashRouter} from "react-router-dom";
import "../../Styles/Transition.css";
export default function HomePage(){
    return(
        <div>
            <NavigationBar/>
            <ScrollingCards/>
            <ProductDisplay/>
        </div>
    );
}