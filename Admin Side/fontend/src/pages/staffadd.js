import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator';

export default function Addstaff() {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [land, setLand] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");

  // Input sanitization & validation before submission
  function sanitizeAndValidate() {
    // Basic trimming of input values
    const sanitizedData = {
      name: name.trim(),
      nic: nic.trim(),
      address: address.trim(),
      age: age.trim(),
      gender: gender.trim(),
      land: land.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      category: category.trim(),
    };

    // Validations
    if (!validator.isAlpha(sanitizedData.name.replace(/\s+/g, ''))) {
      alert("Name should contain only letters.");
      return false;
    }
    if (!validator.isLength(sanitizedData.nic, { min: 10, max: 12 })) {
      alert("NIC must be 10-12 characters long.");
      return false;
    }
    if (!validator.isEmail(sanitizedData.email)) {
      alert("Invalid email format.");
      return false;
    }
    if (!validator.isInt(sanitizedData.age, { min: 26, max: 99 })) {
      alert("Age should be between 26 and 99.");
      return false;
    }
    if (!['Male', 'Female', 'male', 'female'].includes(sanitizedData.gender)) {
      alert("Gender should be Male or Female.");
      return false;
    }
    if (!['Security', 'Clarical', 'Office', 'security', 'clarical', 'office'].includes(sanitizedData.category)) {
      alert("Category should be Security, Clarical, or Office.");
      return false;
    }

    return sanitizedData;
  }

  function saveData(e) {
    e.preventDefault();
    
    const validatedData = sanitizeAndValidate();
    if (!validatedData) {
      return; // Stop the submission if validation fails
    }

    axios.post("http://localhost:8070/staff/add", validatedData)
      .then(() => {
        alert("Staff member added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <form onSubmit={saveData} className='container'>
        <h1>Add New Staff Member</h1>

        <div className="mb-3">
          <label htmlFor="name">Staff Member Name</label>
          <input
            type="text"
            placeholder='eg: name surname'
            pattern="^[A-Za-z]+(?:\s+[A-Za-z]+)*$"
            className="form-control" id="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nic">NIC</label>
          <input
            type="text" className="form-control" id="nic"
            placeholder='eg: 1234543212'
            pattern=".{10,12}" // NIC pattern: 10-12 characters
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text" className="form-control" id="address"
            placeholder='eg: 11, street name, city'
            pattern="^\d+, .+, .+$" // Ensure valid address format
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="number" className="form-control" id="age"
            placeholder='eg: 33'
            pattern="^(?:2[6-9]|[3-9][0-9])$" // Age validation between 26-99
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender">Gender</label>
          <input
            type="text" className="form-control" id="gender"
            placeholder='Male/Female'
            pattern="^(Male|Female|male|female)$" // Male/Female validation
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="land">Land Number</label>
          <input
            type="text" pattern="[0][0-9]{9}" className="form-control" id="land"
            placeholder='eg: 0123456789'
            onChange={(e) => setLand(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text" pattern="[0][0-9]{9}" className="form-control" id="mobile"
            placeholder='eg: 0123456789'
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email" className="form-control" id="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            placeholder='example@ex.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category">Category</label>
          <input
            type="text" className="form-control" id="category"
            placeholder='claricle/security/office'
            pattern="^(Security|Clarical|Office|security|clarical|office)$"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#065A82', color: 'white' }} className="btn btn-primary">Submit</button>
        <div />
        <br></br>

        <Link to="/displaystaff" style={{ backgroundColor: '#1C7293', color: 'white' }} className="btn btn-primary">Back</Link>
      </form>
    </div>
  );
}
