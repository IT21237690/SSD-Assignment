import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../components/CustomToasts";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import "./ModuleDisplayInventory.css";
import Swal from 'sweetalert2';

function DisplayT() {

    const [data, setData] = useState([]);

    const [name,setName] = useState ("");
    const [nic,setNic] = useState ("");
    const [address,setAddress] = useState ("");
    const [age,setAge] = useState ("");
    const [gender,setGender] = useState ("");
    const [land,setLand] = useState ("");
    const [mobile,setMobile] = useState ("");
    const [email,setEmail] = useState ("");
    const [subject,setSubject] = useState ("");
    const [password, setpassword] = useState("");
    const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:8070/teacher/T")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(id) {
    if (!id) {
        console.log('Invalid ID');
        return;
      }
    fetch(`http://localhost:8070/teacher/deleteT/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));

      Swal.fire('Succesfully Deleted')
  
  }

  const filteredData = data.filter((Teacher) =>
  Teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  Teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      <h1>
        <center>Accademic Staff</center>
      </h1>
      <div className='container'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by teacher name or subject name'
            aria-label='Search'
            aria-describedby='search-btn'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className='btn btn-outline-secondary'
            type='button'
            id='search-btn'
          >
            Search
          </button>

          <Link to="/adminreq" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">
              Teacher Requests
            </Link>
           
        </div>
        <table className='table table-bordered border-primary'>
          <thead>
            <tr>
              <th scope='col'>Name </th>
              <th scope='col'>NIC</th>
              <th scope='col'>Address</th>
              <th scope='col'>Age</th>
              <th scope='col'>Gender</th>
              <th scope='col'>Mobile </th>
              <th scope='col'>Land Number </th>
              <th scope='col'>Email</th>
              <th scope='col'>Subject </th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr>
                <td>{name || data.name}  </td>  
                <td>{nic || data.nic}  </td>
                <td>{address || data.address}  </td>
                <td>{age || data.age}  </td>
                <td>{gender || data.gender} </td> 
                <td>{mobile || data.mobile} </td> 
                <td>{land || data.land} </td>
                <td>{email || data.email}  </td>
                <td>{subject || data.subject} </td>
                
                <td>
                  <Link to={`/updateteacher/${data._id}`}><button style={{backgroundColor: '#065A82',color: 'white'}} className='btn btn-info' type='button' id='EditButton'>Edit</button></Link>
                
                  <button className='btn btn-danger' type='button' id='DeleteButton' onClick={() => handleDelete(data._id)}>Delete</button>
                </td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayT;