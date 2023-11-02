import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Styles/Navbar.css";
import { FaSistrix } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import eazshop_logo from '../../Images/logo.png';
import Dropdown from 'react-bootstrap/Dropdown';
import {FaUserAlt} from "react-icons/fa";
import "../../Styles/Authentication.css";
import { FormControl, ListGroup } from 'react-bootstrap';
import {AiOutlineShoppingCart} from "react-icons/ai";
import $ from "jquery";
import axios from "axios";
import Cookies from 'js-cookie';
const NavigationBar=()=>{
    let navigate=useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    useEffect(()=>{
        // navigate("/");
        fetchCategoryData();
        handleLogin();
        handleUserLogin();
    },[categoryData]);
    const [query, setQuery] = useState('');

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

    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(current => !current);
    };

    const customerId = Cookies.get('customerId');
    const adminId = Cookies.get('adminId');

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isUserLogged, setUserLogged] = useState(false);

    const handleLogin = () => {
        if((Cookies.get('signIn')==='successful') || (Cookies.get('signUp')==='successful') || (Cookies.get('adminLogin')==='successful')){
            setIsLoggedIn(false);
        }
    };

    const handleUserLogin=()=>{
      if((Cookies.get('signIn')==='successful') || (Cookies.get('signUp')==='successful'))  {
          setUserLogged(true);
      }
      else if(Cookies.get('adminLogin')==='successful'){
          setUserLogged(false);
      }
    };

    const handleLogout=()=>{
      Cookies.remove('signIn') ;
      Cookies.remove('signUp') ;
      Cookies.remove('adminLogin') ;
      Cookies.remove('customerId');
      Cookies.remove('adminId');
      if(Cookies.get('customerDeleted',null)==='successful'){
          setIsLoggedIn(true);
      }
        setIsLoggedIn(true);
    };

    const [category, setCategory] =useState("");
    const [suggestions, setSuggestions] = useState(false);
    const [suggestion, setSuggestion] = useState([]);
    const categories = categoryData.map(category => category.category);
    const handleInputChange = event => {
        setCategory(event.target.value.toLowerCase());
        setSuggestion(categories.filter(item => item.toLowerCase().includes(category.toLowerCase())));
    };

    const showSuggestions=event=>{
        setSuggestions(current=>!current);
    }

    const filteredList = categories.filter(item=>
        item.includes(query.toLowerCase())
    );

    const handleSearch = () => {
        fetchData(category);
    };
    const fetchData =(inputParam)=>{
        navigate(`/productsByCategory/${inputParam}`);
    };

    const cart=()=>{
        if(customerId===null){
            navigate(`${'error'}`);
        }
        else{
            navigate(`/addToCart`);
        }
    }
    return(
        <Navbar expand="lg" className="navbar navbar-dark bg-dark sticky-nav z-1">
            <Container fluid>
                <img src={eazshop_logo} style={{height:"24px"}}/>
                <Navbar.Brand onClick={()=>(navigate("/"))} style={{cursor:"pointer"}}>
                    <span id="mc-hub-cb-logo-eaz">Eaz</span>
                    <span id="mc-hub-cb-logo-shop">Shop</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search By Categories"
                            style={{borderBottomRightRadius:"0px",borderTopRightRadius:"0px"}}
                            value={category}
                            onChange={handleInputChange}
                            onFocus={showSuggestions}
                            onBlur={showSuggestions}
                            aria-label="Search"
                        />
                        <button onClick={handleSearch} className="btn btn-light me-3" style={{borderBottomLeftRadius:"0px",borderTopLeftRadius:"0px"}} type="button">
                            <FaSistrix/>
                        </button>
                        <button className="dropbtn btn btn-light rounded-circle background-dark me-3" onClick={cart} type="button">
                            <AiOutlineShoppingCart/>
                        </button>
                        <div className="dropdown1">
                            <button className="dropbtn btn btn-outline-light rounded-circle background-dark" onClick={handleClick} type="button">
                                <BsFillPersonFill/>
                            </button>
                            {suggestions && (<div className="dropdown-content-category">
                                <div className="text-decoration-none">
                                    {suggestion.length > 0 ? (
                                        <ListGroup>
                                            {suggestion.map((item,index) => (
                                                <ListGroup.Item key={index}>{item}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p className="mt-2">No item found</p>
                                    )}
                                </div>
                            </div>)}
                            {isShown && (<div className="dropdown-content">
                                <button className="btn btn-outline-light rounded-circle background-dark d-flex ms-5 mt-2 mb-3">
                                    <FaUserAlt className="btn-outline-dark rounded" size="30px" />
                                </button>
                            <hr className="hr hr-blurry"/>
                                {isLoggedIn ? (<div>
                                <a onClick={()=>(navigate("/loginPage"),handleClick())} className="pe-3 ">Sign In</a>
                                <a onClick={()=>(navigate("/signUpPage"),handleClick())} className="text-decoration-underline" >Sign Up</a>
                                    <hr className="hr hr-blurry"/>
                                <a onClick={()=>(navigate("/adminPage"),handleClick())} className="text-decoration-underline" >Admin Login</a>
                                    <hr className="hr hr-blurry"/>
                            </div>) :( <div>
                                    {isUserLogged ? (<div>
                                    <a onClick={()=>(navigate(`/userDetails/${customerId}`),handleClick())} className="pe-3 z-1">User Account</a>
                                    <a onClick={()=>(navigate("/"),handleClick(),handleLogout())} className="text-decoration-underline" >Logout</a>
                                    <hr className="hr hr-blurry"/>
                                </div>):
                                        (<div>
                                    <a onClick={()=>(navigate(`/adminDetails/${adminId}`),handleClick())} className="pe-3 z-1">Admin Account</a>
                                    <a onClick={()=>(navigate("/"),handleClick(),handleLogout())} className="text-decoration-underline" >Logout</a>
                                    <hr className="hr hr-blurry"/>
                                </div>)}
                            </div>)}
                            </div>
                            )}
                        </div>
                    </Form>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}
export default NavigationBar;