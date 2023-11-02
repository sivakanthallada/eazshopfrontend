import './App.css';
import {BrowserRouter as HashRouter, Route, Routes,Switch } from 'react-router-dom';
import NavigationBar from "./Component/Navbar/Navbar";
import React, {useState} from "react";
import HomePage from "./Component/HomePage/HomePage";
import SignInPage from "./Component/LoginPage/SignInPage";
import Footer from "./Component/Footer/footer";
import SignUpPage from "./Component/LoginPage/SIgnUpPage";
import AllCategories from "./Component/Categories/AllCategories";
import SpecificCategory from "./Component/Categories/SpecificCategory";
import ClientPage from "./Component/ClientPage/ClientPage";
import EditAddress from "./Component/ClientPage/EditAddress";
import EditCustomer from "./Component/ClientPage/EditCustomer";
import AddAddress from "./Component/ClientPage/AddAddress";
import AdminLogin from "./Component/LoginPage/AdminLogin";
import AdminPage from "./Component/AdminPage/AdminPage";
import ShowProduct from "./Component/Categories/ShowProducts";
import ErrorPage from "./Component/ErrorPage/ErrorPage";
import AddProduct from "./Component/AdminPage/AddProduct";
import EditProduct from "./Component/AdminPage/EditProduct";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AddToCart from "./Component/Cart/AddToCart";
import ViewCouponAdmin from "./Component/Coupon/ViewCouponAdmin";
import AddCoupon from "./Component/Coupon/AddCoupon";
import ViewCouponUser from "./Component/Coupon/ViewCouponUser";
import "./Styles/Transition.css";

function App (){
    const [currentRoute, setCurrentRoute] = useState("/");
        return (
            <div className="App">

                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} className="active"/>
                        <Route path="/loginPage" element={<SignInPage/>} className="active"/>
                        <Route path="/signUpPage" element={<SignUpPage/>} className="active"/>
                        <Route path="/adminPage" element={<AdminLogin/>} className="active"/>
                        <Route path="/userDetails/:customerId" element={<ClientPage/>} className="active"/>
                        <Route path="/adminDetails/:adminId" element={<AdminPage/>} className="active"/>
                        <Route path="/allCategories" element={<AllCategories/>} className="active"/>
                        <Route path="/productsByCategory/:category" element={<SpecificCategory/>} className="active"/>
                        <Route path="/productDetails/:productCode" element={<ShowProduct/>} className="active"/>
                        <Route path="/addProduct" element={<AddProduct/>} className="active"/>
                        <Route path="/editAddress/:addressId" element={<EditAddress/>} className="active"/>
                        <Route path="/editCustomerDetails/:customerId" element={<EditCustomer/>} className="active"/>
                        <Route path="/editProduct/:productCode" element={<EditProduct/>} className="active"/>
                        <Route path="/addAddressForUser/:customerId" element={<AddAddress/>} className="active"/>
                        <Route path="/addToCart" element={<AddToCart/>} className="active"/>
                        <Route path="/displayCoupon" element={<ViewCouponAdmin/>} className="active"/>
                        <Route path="/displayCouponUser" element={<ViewCouponUser/>} className="active"/>
                        <Route path="/addCoupon" element={<AddCoupon/>} className="active"/>
                        <Route path="/:query" element={<ErrorPage/>} className="active"/>
                    </Routes>
                    <Footer/>
                </HashRouter>
            </div>
        );

}

export default App;
