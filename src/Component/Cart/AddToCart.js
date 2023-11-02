import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import NavigationBar from "../Navbar/Navbar";
import "../../Styles/AddToCart.css";
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router";
import Cookies from 'js-cookie';
import axios from "axios";
import {BsFillTrashFill} from "react-icons/bs";
import IncDecCounter from "../Categories/IncreamentDecrement";

export default function AddToCart() {
    const navigate=useNavigate();
    const [cartDetails, setCartDetails] = useState([]);
    const customerId=Cookies.get('customerId');
    const fetchCartDetails = () => {
        axios.get(`http://localhost:8080/cartAPI/getCartDetailsByCustomerId/${customerId}`)
            .then(response => {
                setCartDetails(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

    };
    const [productDetails, setProductDetails] = useState([]);
    const fetchProductDetails = async () => {
        const updatedProductDetails = [];

        for (const cartItem of cartDetails) {
            try {
                const response = await fetch(`http://localhost:8080/productAPI/getProductById/${cartItem.productCode}`);
                const productData = await response.json();
                const updatedCartItem = {
                    ...cartItem,
                    product: productData,
                };
                updatedProductDetails.push(updatedCartItem);
            } catch (error) {
                console.error(error);
            }
        }

        setProductDetails(updatedProductDetails);

    };
    const deleteFromCart = (productCode)=> {
        const userInput = window.confirm(`Are you sure about deleting Product form cart: ${productCode}`);
        if(userInput){
            axios.delete(`http://localhost:8080/cartAPI/deleteCartByProductId/${productCode}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedProduct = [...cartDetails].filter(product => product.productCode !== productCode);
                setCartDetails(updatedProduct);
            });
            console.log(`User clicked yes for deleting Product from cart : ${productCode}`);
        }
        else{
            console.log(`User clicked no for deleting Product from cart : ${productCode}`);
        }
    };
    Cookies.set('discount',0);
    const [couponCode, setCouponCode] = useState('');
    const handleCouponCodeChange = (e) => {
        setCouponCode(e.target.value);
    };
    const [couponDetails,setCouponDetails]=useState('');
    const [currentDate, setCurrentDate] = useState(getFormattedDate());
    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const applyCoupon=(price)=>{
        axios.get(`http://localhost:8080/couponAPI/getCouponById/${couponCode}`)
            .then(response => {
                setCouponDetails(response.data);
                if((response.data.validTill).toString()>=(currentDate)){
                    Cookies.set('discount',`${response.data.discountPercentage}`);
                    Cookies.set('couponCode',`${response.data.couponCode}`);
                    setCouponDetails('');
                    window.alert("Coupon Applied successfully !!");
                }
                else{
                    setCouponDetails('');
                    window.alert("Coupon Expired !!");
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };
    const deleteAfterOrder = (productCode)=> {
        axios.delete(`http://localhost:8080/cartAPI/deleteCartByProductId/${productCode}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProduct = [...cartDetails].filter(product => product.productCode !== productCode);
            setCartDetails(updatedProduct);
        });

    };
    const placeOrder=async (productCode, quantity) => {
        const addressId = (window.prompt(`Enter the address Id for placing the order : ${productCode}`)).toUpperCase();
        try {
            // Make an API call to update address details
            const response = await fetch(`http://localhost:8080/ordersAPI/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({customerId, productCode, couponCode, quantity, addressId}),
            });

            if (response.ok) {
                window.alert(`Order Placed successfully : ${productCode}`);
                deleteAfterOrder(productCode);
                // Perform any additional actions or navigate to a different page
            } else {
                window.alert(` Error while placing order : ${productCode}`);
            }

        } catch (error) {
            console.log('Error placing order:', error);
        }
    };
    useEffect(() => {
        fetchCartDetails();
        fetchProductDetails();
    }, [cartDetails]);
    return (
        <div>
            <NavigationBar/>
            <section className="h-100 gradient-custom">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center my-4">
                        <MDBCol md="8">
                            <MDBCard className="mb-4">
                                <MDBCardHeader className="py-3">
                                    <MDBTypography tag="h5" className="mb-0 d-flex">
                                        <FaArrowLeft className="mt-1 me-2" onClick={()=>(navigate('/'))} style={{cursor:"pointer"}}/> Continue Shopping
                                    </MDBTypography>
                                    <hr/>
                                    <MDBTypography tag="h5" className="mb-0">
                                        Cart items
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    { cartDetails.map(product =><MDBRow>
                                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                            <MDBRipple rippleTag="div" rippleColor="light"
                                                       className="bg-image rounded hover-zoom hover-overlay">
                                                <img
                                                    src={product.image}
                                                    className="w-100" />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" , }}>
                                                    </div>
                                                </a>
                                            </MDBRipple>
                                        </MDBCol>

                                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                            <p>
                                                <strong>{product.productName}</strong>
                                            </p>

                                            <button className="me-1 mb-2 btn btn-dark"
                                                        title="Remove item" onClick={()=>(deleteFromCart(product.productCode))}>
                                                <BsFillTrashFill onClick={()=>(deleteFromCart(product.productCode))}/>
                                            </button>
                                        </MDBCol>
                                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                            <IncDecCounter productCode={product.productCode}/>
                                            <MDBInput wrapperClass='mb-2 mt-3' name="street" placeholder='Coupon Code' id='form1' type='text'
                                                      value={couponCode.toUpperCase()} onChange={handleCouponCodeChange}/>
                                            <button className="btn btn-dark mb-2" onClick={()=>(applyCoupon(product.price))}>Apply Coupon</button>
                                            <p className=" mt-3 text-start text-md-center">
                                                Amount : <strong>{(product.price*(Cookies.get(product.productCode)))}</strong>
                                            </p>
                                        </MDBCol>

                                        <MDBRow className="mt-4 ms-1" >
                                            <button className="btn btn-dark" onClick={()=>(placeOrder(product.productCode,Cookies.get(product.productCode)))}>Place order</button>
                                        </MDBRow>
                                        <hr className="my-4" />
                                    </MDBRow>)}


                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <p>
                                        <strong>Expected shipping delivery</strong>
                                    </p>
                                    <p className="mb-0">28/7/2023 - 30/7/2023</p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody>
                                    <p>
                                        <strong>We accept</strong>
                                    </p>
                                    <MDBCardImage className="me-2" width="45px"
                                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                                  alt="Visa" />
                                    <MDBCardImage className="me-2" width="45px"
                                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                                  alt="American Express" />
                                    <MDBCardImage className="me-2" width="45px"
                                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                                  alt="Mastercard" />
                                    <MDBCardImage className="me-2" width="45px"
                                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                                  alt="PayPal acceptance mark" />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    );
}