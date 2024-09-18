import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"

const TeacherRegister = () => {

    const history = useNavigate();

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        name: "",
        address: "",
        nic : "",
        mobile: "",
        age: "",
        gender: "",
        email: "",
        land : "",
        subject: "",
        workPlace : "",
        password: "",
        securityAnswer:""
        
    });


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { name,nic,address,mobile,gender,age,email,land,workPlace, subject,password, cpassword,securityAnswer } = inpval;

        if (name === "") {
            toast.warning(" name is required!", {
                position: "top-center"
            });

        }else if(address === "") {
            toast.warning("address is required!", {
                position: "top-center"
            });

        }else if(mobile === "") {
            toast.warning("mobile is required!", {
                position: "top-center"
            });

        }else if(nic === "") {
            toast.warning("nic is required!", {
                position: "top-center"
            });

        }else if(land === "") {
            toast.warning("land is required!", {
                position: "top-center"
            });

        }else if(workPlace === "") {
            toast.warning("workplace is required!", {
                position: "top-center"
            });

        }else if(subject === "") {
            toast.warning("workplace is required!", {
                position: "top-center"
            });

        }else if(age === "") {
            toast.warning("age is required!", {
                position: "top-center"
            });

        }else if(gender === "") {
            toast.warning("gender is required!", {
                position: "top-center"
            });

        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("confirm password is required!", {
                position: "top-center"
            });
            
        }
        else if (password !== cpassword) {
            toast.error("password and confirm password are not matching!", {
                position: "top-center"
            });
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch("http://localhost:8009/teacher/registerteacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,nic,address,gender,age,land,mobile,email,workPlace,subject,password,securityAnswer
                })
            });

            const res = await data.json();

            if (res.status === 201) {
                toast.success("Request sent to admin successfully", {
                  position: "top-center",
                  autoClose: 3000,
                });
                setTimeout(() => {
                  history("/Teacher");
                }, 3000);
              } else if (res.status === 422) {
                toast.success("Email Already Exits", {
                  position: "top-center",
                  autoClose: 3000,
                });
            }else {
                toast.error("Registration Failed", {
                  position: "top-center",
                  autoClose: 3000,
                });
                              
                
                setInpval({ ...inpval, name: "",nic: "",address:"",mobile:"",gender:"", age:"",email: "",land: "",workPlace: "",subject: "", password: "" ,securityAnswer:""});
            }

        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                    <h1><strong>Teacher Sign Up</strong></h1>
                    </div>
                    <form>
                        
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Enter Your Last Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="nic">NIC</label>
                            <input type="text" onChange={setVal} value={inpval.nic} name="nic" id="nic" placeholder='Enter Your nic' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="address">Address</label>
                            <input type="text" onChange={setVal} value={inpval.address} name="address" id="address" placeholder='Enter Your Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="text" onChange={setVal} value={inpval.mobile} name="mobile" id="mobile" placeholder='Enter Your Mobile' />
                        </div>


                        <div className="form_input">

                            <label htmlFor="land">Land Number</label>
                            <input type="text" onChange={setVal} value={inpval.land} name="land" id="land" placeholder='Enter Your land Address' />
                        </div>


                        <div className="form_input">

                            <label htmlFor="age">Age</label>
                            <input type="text" onChange={setVal} value={inpval.age} name="age" id="age" placeholder='Enter Your age' />
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
                            <label htmlFor="workPlace">workplace</label>
                            <input type="text" onChange={setVal} value={inpval.workPlace} name="workPlace" id="workPlace" placeholder='Enter Your workplace Address' />

                        </div>


                        <div className="form_input">

                            <label htmlFor="subject">Subject</label>
                            <input type="text" onChange={setVal} value={inpval.subject} name="subject" id="subject" placeholder='Enter Your subject' />
                        </div>

                        <div className="form_input">
                            <label htmlFor="securityAnswer">Your Mother's name</label>
                            <input type="text" onChange={setVal} value={inpval.securityAnswer} name="securityAnswer" id="securityAnswer" placeholder='Enter Your Answer' />
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
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/Teacher">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default TeacherRegister;