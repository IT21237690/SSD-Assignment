import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsPDF } from 'jspdf';


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

  

    
     axios
       .get("http://localhost:8070/class/report", {
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
          {/* Your component content */}
          <h1>Report Class</h1>
    
          {/* Button to trigger the report generation */}
          <button onClick={generatePDFReport}>Generate Report</button>
        </div>
      );
    };
    
   

   export default ReportClass
   