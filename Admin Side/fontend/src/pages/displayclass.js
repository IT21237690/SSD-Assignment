import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import "./ModuleDisplaySchedule.css";
import { jsPDF } from 'jspdf';

// import '.../index.css'
import Table from "react-bootstrap/Table"
import { Col } from "react-bootstrap";


function DisplayS() {

    
    const [data, setData] = useState([]);


    const [subjectname,setSubjectname] = useState ("");
    const [date,setDate] = useState ("");
    const [time,setTime] = useState ("");
    const [teacher,setTeacher] = useState ("");
    const [searchTerm, setSearchTerm] = useState("");
    

//fetch data
  useEffect(() => {
    axios
      .get("http://localhost:8070/class/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
   //delete function
  function handleDelete(id) {
    if (!id) {
        console.log('Invalid ID');
        return;
      }
    fetch(`http://localhost:8070/class/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));
  }

  const filteredData = data.filter((Class) =>
    Class.subjectname.toLowerCase().includes(searchTerm.toLowerCase()) 
    
  );
 
  function ReportClass() {
    const generatePDFReport = (data) => {
      const doc = new jsPDF();
  
      // Format and add content to the PDF document
      doc.text('Class Schedule Report', 10, 10);
  
      // Create an array of table headers
      const headers = ['Subject Name', 'Date', 'Time', 'Teacher'];
  
      // Create an array of table rows from the class schedule data
      const rows = data.map((item) => [
        item.subjectname,
        item.date,
        item.time,
        item.teacher,
      ]);
  
      // Set up the table configuration
      const tableConfig = {
        head: [headers],
        body: rows,
      };
  
      // Generate the table in the PDF document
      doc.autoTable(tableConfig);
  
      // Save the PDF file
      doc.save('class_schedule_report.pdf');
    };
  
    // Fetch the class schedule data
    useEffect(() => {
      axios
        .get("http://localhost:8070/class/")
        .then((res) => generatePDFReport(res.data))
        .catch((err) => console.error(err));
    }, []);
  
    return (
      <div>
        {/* ... */}
      </div>
    );
  }
         
      
      
      axios
      
        .get("http://localhost:8070/class/reportclass", {
          responseType: 'blob',
        })
        .then((res) => {
          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement('a');
         const currentDate = new Date().toISOString().slice(0,10);
          link.href = url;
          link.setAttribute('download', `class-schedule-report_${currentDate}.pdf`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    

   
   

  return (
    <div>
      
      <h1>
        <center>Class-Schedule </center>
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
          <Link to="/classadd" className="btn btn-primary" style={{backgroundColor: '#1C7293',color: 'white'}}>Add Class</Link>
          <Link to="/displayhall" className="btn btn-primary" style={{backgroundColor: '#1C7293',color: 'white'}}>Halls</Link>


      <button style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-success" onClick={() => {ReportClass()}}>Report</button>

         
        </div>
        <br></br>
        
        <table className='table table-bordered border-primary'>
          <thead>
            <tr>
              <th scope='col'>Subjectname </th>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Teacher</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
           
            {filteredData.map((data) => (
              <tr>
                <td>{subjectname || data.subjectname}  </td>  
                <td>{date || data.date}  </td>
                <td>{time || data.time}  </td>
                <td>{teacher || data.teacher}  </td>
                
                
                <td>
                  <Link to={`/updateclass/${data._id}`}>
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