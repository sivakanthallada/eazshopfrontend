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

function EditCustomer(){
    const [customer, setCustomer] = useState({});
    const {customerId}=useParams();
    const [customerName, setCustomerName] = useState('');
    const [contact, setContact] = useState('');
    const navigate=useNavigate();

    const handleCustomerNameChange = (e) => {
        setCustomerName(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to update customer details
            const response = await fetch(`http://localhost:8080/customerAPI/modifyCustomerDetails/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerName,contact }),
            });
            console.log(JSON.stringify({ customerName,contact }));

            if (response.ok) {
                console.log('Customer details updated successfully');
                // Perform any additional actions or navigate to a different page
            } else {
                console.log('Error updating customer details');
            }
            navigate(`/userDetails/${customerId}`);

        } catch (error) {
            console.log('Error updating customer details:', error);
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
                            <h3>Edit Customer : {customerId}</h3>
                            <hr/>

                            <MDBInput wrapperClass='mb-4' name="customerName" placeholder='Full Name' id='form1' type='text'
                                      value={customerName} onChange={handleCustomerNameChange}/>
                            <MDBInput wrapperClass='mb-4' name="contact" placeholder='Contact' id='form1' type='number'
                                      value={contact} onChange={handleContactChange}/>

                            <button className="btn btn-dark me-2" type="submit" onClick={handleSubmit}>Save</button>
                            <button className="btn btn-dark me-2" onClick={()=>(navigate(`/userDetails/${customerId}`))}>Cancel</button>

                        </MDBContainer>

                    </MDBCol>

                </MDBRow>

            </MDBCard>
        </div>
    );
}
export default EditCustomer;