import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
} from "mdb-react-ui-kit";
import "../../Styles/ecommerce-category-product.css";
import { FaStar } from "react-icons/fa";
import IncDecCounter from "./IncreamentDecrement";
import axios from 'axios';
import NavigationBar from "../Navbar/Navbar";
import { Container, Row, Col } from 'react-bootstrap';
import {useNavigate} from "react-router";
import Cookies from 'js-cookie';

function AllCategories(){
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    Cookies.set('all','true');
    Cookies.remove('category');
    useEffect(() => {
        fetchData();
    }, []);

    const customerId=Cookies.get('customerId',null);

    const addToCart=(productCode,image,productName,price)=>{
        console.log(customerId);
        if(customerId===undefined){
            navigate(`/${'error'}`);
        }
        else{
            try {
                // Make an API call to add to cart the product details
                const response = fetch(`http://localhost:8080/cartAPI/addToCart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productCode,customerId,image,productName,price }),
                });

                window.alert(`Added to cart successfully : ${productCode}`);
                console.log('Added to cart successfully : ',productCode);

            } catch (error) {
                console.log('Error adding Address details:', error);
            }
        }
    };

    const fetchData = () => {
        axios.get('http://localhost:8080/productAPI/getAllProducts')
            .then(response => {
                setData(response.data);
                console.log(data.length);
                if(response.data.length===0){
                    navigate(`/${'error'}`)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(current => !current);
    };
        return(
            <div>
                <NavigationBar/>
            { data.map(product =>
                <MDBContainer fluid style={
                    {
                        backgroundImage:"url('https://t4.ftcdn.net/jpg/04/10/47/27/360_F_410472701_KMPiSEm1HZDtWD1xT6kgLAiLs4RH33tE.jpg')",
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"cover"
                    }
                }>
                    <MDBRow className="justify-content-center mb-0">
                        <MDBCol md="12" xl="10">
                            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                            <div>
                                                <img
                                                    src={product.image}
                                                    className="w-100 rounded"
                                                />
                                                <a href="#!">
                                                    <div
                                                        className="mask"
                                                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                    ></div>
                                                </a>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <h5 className="d-flex">{product.productName}</h5>
                                            <div className="d-flex flex-row">
                                                <div className="text-danger mb-1 me-2">
                                                    <FaStar/>
                                                    <FaStar/>
                                                    <FaStar/>
                                                    <FaStar/>
                                                    <FaStar/>
                                                </div>
                                                <span>310</span>
                                            </div>
                                            <div className="mt-1 mb-0 text-muted d-flex">
                                                <span className="fw-bold">Category </span>
                                                <span className="text-primary"> • </span>
                                                <span> {product.category}</span>
                                                <hr/>
                                            </div>
                                            <div className="mt-1 mb-0 text-muted d-flex justify-content-start">
                                                <span>{product.productDesc}</span>
                                            </div>
                                        </MDBCol>
                                        <MDBCol
                                            md="6"
                                            lg="3"
                                            className="border-sm-start-none border-start"
                                        >
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">{product.price}</h4>
                                                <span className="text-danger">
                      <s>{product.price+1000}</s>
                    </span>
                                            </div>
                                            <h6 className="text-success d-flex">Free shipping</h6>
                                            <div className="d-flex flex-column mt-4">

                                                <button className="btn btn-dark" size="sm" onClick={()=>(navigate(`/productDetails/${product.productCode}`))}>
                                                    Details
                                                </button>
                                                <button className="btn btn-outline-dark mt-2" size="sm" style={{border:"2px solid black"}}
                                                        onClick={()=>(addToCart(product.productCode,product.image,product.productName,product.price))}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )}
            </div>
        );
}

export default AllCategories;