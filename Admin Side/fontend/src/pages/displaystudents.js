import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../components/CustomToasts";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import "./ModuleDisplayInventory.css";
import Swal from 'sweetalert2';


function Display() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/student/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(id) {
    if (!id) {
        console.log('Invalid ID');
        return;
      }
    fetch(`http://localhost:8070/student/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));

      Swal.fire('Succesfully Deleted')
  }

  const filteredData = data.filter((Student) =>
    Student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function GenReport() {
    axios
      .get("http://localhost:8070/student/report", {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        const currentDate = new Date().toISOString().slice(0,10);
        link.href = url;
        link.setAttribute('download', `Student_report_${currentDate}.pdf`);
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
        <center>Student Manegmnet</center>
      </h1>
      <div className='container'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by student name'
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

        
            <button style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-success" onClick={() => {GenReport()}}>Report</button>
        </div>
        <table className='table table-bordered border-primary'>
          <thead>
            <tr>
              <th scope='col'>Name </th>
              <th scope='col'>Address</th>
              <th scope='col'>DoB</th>
              <th scope='col'>Gender</th>
              <th scope='col'>Mobile </th>
              <th scope='col'>Email</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr>
                 <td>
                    {name || data.name}  </td>
                <td>{address || data.address}  </td>
                <td>{dob || data.dob}  </td>
                <td>{gender || data.gender} </td> 
                <td>{mobile || data.mobile} </td> 
                <td>{email || data.email}  </td>
                <td>
                <Link
                      to={{
                        pathname: `/update/${data._id}`,
                        state: { data: data },
                      }}
                    >
                      <button className='btn btn-info'style={{backgroundColor: '#065A82',color: 'white'}} type='button' id='EditButton'>Edit</button>
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


export default Display;

//http://localhost:8070/admin/approve/${id}