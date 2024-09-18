import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import "./ModuleDisplaySchedule.css";
import { jsPDF } from 'jspdf';

// import '.../index.css'
 import Table from "react-bootstrap/Table";
 import { Col } from "react-bootstrap";
 import "./ModuleDisplayInventory.css";

function DisplayH() {
  const [data, setData] = useState([]);
  const [classname, setSubjectname] = useState("");
  const [hallname, setDate] = useState("");
  const [location, setTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data
  useEffect(() => {
    axios
      .get("http://localhost:8070/hall")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete function
  function handleDelete(id) {
    if (!id) {
      console.log('Invalid ID');
      return;
    }
    fetch(`http://localhost:8070/hall/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));
  }

  const filteredData = data.filter((Hall) =>
    Hall.hallname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function generatePDFReport(data) {
    const doc = new jsPDF();

    // Format and add content to the PDF document
    doc.text('Hall Allocation Report', 10, 10);

    // Generate the table
    const columns = [
      { header: 'Hall Name', dataKey: 'hallname' },
      { header: 'Capacity', dataKey: 'capacity' },
      // Add more columns as needed
    ];

    const rows = data.map((item) => ({
      hallname: item.hallname,
      capacity: item.capacity,
      // Map other properties to respective dataKeys
    }));

    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 20, // Adjust the starting y-coordinate for the table
    });

    // Save the PDF file
    const currentDate = new Date().toISOString().slice(0, 10);
    doc.save(`hall-allocation-report_${currentDate}.pdf`);
  }
  
   // Fetch the hall allocation data
   useEffect(() => {
    axios
      .get("http://localhost:8070/hall/")
      .then((res) => generatePDFReport(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  
  
  return (
    <div>
      
      <h1>
        <center>Hall Allocation </center>
      </h1>
      
      
      <div className='container'>
        <div className='input-group mb-3'>
          
        <input
            type='text'
            className='form-control'
            placeholder='Search'
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

          <Link to="/halladd" className="btn btn-primary" style={{backgroundColor: '#1C7293',color: 'white'}}> Add Hall</Link>


<button className="btn btn-primary" style={{backgroundColor: '#065A82',color: 'white'}} onClick={() => {generatePDFReport()}} >Report</button>
          <br></br>

         
        </div>
        
        <br></br>
        <table className='table table-bordered border-primary'>
          <thead>
            <tr>
              <th scope='col'>Classname </th>
              <th scope='col'>Hallname</th>
              <th scope='col'>location</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
           
            {filteredData.map((data) => (
              <tr>
                <td>{classname || data.classname}  </td>  
                <td>{hallname || data.hallname}  </td>
                <td>{location || data.location}  </td>
                
                
                
                <td>
                  <Link to={`/updatehall/${data._id}`}>
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

export default DisplayH
