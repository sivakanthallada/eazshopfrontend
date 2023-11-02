import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import "../../Styles/EditAddress.css";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import NavigationBar from "../Navbar/Navbar";
import {BrowserRouter as HashRouter} from "react-router-dom";

function AddAddress(){
    const {customerId}= useParams();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const navigate=useNavigate();

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to update address details
            const response = await fetch(`http://localhost:8080/addressAPI/addAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId, street, city,state,country,zipCode }),
            });
            console.log(JSON.stringify({ customerId, street, city,state,country,zipCode }));

            if (response.ok) {
                console.log('Address details added successfully');
                // Perform any additional actions or navigate to a different page
            } else {
                console.log('Error adding Address details');
            }
            navigate(`/userDetails/${customerId}`);

        } catch (error) {
            console.log('Error adding Address details:', error);
        }
    };

    return (
        <div className='p-5 ps-9 pe-9' style={{
            backgroundImage:"url('https://ak.picdn.net/shutterstock/videos/3868361/thumb/1.jpg?ip=x480')",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover"
        }}>
            <NavigationBar/>
            <MDBCard>

                <MDBRow className='g-0 d-flex align-items-center'>

                    <MDBCol md='4'>
                        <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                    </MDBCol>

                    <MDBCol md='8'>

                        <MDBContainer>
                            <h3>Add Address For UserName : {customerId}</h3>
                            <hr/>

                            <MDBInput wrapperClass='mb-4' name="street" placeholder='Street' id='form1' type='text'
                                      value={street} onChange={handleStreetChange}/>
                            <MDBInput wrapperClass='mb-4' name="city" placeholder='City' id='form1' type='text'
                                      value={city} onChange={handleCityChange}/>
                            <MDBInput wrapperClass='mb-4' name="state" placeholder='State' id='form1' type='text'
                                      value={state} onChange={handleStateChange}/>
                            <MDBInput wrapperClass='mb-4' name="country" placeholder='Country' id='form1' type='text'
                                      value={country} onChange={handleCountryChange}/>
                            <MDBInput wrapperClass='mb-4' name="zipCode" placeholder='Zip Code' id='form1' type='number'
                                      value={zipCode} onChange={handleZipCodeChange}/>

                            <button className="btn btn-dark me-2" type="submit" onClick={handleSubmit}>Save</button>
                            <button className="btn btn-dark me-2" onClick={()=>(navigate(`/userDetails/${customerId}`))}>Cancel</button>

                        </MDBContainer>

                    </MDBCol>

                </MDBRow>

            </MDBCard>
        </div>
    );
}
export default AddAddress;