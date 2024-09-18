import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function DisplayS() {

    const [data, setData] = useState([]);

    const [message,setMessage] = useState ("");
    const [mid,setMid] = useState ("");
    const [date,setDate] = useState ("");
    const [time,setTime] = useState ("");
    const [from,setFrom] = useState ("");
    const [to,setTo] = useState ("");
    const [searchTerm, setSearchTerm] = useState("");

//fetch data
  useEffect(() => {
    axios
      .get("http://localhost:8070/announcement/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
//delete function
  function handleDelete(id) {
    if (!id) {
        console.log('Invalid ID');
        return;
      }
    fetch(`http://localhost:8070/announcement/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));
  }

  const filteredData = data.filter((announcement) =>
    announcement.message.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.from.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.to.toLowerCase().includes(searchTerm.toLowerCase()));

//function to generate report
  function reportann() {
    axios
      .get("http://localhost:8070/announcement/report", {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        const currentDate = new Date().toISOString().slice(0,10);
        link.href = url;
        link.setAttribute('download', `announcement-report_${currentDate}.pdf`);
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
        <center>Announcement Management</center>
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

          <Link to="/announcement/add" className="btn btn-primary" style={{backgroundColor: '#1C7293',color: 'white'}}>Add Announcement</Link>
          <button className="btn btn-primary" style={{backgroundColor: '#065A82',color: 'white'}} onClick={() => {reportann()}}>Report</button>
        </div>
        <table className='table table-bordered border-primary'>
          <thead>
            <tr>
            <th scope="col">Message</th>
            <th scope="col">Message ID</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Edit or Delete</th>
            </tr>
          </thead>
          <tbody>
           
            {filteredData.map((data) => (
              <tr>
                <td>{message || data.message}  </td>  
                <td>{mid || data.mid}  </td>
                <td>{date || data.date}  </td>
                <td>{time || data.time}  </td>
                <td>{from || data.from} </td> 
                <td>{to || data.to} </td> 
                
                <td>
                  <Link to={`/announcement/update/${data._id}`}>
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