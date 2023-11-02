import React, {useEffect, useState} from "react";
import "../../Styles/ViewCoupon.css";
import NavigationBar from "../Navbar/Navbar";
import axios from "axios";
import {useNavigate} from "react-router";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader, MDBCardImage,
    MDBCol,
    MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem,
    MDBRipple,
    MDBRow, MDBTooltip,
    MDBTypography
} from "mdb-react-ui-kit";
import {FaArrowLeft} from "react-icons/fa";
import Cookies from "js-cookie";
import {hover} from "@testing-library/user-event/dist/hover";
export default function ViewCouponUser(){
    const [coupons, setCoupons]=useState([]);
    const navigate = useNavigate();
    const customerId=Cookies.get('customerId');
    useEffect(() => {
        fetchCoupon();
    }, []);
    const fetchCoupon = () => {
        axios.get('http://localhost:8080/couponAPI/getAllCoupons')
            .then(response => {
                setCoupons(response.data);
                if(response.data.length===0){
                    navigate(`/${'error'}`)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return(
        <div>
            <NavigationBar/>
            <section className="h-100 gradient-custom">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center my-4">
                        <MDBCol md="8">
                            <MDBCard className="mb-4">
                                <MDBCardHeader className="py-3">
                                    <MDBTypography tag="h5" className="mb-0 d-flex">
                                        <FaArrowLeft className="mt-1 me-2" onClick={()=>(navigate(`/userDetails/${customerId}`))} style={{cursor:"pointer"}}/> Back to Page
                                    </MDBTypography>
                                    <hr/>
                                    <MDBTypography tag="h5" className="mb-0">
                                        All Coupons
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBRow className="d-flex justify-content-center ps-3 pe-3">
                                    { coupons.map(coupon =>
                                        <div className="d-block cardCoupon text-center ms-2 me-2 mt-4 mb-4">
                                            <div className="imageCoupon"><img src="https://i.imgur.com/DC94rZe.png" width="150"/></div>
                                            <div className="imageCoupon2"><img src="https://i.imgur.com/DC94rZe.png" width="150"/></div>
                                            <h1 className="mt-5">{coupon.discountPercentage}% OFF</h1><span className="d-block">On Everything</span><h4 className="d-block">{coupon.couponCode}</h4>
                                            <div className="mt-4"><small>ValidTill : {coupon.validTill}</small></div>
                                        </div>)}
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

        </div>
    );
}