import React, {useEffect} from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedinIn} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
export default function Footer() {
    let navigate=useNavigate();
    useEffect(()=>{
        navigate("/");
    },[]);
    return (
        <MDBFooter className='bg-dark text-center text-white'>
            <MDBContainer className=' p-4 pb-0'>
                <section className='mb-3' style={{cursor:"pointer"}}>
                    <a href="https://www.facebook.com" style={{color:"white"}} target="_blank"><FaFacebook className="me-3" /></a>
                    <a href="https://twitter.com/sivakanthallada" style={{color:"white"}} target="_blank"><FaTwitter className="me-3"/></a>
                    <a href="https://www.instagram.com/sivakanth_allada/" style={{color:"white"}} target="_blank"><FaInstagram className="me-3" /></a>
                    <a href="https://www.linkedin.com/in/naga-sivakanth-allada-494240225/" style={{color:"white"}} target="_blank"><FaLinkedinIn /></a>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
                <a className='text-white' href='http://localhost:3000/' target="_blank">
                    EazShop.com
                </a>
            </div>
        </MDBFooter>
    );
}