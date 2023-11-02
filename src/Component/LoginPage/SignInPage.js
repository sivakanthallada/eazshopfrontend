import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput, MDBCheckbox
}
    from 'mdb-react-ui-kit';
import eazshop_logo from "../../Images/logo.png";
import '../../Styles/MCColor.css';
import '../../Styles/SignIn.css';
import {BrowserRouter as HashRouter, useNavigate} from "react-router-dom";
import LoginImage from "../../Images/LoginImage.png";
import {useParams} from "react-router";
import axios from "axios";
import $ from 'jquery';
import "../../Styles/Authentication.css";
import Cookies from 'js-cookie';
import NavigationBar from "../Navbar/Navbar";
function SignInPage() {
    let navigate=useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const [customer,setCustomer]=useState('');
    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            await axios.get(`http://localhost:8080/customerAPI/getCustomerById/${userName}`)
                .then(response => {
                    // Handle the response data
                    setCustomer(response.data);
                    if (response.data.password === password) {
                        navigate(`/userDetails/${response.data.customerId}`);
                        Cookies.set('customerId', `${response.data.customerId}`);
                        Cookies.set('signIn', 'successful');

                    } else {
                        $('.Enter-Details').addClass('d-block');
                    }
                })
                .catch(error => {
                    // Handle errors
                    $('.Enter-Details').addClass('d-block');
                    console.error('Error:', error);
                });


        } catch (error) {
            console.log(`Error signing in the customer ${customer.customerId}`, error);
        }
    };
    useEffect(()=>{
    },[customer]);

    return (
        <div style={{
            backgroundImage:"url('https://www.addictioncenter.com/app/uploads/2020/01/online_shopping_addiction-scaled.jpeg')",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
        }} className="w-100">
            <NavigationBar/>
            <MDBContainer className="py-5">

                <MDBCard>
                    <MDBRow className='g-0'>

                        <MDBCol md='6'>
                            <MDBCardImage src={LoginImage} alt="login form" className='rounded-start w-100 h-100'/>
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>

                                <div className='d-flex flex-row mt-2'>
                                    <img src={eazshop_logo} style={{height:"50px"}}/>
                                    <span className="h1 fw-bold mb-0">Eaz</span>
                                    <span className="h1 fw-bold mb-0 MCColor">Shop</span>
                                </div>
                                <hr className="hr hr-blurry"/>
                                <h3 className="fw-bold" style={{letterSpacing: '1px'}}>Sign into your account</h3>
                                <hr className="hr hr-blurry"/>
                                <MDBInput wrapperClass='mb-4' placeholder='UserName' required id='formControlLg1' type='text' size="lg"
                                          value={userName.toUpperCase()} onChange={handleUserNameChange} />
                                <MDBInput wrapperClass='mb-4' placeholder='Password' required id='formControlLg' type='password' size="lg"
                                          value={password} onChange={handlePasswordChange}/>

                                <div className='d-flex justify-content-center mb-4'>
                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' required />
                                </div>
                                <div className="Enter-Details fst-italic" style={{color:"red"}}>
                                    <p>Enter Vaild Username and Password.</p>
                                </div>
                                <button className="mb-4 p-2 bg-dark rounded" style={{color:"white"}} size="lg" onClick={()=>(handleSubmit())}>Sign In</button>
                                <a className="small text-muted" href="#!">Forgot password?</a>
                                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>
                                    Don't have an account?
                                    <a onClick={()=>(navigate("/signUpPage"))} className="RegisterHere">
                                        Register here
                                    </a >
                                </p>
                                <hr className="hr hr-blurry"/>
                                <div className='d-flex flex-row justify-content-center'>
                                    <a href="https://www.mastercard.us/en-us/vision/who-we-are/terms-of-use.html" target="_blank" className="small text-muted me-1">Terms of use.</a>
                                    <a href="https://www.mastercard.us/en-us/vision/who-we-are/terms-of-use.html" target="_blank" className="small text-muted">Privacy policy</a>
                                </div>

                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>
        </div>
    );
}

export default SignInPage;