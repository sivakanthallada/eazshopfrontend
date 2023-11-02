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
import Cookies from 'js-cookie';

function EditProduct(){
    const adminId=Cookies.get('adminId');
    const {productCode}=useParams();
    const [manufacturer, setManufacturer] = useState('');
    const [manufactureDate, setManufactureDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [price, setPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const navigate=useNavigate();

    const handleManufacturerChange = (e) => {
        setManufacturer(e.target.value);
    };

    const handleManufactureDateChange = (e) => {
        setManufactureDate(e.target.value);
    };

    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleProductDescChange = (e) => {
        setProductDesc(e.target.value);
    };

    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage]=useState('https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImagePreview(reader.result);
            setImage(reader.result); // Send the preview URL to the backend
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            // Make an API call to add product details
            const response = await fetch(`http://localhost:8080/productAPI/modifyProductDetails/${productCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ manufacturer,manufactureDate,expiryDate,price,productDesc,image}),
            });
            console.log(JSON.stringify({ manufacturer,manufactureDate,expiryDate,price,productDesc ,image}));

            if (response.ok) {
                console.log(`Product details modified successfully ${productCode}`);
                // Perform any additional actions or navigate to a different page
            } else {
                console.log(`Error modifying Product details ${productCode}`);
            }
            navigate(`/adminDetails/${adminId}`);

        } catch (error) {
            console.log(`Error modifying Product details: ${productCode}`, error);
        }
    };

    return (
        <div>
            <NavigationBar/>
            <div className='p-5 ps-9 pe-9' style={{
                backgroundImage:"url('https://ak.picdn.net/shutterstock/videos/3868361/thumb/1.jpg?ip=x480')",
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover"
            }}>

                <MDBCard>

                    <MDBRow className='g-0 d-flex align-items-center'>

                        <MDBCol md='4'>
                            <MDBCardImage src={image} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                        </MDBCol>

                        <MDBCol md='8'>

                            <div className="ps-3 pe-4">
                                <h3 className="mt-3">Edit Product: {productCode}</h3>
                                <hr/>

                                <MDBInput wrapperClass='mb-4'  placeholder='Manufacturer' id='form1' type='text'
                                          value={manufacturer} onChange={handleManufacturerChange}/>
                                <div className="d-flex ms-2">Manufacture Date : <input className='mb-4 rounded ps-2 pe-2 ms-2'  placeholder='Manufacture Date' id='form1' type='date'
                                                                                       value={manufactureDate} onChange={handleManufactureDateChange}/></div>
                                <div className="d-flex ms-2">Expiry Date : <input className='mb-4 rounded ps-2 pe-2 ms-2'  placeholder='Expiry Date' id='form1' type='date'
                                                                                  value={expiryDate} onChange={handleExpiryDateChange}/></div>
                                <MDBInput wrapperClass='mb-4'  placeholder='Price' id='form1' type='number'
                                          value={price} onChange={handlePriceChange}/>
                                <MDBInput wrapperClass='mb-4'  placeholder='Product Description' id='form1' type='text'
                                          value={productDesc} onChange={handleProductDescChange}/>

                                <MDBInput wrapperClass='mb-4' type="file" onChange={handleImageUpload} />
                                <div className="justify-content-start mb-3" style={{color:"red"}}> please restrict image size to 20KB</div>

                                <button className="btn btn-dark me-2 mb-4" type="submit" onClick={handleSubmit}>Save</button>
                                <button className="btn btn-dark me-2 mb-4" onClick={()=>(navigate(`/adminDetails/${adminId}`))}>Cancel</button>

                            </div>

                        </MDBCol>

                    </MDBRow>

                </MDBCard>
            </div>
        </div>
    );
}
export default EditProduct;