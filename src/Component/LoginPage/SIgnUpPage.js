import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBCheckbox,
    MDBInput
}
    from 'mdb-react-ui-kit';
import eazshop_logo from "../../Images/logo.png";
import {BrowserRouter as HashRouter, useNavigate} from "react-router-dom";
import "../../Styles/ScroolingCards.css";
import LoginImage from "../../Images/LoginImage.png";
import axios from "axios";
import $ from "jquery";
import Cookies from "js-cookie";
import NavigationBar from "../Navbar/Navbar";
function SignUpPage() {
    let navigate=useNavigate();
    const [customerName, setCustomerName] = useState('');
    const [mailId, setMailId] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    const handleCustomerNameChange = (e) => {
        setCustomerName(e.target.value);
    };

    const handleMailIdChange = async (e) => {
        setMailId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };
    const [customer,setCustomer]=useState('');

    const checkEmailPresence=async (e)=>{
        await axios.get(`http://localhost:8080/customerAPI/checkEmail/${mailId}`)
            .then(response => {
                if((response.data)===true){
                    $('.Enter-Details').addClass('d-block');
                }
                else{
                    handleSubmit();
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {

            const response = await fetch(`http://localhost:8080/customerAPI/saveCustomerDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerName,mailId,password,contact }),
            });
            // console.log(JSON.stringify({ customerName,mailId,password,contact }));

            if (response.ok) {
                console.log('Customer details added successfully');
                // Perform any additional actions or navigate to a different page
            } else {
                console.log(`Error adding Customer details`);
            }
            await axios.get(`http://localhost:8080/customerAPI/getCustomerByMailId/${mailId}`)
                .then(response => {
                    // Handle the response data
                    setCustomer(response.data);
                    Cookies.set('customerId', `${response.data.customerId}`);
                    Cookies.set('signUp', 'successful');
                    navigate(`/userDetails/${response.data.customerId}`);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });


        } catch (error) {
            console.log('Error adding Address details:', error);
        }
    };


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

                        <MDBCol md='6' >
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

                                <h3 className="fw-bold" style={{letterSpacing: '1px'}}>Sign Up for your account</h3>
                                <hr className="hr hr-blurry"/>

                                <MDBInput wrapperClass='mb-4' placeholder='Name' required id='formName' type='text'
                                          value={customerName} onChange={handleCustomerNameChange}/>
                                {/*<MDBInput wrapperClass='mb-4' placeholder='Username' required id='form1' type='text'/>*/}
                                <MDBInput wrapperClass='mb-4' placeholder='Email' required id='formEmail' type='email'
                                          value={mailId.toLowerCase()} onChange={handleMailIdChange}/>
                                <MDBInput wrapperClass='mb-4' placeholder='Password' required id='formPass' type='password'
                                          value={password} onChange={handlePasswordChange}/>
                                <MDBInput wrapperClass='mb-4' placeholder='Contact' required id='formContact' type='number' maxlength="10"
                                          value={contact} onChange={handleContactChange}/>

                                <div className='d-flex justify-content-center mb-4'>
                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' required />
                                </div>
                                <div className="Enter-Details fst-italic" style={{color:"red"}}>
                                    <p>Email Id already present.</p>
                                </div>

                                <button className="mb-4 p-2 bg-dark rounded" style={{color:"white"}} size="lg"
                                        onClick={()=>(checkEmailPresence())} type="submit">Sign Up</button>
                                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>
                                    Already have an account?
                                    <a onClick={()=>(navigate("/loginPage"))} className="RegisterHere">
                                        Sign In
                                    </a >
                                </p>
                                <hr className="hr hr-blurry"/>
                                <div className='d-flex flex-row justify-content-center'>
                                    <p>Terms of use|</p>
                                    <p>Privacy Policy</p>
                                    {/* <a href="https://www.mastercard.us/en-us/vision/who-we-are/terms-of-use.html" target="_blank" className="small text-muted me-1">Terms of use.</a>
                                    <a href="https://www.mastercard.us/en-us/vision/who-we-are/terms-of-use.html" target="_blank" className="small text-muted">Privacy policy</a> */}
                                </div>

                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>
        </div>
    );
}

export default SignUpPage;