import React from "react";
import NavigationBar from "../Navbar/Navbar";
import "../../Styles/ErrorPage.css";
import {useNavigate} from "react-router";
export default function ErrorPage(){
    let navigate=useNavigate();
    return(
        <div>
            <NavigationBar/>
            <div className="container" style={{
                height:"90vh"
            }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template" style={{marginTop:"200px"}}>
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions">
                                <a onClick={()=>(navigate('/'))} className="btn btn-dark btn-lg"><span
                                    className="glyphicon glyphicon-home"></span>
                                    Take Me Home </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}