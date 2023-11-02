import React, {useState} from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBCardText} from 'mdb-react-ui-kit';
import "../../Styles/AddCoupon.css";
import NavigationBar from "../Navbar/Navbar";
import {useNavigate} from "react-router";

function AddCoupon() {
    const navigate=useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [validTill, setValidTill] = useState('');
    const handleCouponCodeChange = (e) => {
        setCouponCode(e.target.value);
    };

    const handleDiscountPercentageChange = (e) => {
        setDiscountPercentage(e.target.value);
    };

    const handleValidTillChange = (e) => {
        setValidTill(e.target.value);
    };
    const handleCheck=async (e)=>{
        if(discountPercentage>100){
            window.alert("Enter discount percentage between 0 to 100");
        }
        else{
            await handleSubmit();
        }
    }
    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            // Make an API call to add product details
            const response = await fetch(`http://localhost:8080/couponAPI/addCoupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({couponCode,discountPercentage,validTill}),
            });
            console.log(JSON.stringify({couponCode,discountPercentage,validTill}));

            if (response.ok) {
                console.log('Coupon details added successfully');
                // Perform any additional actions or navigate to a different page
            } else {
                console.log('Error adding coupon details');
            }
            navigate(`/displayCoupon`);

        } catch (error) {
            console.log('Error adding coupon details:', error);
        }
    };
    return (
        <div>
            <NavigationBar/>
            <MDBContainer fluid className="p-3 my-5 h-custom">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>
                        <h2 className=" mb-2 me-3">Add Coupon</h2>
                        <hr/>
                        <MDBInput wrapperClass='mb-4' placeholder='Coupon Code' id='formControlLg' type='text' size="lg"
                                  value={couponCode.toUpperCase()} onChange={handleCouponCodeChange}/>
                        <MDBInput wrapperClass='mb-4' placeholder='Discount Percentage' id='formControlLg' type='percentage' size="lg"
                                  min={0} max={100} value={discountPercentage.toUpperCase()} onChange={handleDiscountPercentageChange}/>
                        <div className="d-flex ms-2">Valid Till :
                            <input className='mb-4 rounded ps-2 pe-2 ms-2'  placeholder='Valid Till' id='form1' type='date'
                                                                               value={validTill} onChange={handleValidTillChange}/></div>
                        <button className="btn btn-dark me-2 mb-4" type="submit" onClick={handleCheck}>Add Coupon</button>
                        <button className="btn btn-dark me-2 mb-4" onClick={()=>(navigate(`/displayCoupon`))}>Cancel</button>

                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default AddCoupon;