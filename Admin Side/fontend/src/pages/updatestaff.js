import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



function Updatestaff() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState([]);

     const [name,setName] = useState ("");
    const [nic,setNic] = useState ("");
    const [address,setAddress] = useState ("");
    const [age,setAge] = useState ("");
    const [gender,setGender] = useState ("");
    const [land,setLand] = useState ("");
    const [mobile,setMobile] = useState ("");
    const [email,setEmail] = useState ("");
    const [category,setcategory] = useState ("");

    useEffect(() => {
        fetch(`http://localhost:8070/staff/get/${id}`)
          .then(res => res.json())
          .then(data => {
            setName(data.name);
            setNic(data.nic);
            setAddress(data.address);
            setAge(data.age);
            setGender(data.gender);
            setLand(data.land);
            setMobile(data.mobile);
            setEmail(data.email);
            setcategory(data.category);

          })
          .catch(err => console.log(err));
      }, [id]);


      function handleSubmit(e) {
        e.preventDefault();
      
        fetch(`http://localhost:8070/staff/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name,nic,address,age,gender,land,mobile,email,category})
        })
          .then(res => {
            alert(res.data);
          navigate("/displaystaff");
          })
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }

  
  return (
    // style={{padding:'80px 0px'}}
    <section>
      <div className="container col-lg-5">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group py-3">
            <h4>Update Satff</h4>
          </div>

          <div className="form-group">
            {/* image */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="address" className="mt-2">
              Address
            </label>
            
              <input
                type="text"
                // placeholder="Enter  address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

            <label htmlFor="address" className="mt-2">
              NIC
            </label>
            
              <input
                type="text"
                // placeholder="Enter  nic"
                className="form-control"
                pattern=".{12,12}"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
             
            <label htmlFor="age" className="mt-2">
              Age
            </label>
            <input
              type="text"
              // placeholder="Enter dob"
              className="form-control"
              pattern=".{2,2}"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="gender" className="mt-2">
                Gender
          </label>
            <input
              type="text"
              // placeholder="Enter Date Of Purchase"
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="mobile" className="mt-2">
                Mobile Number
          </label>
            <input
              type="text"
              // placeholder="Enter Date Of Purchase"
              className="form-control"
              pattern="[0][0-9]{9}"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <label htmlFor="land" className="mt-2">
                Land Number
          </label>
            <input
              type="text"
              // placeholder="Enter Date Of Purchase"
              className="form-control"
              pattern="[0][0-9]{9}"
              value={land}
              onChange={(e) => setLand(e.target.value)}
            />

            <label htmlFor="email" className="mt-2">
                Email
          </label>
            <input
              type="text"
              // placeholder="Enter Date Of Purchase"
              className="form-control"
              // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="category" className="mt-2">
                Category
          </label>
            <input
              type="text"
              // placeholder="Enter Date Of Purchase"
              className="form-control"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            
          </div>
          <button style={{backgroundColor: '#065A82',color: 'white'}} className="btn btn-primary mt-2">Save</button>
          
        </form><br/>
        <Link to="/displaystaff" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">
              Back
            </Link>
        
      </div>
    </section>
  );
};

export default Updatestaff;
