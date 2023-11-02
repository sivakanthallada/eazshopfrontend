import React, {useEffect, useState} from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import {useNavigate} from "react-router";
import {BrowserRouter as HashRouter, useParams} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import NavigationBar from "../Navbar/Navbar";
import {ChartData,ChartOptions} from "chart.js";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClientPage() {
    let navigate=useNavigate();
    const [customerData, setCustomerData] = useState([]);
    const {customerId} = useParams(); //For getting the parameter from the url (give the same name both in url and here)
    // const customerId ="CUST001";

    const fetchCustomerData = () => {
        axios.get(`http://localhost:8080/customerAPI/getCustomerById/${customerId}`)
            .then(response => {
                // Handle the response data
                setCustomerData(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    const [addressData, setAddressData] = useState([]);
    const fetchAddressData = () => {
        axios.get(`http://localhost:8080/addressAPI/getAddressByCustomerId/${customerId}`)
            .then(response => {
                // Handle the response data
                setAddressData(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    const [orderData, setOrderData] = useState([]);
    const fetchOrderData = () => {
        axios.get(`http://localhost:8080/ordersAPI/getOrderDetailsByCustomerId/${customerId}`)
            .then(response => {
                // Handle the response data
                setOrderData(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    const [categoryData, setCategoryData] = useState([]);
    const [data,setData]=useState();
    const fetchCategoryData = () => {
        axios.get(`http://localhost:8080/productAPI/getAllCategories`)
            .then(response => {
                // Handle the response data
                setCategoryData(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    const deleteAddress = (addressId)=> {
        const userInput = window.confirm(`Are you sure about deleting addressId : ${addressId}`);
        if(userInput){
            axios.delete(`http://localhost:8080/addressAPI/deleteAddressByAddressId/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedAddress = [...addressData].filter(address => address.addressId !== addressId);
                setAddressData(updatedAddress);
            });
            console.log(`User clicked yes for deleting addressId : ${addressId}`);
        }
        else{
            console.log(`User clicked no for deleting addressId : ${addressId}`);
        }
    };

    const deleteOrder = (orderId)=> {
        const userInput = window.confirm(`Are you sure about deleting orderId : ${orderId}`);
        if(userInput){
            axios.delete(`http://localhost:8080/ordersAPI/deleteOrderByOrderId/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedorder = [...addressData].filter(order => order.orderId !== orderId);
                setOrderData(updatedorder);
            });
            console.log(`User clicked yes for deleting orderId : ${orderId}`);
        }
        else{
            console.log(`User clicked no for deleting orderId : ${orderId}`);
        }
    };

    const deleteCustomer = (cutomerId)=> {
        const userInput = (window.prompt(`Enter username : '${cutomerId}' to proceed further`)).toUpperCase();
        if(userInput==null){
            console.log(`unable to delete user account  : ${customerId}`);
            navigate(`/userDetails/${cutomerId}`);
        }
        else if(userInput.toLocaleUpperCase()==customerId){
            axios.delete(`http://localhost:8080/customerAPI/deleteCustomerDetails/${cutomerId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                Cookies.remove('signIn') ;
                Cookies.remove('signUp') ;
                Cookies.remove('adminLogin') ;
                Cookies.remove('customerId');
                Cookies.remove('adminId');
                navigate('/');
                Cookies.set('customerDeleted','successful');
            });
            console.log(`User deleted account : ${cutomerId}`);
        }
        else{
            navigate(`/userDetails/${cutomerId}`);
            console.log(`unable to delete user account  : ${customerId}`);
        }
    };

    useEffect(() => {
        fetchCategoryData();
        fetchCustomerData();
        fetchAddressData();
        fetchOrderData();
        if(categoryData.length===0){return ;}
        setData({
            labels: categoryData.map((category)=>category.category),
            datasets: [
                {
                    label: "Number of Products",
                    data: categoryData.map((category)=>category.count),
                    responsive: true,
                    maintainAspectRatio: true,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(5, 159, 64, 0.5)',
                        'rgba(208, 159, 6, 0.5)',
                        'rgba(25, 159, 254, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(5, 159, 64, 1)',
                        'rgba(208, 159, 6, 1)',
                        'rgba(25, 159, 254, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        });
    }, [categoryData]);

    return (
        <div>
            <NavigationBar/>
            <section style={{
                backgroundImage:"url('https://img.freepik.com/free-vector/black-gold-glitter-background_1048-17457.jpg')",
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover"
            }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                <MDBBreadcrumbItem>
                                    <a onClick={()=>navigate('/')} style={{color:"Blue",textDecoration:"none"}}>Home</a>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem>
                                    <a onClick={()=>navigate(`/userDetails/${customerId}`)} style={{color:"Blue",textDecoration:"none"}}>User</a>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem active style={{color:"Black"}}>User Profile</MDBBreadcrumbItem>
                            </MDBBreadcrumb>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol lg="3">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <p className="mt-2 mb-4">UserName: {customerData.customerId}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button className="btn btn-success me-2" onClick={()=>(navigate(`/addAddressForUser/${customerId}`))}>Add Address</button>
                                        <button className="btn btn-success me-2" onClick={()=>(navigate(`/editCustomerDetails/${customerId}`))}>Edit Details</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger me-2" onClick={()=>(deleteCustomer(customerId))}>Delete Account</button>
                                        <button className="btn btn-success me-2 mt-2" onClick={()=>(navigate('/displayCouponUser'))}>View Coupons</button>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                            {/*<div className="container d-flex justify-container-center">*/}
                            {/*    <div className="row">*/}
                            {/*        <div className="col-md-12">*/}
                            {/*            <div id="piechart3d" style={{width: "900px", height: "500px"}}></div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </MDBCol>
                        <MDBCol lg="9">
                            <MDBCard className="mb-4 justify-content-between">
                                <MDBCardBody>
                                    <MDBRow className="ms-2 mb-4 me-2">
                                        <MDBCol sm="3">
                                            <MDBCardText className="fw-bold">User Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="6">
                                            <MDBCardText >{customerData.customerId}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText className="fw-bold">Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="6">
                                            <MDBCardText>{customerData.customerName}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText className="fw-bold ">Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="6">
                                            <MDBCardText>{customerData.mailId}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText className="fw-bold ">Mobile</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="6">
                                            <MDBCardText>{customerData.contact}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    { addressData.map(addressList =>
                                        <div>
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText className="fw-bold ">{addressList.addressId}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="6">
                                            <MDBCardText>
                                                {addressList.street},
                                                {' '}{addressList.city},
                                                {' '}{addressList.state},
                                                {' '}{addressList.country},
                                                {' '}{addressList.zipCode}
                                            </MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="3">
                                            <div className="d-flex justify-content-center mb-2">
                                                <button className="btn btn-success me-2" onClick={()=>(navigate(`/editAddress/${addressList.addressId}`))}>Edit</button>
                                                <button className="btn btn-danger" onClick={()=>(deleteAddress(addressList.addressId))}>Delete</button>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                            <hr/>
                                        </div>)}
                                </MDBCardBody>
                            </MDBCard>
                            <MDBRow>
                                {data ? (<MDBCard className="ms-2 mb-4 md-3 justify-content-between">
                                    <MDBCardBody className="d-flex justify-content-center">
                                        <MDBRow>
                                            <Pie data={data}/>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>) : null}
                                { orderData.map(orderList =><MDBCol md="6">
                                    <MDBCard className="mb-4 mb-md-3">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic fw-bold me-1">OrderId: </span>{orderList.orderId}</MDBCardText>
                                            <MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">ProductCode</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.productCode}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/>
                                            <MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">CouponCode</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.couponCode}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/><MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">Quantity</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.quantity}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/><MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">Amount</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.amount}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/><MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">Order Date</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.orderDate}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/><MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">Address Id</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.addressId}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/>
                                            <MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">Discounted Amount</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{orderList.discountedAmount}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/>
                                            <div className="mb-4"><button className="btn btn-danger me-2" onClick={()=>(deleteOrder(orderList.orderId))}>Delete</button></div>
                                            <hr/>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>)}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    );
}