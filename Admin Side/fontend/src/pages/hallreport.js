import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsPDF } from 'jspdf';


function ReportHall() {
  const generatePDFReport = (data) => {
    const doc = new jsPDF();

    // Format and add content to the PDF document
    doc.text('Hall Allocation Report', 10, 10);

    // Create an array of table headers
    const headers = ['Class Name', 'Hall Name', 'Location' ];

    // Create an array of table rows from the class schedule data
    const rows = data.map((item) => [
      item.classname,
      item.hallname,
      item.location,
      
    ]);

    // Set up the table configuration
    const tableConfig = {
      head: [headers],
      body: rows,
    };

    // Generate the table in the PDF document
    doc.autoTable(tableConfig);

   
    // Save the PDF file
    const currentDate = new Date().toISOString().slice(0, 10);
    doc.save(`hall-allocation-report_${currentDate}.pdf`);
  };

  useEffect(() => {
    // Fetch the hall allocation data
    axios
      .get("http://localhost:8070/hall/")
      .then((res) => generatePDFReport(res.data))
      .catch((err) => console.error(err));

    
    axios
      .get("http://localhost:8070/hall/report", {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        const currentDate = new Date().toISOString().slice(0, 10);
        link.href = url;
        link.setAttribute('download', `hall-allocation-report_${currentDate}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* Your component content */}
      <h1>Report Hall</h1>

      {/* Button to trigger the report generation */}
      <button onClick={generatePDFReport}>Generate Report</button>
    </div>
  );
}


   export default ReportHall