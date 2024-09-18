import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { LoginContext } from '../../components/ContextProvider/Context';
import axios from "axios";
import Swal from 'sweetalert2';
import style from './AddPayment.module.css';



const AddPayment = () => {

   


    const [name, SetName] = useState("");
    const [cardNumber, SetCardNumber] = useState("");
    const [ExpYear, SetExpYear] = useState("");
    const [ExpMonth, SetExpMonth] = useState("");
    const [cvc, SetCVC] = useState("");
    const [address, SetAddress] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [amount, setAmount] = useState("");

    const [error,setError] = useState(false);
    const [message,setMessage] = useState("");
    const [CCError,setCCError] = useState("");

   


    function sendData(event) {
        event.preventDefault();

        const regEx = /[a-zA-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g   
        
        if(name.length ==0 || cardNumber.length  ==0 || ExpYear.length ==0 || ExpMonth.length == 0 || cvc.length == 0 || address.length == 0 || email.length == 0 || phone.length == 0 || amount.length == 0){
            setError(true)
            return
        }

        if(!regEx.test(email)){
            setMessage("Email is not valid !");
            return
        }else{
            setMessage("")
        }

        if(cardNumber.length < 16 || cardNumber.length > 16){
            setCCError("Credit Card Number Invalid !!");
            return
        }else{
            setCCError("");
        }

        if(name.length ==0 || cardNumber.length  ==0 || ExpYear.length ==0 || ExpMonth.length == 0 || cvc.length == 0 || address.length == 0 || email.length == 0 || phone.length == 0 || amount.length == 0){
            setError(true)
            return
        }else{
            const newPayment = {
                name,
                cardNumber,
                ExpYear,
                ExpMonth,
                cvc,
                address,
                email,
                phone,
                amount
            }
    
            axios.post("/payment/add", newPayment).then(() => {
                Swal.fire(
                    'Successful !',
                    'Payment Added!',
                    'success'
                  )
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
            })
        }

        

        
    }

    return (
        <div>
        
        <div className='container'>

            <center>
                <h2 style={{ marginTop: '50px' }}>Add Your Payment Details</h2>
            </center>
            {/* onSubmit={handleSubmit} */}

            <form className="row g-3" style={{ marginTop: '50px' }} >
                <div className="col-md-6">
                    <label className="form-label">Card Holder Name</label>
                    <input type="text" className="form-control" id="inputCardHolderName" placeholder='Muditha Pradeeptha Jayawickrama'
                        required
                        pattern='/^[a-zA-Z ]*$/'
                        onChange={(event) => {
                            SetName(event.target.value)
                        }} />
                    {error&&name.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
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
                    <label className={style.DangerLabel}>{CCError}</label>
                    {/* {error&&cardNumber.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""} */}
                </div>
                <div className="col-md-6">
                    <label className="form-label">ExpYear</label>
                    <input type="Number" className="form-control" id="inputExpYear" placeholder="28"
                        required
                        // pattern='/^[0-9]*$/'
                        onChange={(event) => {
                            SetExpYear(event.target.value)
                        }} />
                    {error&&ExpYear.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
                </div>
                <div className="col-md-6">
                    <label className="form-label">ExpMonth</label>
                    <input type="Number" className="form-control" id="inputExpMonth" placeholder="07"
                        required
                        // pattern='/^[0-9]*$/'
                        onChange={(event) => {
                            SetExpMonth(event.target.value)
                        }} />
                    {error&&ExpMonth.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
                </div>
                <div className="col-md-6">
                    <label className="form-label">CVC</label>
                    <input type="Number" className="form-control" id="inputCVC" placeholder="246"
                    required
                        onChange={(event) => {
                            SetCVC(event.target.value)
                        }} />
                    {error&&cvc.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Amount(Monthly)</label>
                    <input type="Number" className="form-control" id="inputAmount" placeholder="10000"
                    required
                    onChange={(event) => {
                        setAmount(event.target.value)
                    }}/>
                    {error&&amount.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Apartment, studio, or floor"
                        required
                        pattern='.*'
                        onChange={(event) => {
                            SetAddress(event.target.value)
                        }} />
                    {error&&address.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
                </div>
                <div className="col-md-6">
                    <label className="form-label">email</label>
                    <input type="email" className="form-control" id="inputemail" placeholder='example@gmail.com'
                        pattern='/^\S+@\S+\.\S+$/'
                        required
                        onChange={(event) => {
                            SetEmail(event.target.value)
                        }} />
                    <label className={style.DangerLabel}>{message}</label>
                    {/* {error&&email.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""} */}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="Number" className="form-control" id="inputPhone" placeholder="0714587458"
                        required
                        pattern='/^[0-9]*$/'
                        onChange={(event) => {
                            SetPhone(event.target.value)
                        }} />
                    {error&&phone.length<=0?
                    <label className={style.DangerLabel}>*This field can't be empty</label>:""}
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