import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'; // Import the validator library
import "./mix.css";

const Register = () => {
    const history = useNavigate();

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        name: "",
        address: "",
        mobile: "",
        dob: "",
        gender: "",
        email: "",
        securityAnswer: "",
        password: "",
        cpassword: "",
    });

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { name, address, mobile, gender, dob, email, securityAnswer, password, cpassword } = inpval;

        // Sanitize inputs
        const sanitizedInputs = {
            name: validator.escape(name),
            address: validator.escape(address),
            mobile: validator.escape(mobile),
            gender: validator.escape(gender),
            dob: validator.escape(dob),
            email: validator.normalizeEmail(email),
            securityAnswer: validator.escape(securityAnswer),
            password: password, // password should be kept as is for hashing
            cpassword: cpassword, // same as above
        };

        // Input validation
        if (sanitizedInputs.name === "") {
            toast.warning("Name is required!", { position: "top-center" });
        } else if (sanitizedInputs.address === "") {
            toast.warning("Address is required!", { position: "top-center" });
        } else if (sanitizedInputs.mobile === "") {
            toast.warning("Mobile is required!", { position: "top-center" });
        } else if (sanitizedInputs.dob === "") {
            toast.warning("DoB is required!", { position: "top-center" });
        } else if (sanitizedInputs.gender === "") {
            toast.warning("Gender is required!", { position: "top-center" });
        } else if (sanitizedInputs.email === "") {
            toast.error("Email is required!", { position: "top-center" });
        } else if (!validator.isEmail(sanitizedInputs.email)) {
            toast.warning("Invalid email format!", { position: "top-center" });
        } else if (sanitizedInputs.password === "") {
            toast.error("Password is required!", { position: "top-center" });
        } else if (sanitizedInputs.password.length < 6) {
            toast.error("Password must be at least 6 characters!", { position: "top-center" });
        } else if (sanitizedInputs.cpassword === "") {
            toast.error("Confirm password is required!", { position: "top-center" });
        } else if (sanitizedInputs.cpassword.length < 6) {
            toast.error("Confirm password must be at least 6 characters!", { position: "top-center" });
        } else if (sanitizedInputs.password !== sanitizedInputs.cpassword) {
            toast.error("Passwords do not match!", { position: "top-center" });
        } else {
            const data = await fetch("/student/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...sanitizedInputs,
                    password: sanitizedInputs.password, // Send the raw password for hashing
                    cpassword: sanitizedInputs.cpassword // Not recommended to send, can be omitted
                })
            });

            const res = await data.json();

            if (res.status === 201) {
                toast.success("Registration Successful! Please login", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    history("/");
                }, 3000);
            } else if (res.status === 422) {
                toast.error("Email Already Exists", {
                    position: "top-center",
                    autoClose: 3000,
                });
            } else {
                toast.error("Registration Failed", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setInpval({ ...inpval, name: "", address: "", mobile: "", gender: "", dob: "", email: "", securityAnswer: "", password: "", cpassword: "" });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1><strong>Student Sign Up</strong></h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="address">Address</label>
                            <input type="text" onChange={setVal} value={inpval.address} name="address" id="address" placeholder='Enter Your Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" onChange={setVal} value={inpval.mobile} name="mobile" id="mobile" placeholder='Enter Your Mobile' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="dob">DoB</label>
                            <input type="date" onChange={setVal} value={inpval.dob} name="dob" id="dob" placeholder='Enter Your DoB' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="gender">Gender</label>
                            <input type="text" onChange={setVal} value={inpval.gender} name="gender" id="gender" placeholder='Enter Your Gender' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="securityAnswer">Enter Your Mother's Name</label>
                            <input type="text" onChange={setVal} value={inpval.securityAnswer} name="securityAnswer" id="securityAnswer" placeholder='Enter Your securityAnswer' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/mainlogin">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
}

export default Register;
