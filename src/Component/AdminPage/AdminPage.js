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
// import { Pie } from "react-chartjs-2";
import axios from "axios";
import NavigationBar from "../Navbar/Navbar";
import {Pie} from "react-chartjs-2";

export default function AdminPage() {
    let navigate=useNavigate();
    const {adminId} = useParams(); //For getting the parameter from the url (give the same name both in url and here)
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetchCategoryData();
        fetchProductData();
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
                    weight:0.6
                },
            ],
        });
    }, [categoryData]);

    const fetchProductData = async () => {
        await axios.get(`http://localhost:8080/productAPI/getAllProducts`)
            .then(response => {
                // Handle the response data
                setProductData(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };
    const deleteProduct = (productCode)=> {
        const userInput = window.confirm(`Are you sure about deleting Product : ${productCode}`);
        if(userInput){
            axios.delete(`http://localhost:8080/productAPI/deleteProduct/${productCode}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedProduct = [...productData].filter(product => product.productCode !== productCode);
                setProductData(updatedProduct);
            });
            console.log(`Admin clicked yes for deleting Product : ${productCode}`);
        }
        else{
            console.log(`Admin clicked no for deleting Product : ${productCode}`);
        }
    };


    const [data,setData]=useState(null);
    const fetchCategoryData = () => {
        axios.get(`http://localhost:8080/productAPI/getAllCategories`)
            .then(response => {
                setCategoryData(response.data);

            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <NavigationBar/>
            <section style={{
                backgroundImage:"url('https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?q=10&h=200')",
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover"
            }}>
                <div className="py-5 ms-5 me-5 ">
                    <MDBRow>
                        <MDBCol>
                            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                <MDBBreadcrumbItem>
                                    <a onClick={()=>navigate('/')} style={{color:"Blue",textDecoration:"none"}}>Home</a>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem>
                                    <a onClick={()=>navigate(`/adminDetails/${adminId}`)} style={{color:"Blue",textDecoration:"none"}}>Admin</a>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem active style={{color:"Black"}}>Admin Profile</MDBBreadcrumbItem>
                            </MDBBreadcrumb>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol lg="3">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center mt-3 mb-5">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle pd-5"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <p className="mt-3">UserName: {adminId}</p>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-success me-2" onClick={()=>(navigate(`/addProduct`))}>Add Product</button>
                                        <button className="btn btn-success me-2" onClick={()=>(navigate(`/displayCoupon`))}>View Coupon</button>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                            {/*<MDBCard className="mb-4">*/}
                            {/*    <MDBCardBody className="text-center">*/}
                            {/*        <Pie data={productsAvailable} options={{ responsive: true }} />*/}
                            {/*    </MDBCardBody>*/}
                            {/*</MDBCard>*/}
                        </MDBCol>
                        <MDBCol>
                            {data ? (<MDBCard className="ms-2 mb-4 md-3 justify-content-between">
                                <MDBCardBody className="d-flex justify-content-center">
                                    <MDBRow>
                                        <Pie data={data}/>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>) : null}
                        </MDBCol>
                    </MDBRow>
                        {/*<MDBCol lg="10">*/}
                            <MDBRow>

                                { productData.map(productList =><MDBCol md="6" >
                                    <MDBCard className="mb-4 ">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic fw-bold me-1">Product Code: </span>{productList.productCode}</MDBCardText>
                                            <MDBRow className="d-flex justify-content-center">
                                                <MDBCol md="12" lg="9" className="mb-4 mb-lg-0">
                                                    <div>
                                                        <img
                                                            src={productList.image}
                                                            className="w-100"
                                                            style={{borderRadius:"10px"}}
                                                        />
                                                        <a href="#!">
                                                            <div
                                                                className="mask"
                                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                            ></div>
                                                        </a>
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/>
                                            <MDBRow>
                                                <MDBCol sm="4">
                                                    <MDBCardText className="d-flex text-primary fw-bold">Product Name</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="8">
                                                    <MDBCardText >{productList.productName}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/><MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText className="d-flex text-primary fw-bold">Category</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText >{productList.category}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                            <hr/><MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText className="d-flex text-primary fw-bold">Model</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText >{productList.model}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                            <hr/><MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText className="d-flex text-primary fw-bold">Manufacturer</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText >{productList.manufacturer}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                            <hr/><MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText className="d-flex text-primary fw-bold">Manufacture Date</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText >{productList.manufactureDate}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                            <hr/><MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText className="d-flex text-primary fw-bold">Expiry Date</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText >{productList.expiryDate}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                            <hr/><MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText className="d-flex text-primary fw-bold">Price</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText >{productList.price}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                            <hr/>
                                            <MDBCardText className="mb-4 me-2"><button
                                                className="btn btn-danger me-2" onClick={()=>(navigate(`/editProduct/${productList.productCode}`))}>Edit</button>
                                                <button className="btn btn-danger me-2" onClick={()=>(deleteProduct(productList.productCode))}>Delete</button>
                                        </MDBCardText>
                                            <hr/>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>)}
                            </MDBRow>
                        {/*</MDBCol>*/}
                </div>
            </section>
        </div>
    );
}