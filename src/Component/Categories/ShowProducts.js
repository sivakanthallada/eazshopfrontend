import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBIcon,
} from "mdb-react-ui-kit";
import NavigationBar from "../Navbar/Navbar";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import Cookies from 'js-cookie';

function ShowProduct() {
    const {productCode}=useParams();
    const [productData,setProductData]=useState([]);
    const fetchProductData = () => {
        axios.get(`http://localhost:8080/productAPI/getProductById/${productCode}`)
            .then(response => {
                // Handle the response data
                setProductData(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };
    const navigate=useNavigate();
    const handleBack=()=>{
        console.log(Cookies.get('all'));
      if(Cookies.get('all')==='true'){
          navigate(`/allCategories`);
      }
      else{
          navigate(`/productsByCategory/${Cookies.get('category')}`);
      }
    };
    useEffect(() => {
        fetchProductData();
    }, []);
    return (
        <div>
            <NavigationBar/>
            <MDBContainer fluid className="my-5">
                <MDBRow className="justify-content-center">
                    <MDBCol md="6">
                        <MDBCard className="text-black">
                            <MDBIcon fab icon="apple" size="lg" className="px-3 pt-3 pb-2" />
                            <div md="12" lg="3" className="mb-4 mb-lg-0 ps-3 pe-3">
                                <div>
                                    <img
                                        src={productData.image}
                                        className="w-100 rounded"
                                    />
                                    <a href="#!">
                                        <div
                                            className="mask"
                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                        ></div>
                                    </a>
                                </div>
                            </div>
                            <MDBCardBody>
                                <div className="text-center">
                                    <MDBCardTitle>{productData.productName}</MDBCardTitle>
                                    <p className="text-muted mb-4">{productData.productCode}</p>
                                </div>
                                <hr/>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <span>Manufacturer</span>
                                        <span>{productData.manufacturer}</span>
                                    </div>
                                    <hr/>
                                    <div className="d-flex justify-content-between">
                                        <span>Manufacture Date</span>
                                        <span>{productData.manufactureDate}</span>
                                    </div>
                                    <hr/>
                                    <div className="d-flex justify-content-between">
                                        <span>Expiry Date</span>
                                        <span>{productData.expiryDate}</span>
                                    </div>
                                    <hr/>
                                    <div className="d-flex justify-content-between">
                                        <span>Price</span>
                                        <span>{productData.price} &#8377;</span>
                                    </div>
                                </div>
                                <hr/>
                                <div className="d-flex justify-content-between total font-weight-bold">
                                    <span>Total</span>
                                    <span>{productData.price} &#8377;</span>
                                </div>
                                <hr/>
                                <div className="text-center">
                                    <button className="btn btn-dark" onClick={handleBack}>Back to Page</button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    );
}

export default ShowProduct;