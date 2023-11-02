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

function AddProduct(){
    const adminId=Cookies.get('adminId');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [model, setModel] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufactureDate, setManufactureDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [price, setPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const navigate=useNavigate();

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

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

    const handleSubmit = (e) => {
        // e.preventDefault();

        try {
            // Make an API call to add product details
            const response = fetch(`http://localhost:8080/productAPI/saveProductDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productName, category, model,manufacturer,manufactureDate,expiryDate,price,productDesc,image}),
            });
            console.log(JSON.stringify({ productName, category, model,manufacturer,manufactureDate,expiryDate,price,productDesc ,image}));

            if (response.ok) {
                console.log('Product details added successfully');
                // Perform any additional actions or navigate to a different page
            } else {
                console.log('Error adding Product details');
            }
            navigate(`/adminDetails/${adminId}`);

        } catch (error) {
            console.log('Error adding Product details:', error);
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
                                <h3 className="mt-3">Add Product</h3>
                                <hr/>

                                <MDBInput wrapperClass='mb-4'  placeholder='Product Name' id='form1' type='text'
                                          value={productName} onChange={handleProductNameChange}/>
                                <MDBInput wrapperClass='mb-4'  placeholder='Category' id='form1' type='text'
                                          value={category.toLowerCase()} onChange={handleCategoryChange}/>
                                <MDBInput wrapperClass='mb-4' placeholder='Model' id='form1' type='text'
                                          value={model} onChange={handleModelChange}/>
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
export default AddProduct;