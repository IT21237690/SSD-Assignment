import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Toast from "../components/CustomToasts";
// import Image from "react-bootstrap/Image";
// import Table from "react-bootstrap/Table";
import "./ModuleDisplayInventory.css";


function AdminPage() {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [mobile,setMobile] = useState ("");
   
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      axios
        .get("http://localhost:8070/admin/teachers")
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }, []);
  
  
    const filteredData = data.filter((Teacher) =>
    Teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApprove = async (id) => {
            await axios.patch(`http://localhost:8070/admin/approve/${id}`);
            const updatedTeachers = data.filter((teacher) => teacher._id !== id);
            setData(updatedTeachers);
          };
  
    return (
      <div>
        
        <h1>
          <center>Teacher Register Requests</center>
        </h1>
        <div className='container'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by teacher name'
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
     
          </div>
          <table className='table table-bordered border-primary'>
            <thead>
              <tr>
                <th scope='col'>Name </th>
    
                <th scope='col'>Email</th>
                
                <th scope='col'>Mobile</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data) => (
                <tr>
                   <td>
                      {name || data.name}  </td>
                
                  <td>{email || data.email}  </td>
                  <td>{mobile || data.mobile}  </td>
                  <td>
                    
                    <button className='btn btn-danger'style={{backgroundColor: '#065A82',color: 'white'}} type='button' id='ApproveButton' onClick={() => handleApprove(data._id)}>Approve</button>
                  </td>
  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  
}

export default AdminPage;

