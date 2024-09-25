import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import '.../index.css'
// import Table from "react-bootstrap/Table";
// import "./ModuleDisplayInventory.css";
import Swal from 'sweetalert2';

function DisplayS() {

    const [data, setData] = useState([]);

    const [name,setName] = useState ("");
    const [nic,setNic] = useState ("");
    const [address,setAddress] = useState ("");
    const [age,setAge] = useState ("");
    const [gender,setGender] = useState ("");
    const [land,setLand] = useState ("");
    const [mobile,setMobile] = useState ("");
    const [email,setEmail] = useState ("");
    const [category,setCategory] = useState ("");
    const [searchTerm, setSearchTerm] = useState("");

//fetch data
  useEffect(() => {
    axios
      .get("http://localhost:8070/staff/get")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
//delete function
  function handleDelete(id) {
    if (!id) {
        console.log('Invalid ID');
        return;
      }
    fetch(`http://localhost:8070/staff/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));
      Swal.fire('Succesfully Deleted')
  }

  const filteredData = data.filter((Staff) =>
    Staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Staff.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

//function to generate report
  function ReportStaff() {
    axios
      .get("http://localhost:8070/staff/reportstaff", {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        const currentDate = new Date().toISOString().slice(0,10);
        link.href = url;
        link.setAttribute('download', `non-accademic-staff-report_${currentDate}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div>
      <h1>
        <center>Non-Accademic Staff</center>
      </h1>
      <div className='container'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by person name or category'
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

          <Link to="/addstaff" className="btn btn-primary" style={{backgroundColor: '#1C7293',color: 'white'}}>Add Staff</Link>
          <button className="btn btn-primary" style={{backgroundColor: '#065A82',color: 'white'}} onClick={() => {ReportStaff()}}>Report</button>
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
              <th scope='col'>Category </th>
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
                <td>{category || data.category} </td>
                
                <td>
                  <Link to={`/updatestaff/${data._id}`}>
                    <button className='btn btn-info' style={{backgroundColor: '#065A82',color: 'white'}} type='button' id='EditButton'>
                      Edit
                    </button>
                  </Link>
               
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

export default DisplayS;