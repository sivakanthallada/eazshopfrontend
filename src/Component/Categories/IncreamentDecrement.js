import React, { Component } from 'react';
import {FaPlus,FaMinus} from "react-icons/fa";
import Cookies from 'js-cookie';
class IncDecCounter extends Component {
    constructor(props) {
        super(props);
        this.productCode=props.productCode;
        this.state = {
            clicks: 1,
            show: true
        };
    }

    render() {
        Cookies.set(`${this.productCode}`,`${this.state.clicks}`)
        const IncrementItem = () => {
            this.setState({ clicks: this.state.clicks + 1 });
            Cookies.set(`${this.productCode}`,`${this.state.clicks+1}`);
            console.log(this.productCode,':',Cookies.get(`${this.productCode}`));
        }
        const DecreaseItem = () => {
            if (this.state.clicks!=1){
                this.setState({ clicks: this.state.clicks - 1 });
                Cookies.set(`${this.productCode}`,`${this.state.clicks-1}`);
                console.log(this.productCode,':',Cookies.get(`${this.productCode}`));
            }
        }
        return (
            <div className="d-flex justify-content-center">
                <FaPlus className="bg-dark p-2 mt-2 me-2 rounded" style={{cursor:"pointer",color:"white"}} size="28px" onClick={()=>(IncrementItem())}/>
                { this.state.show ? <h4 className="mt-1 me-2">{ this.state.clicks }</h4> : '' }
                <FaMinus className="bg-dark p-2 mt-2 rounded" style={{cursor:"pointer",color:"white"}} size="28px" onClick={()=>(DecreaseItem())}/>

            </div>
        );
    }
}

export default IncDecCounter;