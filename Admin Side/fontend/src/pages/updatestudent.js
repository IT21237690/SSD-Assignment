import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "../components/CustomToasts";
import { Form, Button } from 'react-bootstrap';


function UpdateStudent() {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [dob, setdob] = useState('');
    const [gender, setgender] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    useEffect(() => {
      axios.get(`http://localhost:8070/student/get/${id}`)
        .then(res => {
          const student = res.data;
          setName(student.name);
          setaddress(student.address);
          setdob(student.dob);
          setgender(student.gender);
          setmobile(student.mobile);
          setemail(student.email);
          setpassword(student.password);
        })
        .catch(err => console.log(err));
    }, [id]);
    
    function handleSubmit(e) {
      e.preventDefault();

      
      const updated = {
        name,
        address,
        dob,
        gender,
        mobile,
        email,
        password,
      };
      axios.put(`http://localhost:8070/student/update/${id}`, updated)
        .then(res => {
          alert(res.data);
        })
        .catch(err => {
          alert(err.message);
        });
    }
    
      
      


  return (
    // style={{padding:'80px 0px'}}
    <section>
      <div className="container col-lg-5">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group py-3">
            <h4>Update Student Details</h4>
          </div>

          <div className="form-group">
            
            <label htmlFor="name">Name</label>
            <input
              // type="text"
              pattern="^[A-Za-z]+(?:\s+[A-Za-z]+)*$"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="address" className="mt-2">
              Address
            </label>
              <input
                type="text"
                placeholder="Enter  address"
                className="form-control"
                pattern="^\d+, .+, .+$"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
             
            <label htmlFor="dob" className="mt-2">
              DoB
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              pattern=""
              className="form-control"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
            />
            <label htmlFor="gender" className="mt-2">
                Gender
          </label>
            <input
              type="text"
              placeholder="Enter Gender"
              pattern="^(Male|Female|male|female)$"
              className="form-control"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            />
            <label htmlFor="mobile" className="mt-2">
                Mobile
          </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="form-control"
              pattern="[0][0-9]{9}"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />

            <label htmlFor="email" className="mt-2">
                Email
          </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="password" className="mt-2">
                Password
          </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            
          </div>
          <button className="btn btn-success mt-2">Save</button>
          
        </form><br/>
        <Link to="/addstudent" className="btn btn-success">
              Add Student
            </Link>
        
      </div>
    </section>
  );
};

export default UpdateStudent;