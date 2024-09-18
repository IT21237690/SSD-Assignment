import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import Table from "react-bootstrap/Table"
import { Col } from "react-bootstrap";



    function Hallallocation() {
        const [filteredData, setFilteredData] = useState([]);
        
        useEffect(() => {
          fetchData();
        }, []);
      
        const fetchData = async () => {
          try {
            const response = await axios.get('your-api-url');
            setFilteredData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        return (
          <div>
            <h1>Hall Allocation Details</h1>
            <br></br>
            <br></br>
            <table>
        <thead>
          <tr>
            
          </tr>
        </thead>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#b3c7f5' }}>Class Name</th>
                  <th style={{ backgroundColor: '#b3c7f5' }}>Hall Name</th>
                  <th style={{ backgroundColor: '#b3c7f5' }}>Location</th>
                 
                </tr>
                <td>OL Classes</td>
                <td>Ol05, Ol06, Ol07, Ol08</td>
                <td>Building 1, 3rd and 4th floor</td>
<tr>
                <td rowspan="2">AL Classes</td>
                <td>Al06, Al08</td>
                <td>Building 1, 4th and 5th floor</td>             
</tr>
<tr>
    <td>Al10, Al11, Al12, Al13</td>
    <td>Building 2, 6th and 7th floor</td>
</tr>

<tr>
                <td rowspan="2">Other Classes</td>
                <td>Ot02, Ot03, Ot04</td>
                <td>Building 1, 2nd and 5th floor</td>             
</tr>
<tr>
    <td>Ot09, Ot10, Ot11</td>
    <td>Building 2, 3rd and 9th floor</td>
</tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.classname}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      
      


export default Hallallocation;