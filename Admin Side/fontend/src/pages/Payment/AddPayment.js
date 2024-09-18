import React, { useState } from 'react'
import axios from "axios";
import Header from '../../components/Header';

const AddPayment = () => {

    const [name, SetName] = useState("");
    const [cardNumber, SetCardNumber] = useState("");
    const [ExpYear, SetExpYear] = useState("");
    const [ExpMonth, SetExpMonth] = useState("");
    const [cvc, SetCVC] = useState("");
    const [address, SetAddress] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");

    // // validate credit card number format
    // const validateCardNumber = (cardNumber) => {
    //     // regular expression to match 16 digit card number with spaces in between
    //     const regex = /^(?:\d{4}[ ]){3}\d{4}$/
    //     return regex.test(cardNumber)
    // }

    // // handle onBlur event for credit card number input field
    // const handleCardNumberBlur = (event) => {
    //     const inputCardNumber = event.target.value.trim()
    //     const cardNumberValid = validateCardNumber(inputCardNumber)
    //     if (!cardNumberValid) {
    //         alert('Invalid card number format. Please enter a 16 digit card number with spaces in between')
    //     }
    // }


    function sendData(event) {
        event.preventDefault();

        const newPayment = {
            name,
            cardNumber,
            ExpYear,
            ExpMonth,
            cvc,
            address,
            email,
            phone
        }

        axios.post("http://localhost:8070/payment/add", newPayment).then(() => {
            alert("Payment Added !")
        }).catch((err) => {
            alert("Error occurred while adding payment. Please try again later.")
        })
    }


    return (
        <div>
            <Header />
            <div className='container'>

                <center>
                    <h2 style={{ marginTop: '50px' }}>Add Your Payment Details</h2>
                </center>

                <form className="row g-3" style={{ marginTop: '50px' }}>
                    <div className="col-md-6">
                        <label className="form-label">Card Holder Name</label>
                        <input type="text" className="form-control" id="inputCardHolderName" placeholder='Muditha Pradeeptha Jayawickrama'
                            required
                            pattern='/^[a-zA-Z ]*$/'
                            onChange={(event) => {
                                SetName(event.target.value)
                            }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-control" id="inputCardNumber" placeholder='0000  0000  0000  0000'
                            required
                            pattern='/^[0-9 ]*$/'
                            // onBlur={handleCardNumberBlur}   
                            onChange={(event) => {
                                SetCardNumber(event.target.value)
                            }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">ExpYear</label>
                        <input type="Number" className="form-control" id="inputExpYear" placeholder="28"
                            required
                            // pattern='/^[0-9]*$/'
                            onChange={(event) => {
                                SetExpYear(event.target.value)
                            }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">ExpMonth</label>
                        <input type="Number" className="form-control" id="inputExpMonth" placeholder="07"
                            required
                            // pattern='/^[0-9]*$/'
                            onChange={(event) => {
                                SetExpMonth(event.target.value)
                            }} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">CVC</label>
                        <input type="Number" className="form-control" id="inputCVC" placeholder="246"
                        required
                            onChange={(event) => {
                                SetCVC(event.target.value)
                            }} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Apartment, studio, or floor"
                            required
                            pattern='.*'
                            onChange={(event) => {
                                SetAddress(event.target.value)
                            }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">email</label>
                        <input type="email" className="form-control" id="inputemail" placeholder='example@gmail.com'
                            pattern='/^\S+@\S+\.\S+$/'
                            required
                            onChange={(event) => {
                                SetEmail(event.target.value)
                            }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input type="Number" className="form-control" id="inputPhone" placeholder="0714587458"
                            required
                            pattern='/^[0-9]*$/'
                            onChange={(event) => {
                                SetPhone(event.target.value)
                            }} />
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary" onClick={sendData}>Pay</button>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPayment