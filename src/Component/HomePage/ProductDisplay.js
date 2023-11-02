import React, {useState} from "react";
import {
    MDBContainer,
    MDBCardGroup,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter
} from 'mdb-react-ui-kit';
import "../../Styles/MCColor.css";
import {useNavigate} from "react-router-dom";
import '../../Styles/SignIn.css';
import ElectronicsCourosel from "./Courosel/ElectronicsCourosel";
import MenCourosel from "./Courosel/MenCourosel";
import WomenCourosel from "./Courosel/WomenCourosel";
function ProductDisplay(){
        let navigate=useNavigate();
        const fetchData =(inputParam)=>{
            navigate(`/productsByCategory/${inputParam}`);
        };
        return(
            <div className="bg-dark-subtle m-2 p-2 text-dark bg-opacity-50 mt-3 rounded">
                <h3>Categories</h3>
                <hr className="hr hr-blurry"/>
                <MDBContainer className="mt-3">
                    <MDBCardGroup>
                        <MDBCard className="me-2 border-4 rounded">
                            <ElectronicsCourosel/>
                            <MDBCardBody>
                                <MDBCardTitle>Electronics</MDBCardTitle>
                                <MDBCardText>
                                    Mobile,
                                    Wearables,
                                    TVs, Set Top Boxes, Monitors,
                                    Laptops, Tablets, Computers,
                                    Appliances & White Goods,
                                    Computers, Printers, Scanners and many more..
                                </MDBCardText>
                                <MDBCardFooter className="bottom-0">
                                    <button type="button" className="btn btn-dark" onClick={()=>(fetchData("electronics"))}>Shop Now</button>
                                </MDBCardFooter>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="me-2 border-4 rounded">
                            <MenCourosel/>
                            <MDBCardBody>
                                <MDBCardTitle>Men's Fashion</MDBCardTitle>
                                <MDBCardText>
                                    Shirts, Pants, Trousers, Suits, Ties, Belts, Leather Shoes, Ethnic wear,
                                    Western Wear, Formal Wear, Casual Wear, Sports Wear, Outerwear Clothing
                                    and many more..
                                </MDBCardText>
                                <MDBCardFooter className="bottom-0">
                                    <button type="button" className="btn btn-dark"onClick={()=>(fetchData("men's fashion"))}>Shop Now</button>
                                </MDBCardFooter>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="border-4 rounded">
                            <WomenCourosel/>
                            <MDBCardBody>
                                <MDBCardTitle>Women's Clothing</MDBCardTitle>
                                <MDBCardText>
                                    Wedding dress, Sweater, Shirts, Sheath dress, Dress
                                    Gym clothes, Tops, Shorts, Hoodie, Jeans,Coat,
                                    Dress, Pants, Swimsuit, Skirt and many more..
                                </MDBCardText>
                                <MDBCardFooter className="bottom-0">
                                    <button type="button" className="btn btn-dark" onClick={()=>(fetchData("women's clothing"))}>Shop Now</button>
                                </MDBCardFooter>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCardGroup>
                </MDBContainer>
                <hr className="hr hr-blurry"/>
                <a className="mt-2 RegisterHere" onClick={()=>(navigate("/allCategories"))}>
                    See all categories
                </a >
                <hr className="hr hr-blurry"/>
            </div>

        );
}
export default ProductDisplay;