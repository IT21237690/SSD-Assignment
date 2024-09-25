import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



function Updateclass() {
    const { id } = useParams();

    const [data, setData] = useState([]);

     const [subjectname,setSubjectname] = useState ("");
    const [date,setDate] = useState ("");
    const [time,setTime] = useState ("");
    const [teacher,setTeacher] = useState ("");
    

    useEffect(() => {
        fetch(`http://localhost:8070/class/get/${id}`)
          .then(res => res.json())
          .then(data => {
            setSubjectname(data.subjectname);
            setDate(data.date);
            setTime(data.time);
            setTeacher(data.teacher);
           
          })
          .catch(err => console.log(err));
      }, [id]);


      function handleSubmit(e) {
        e.preventDefault();
      
        fetch(`http://localhost:8070/class/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectname,date,time,teacher})
        })
          .then(res => {
            if (res.ok) {
              alert('Update successful');
              window.location.href = document.referrer; // Redirect to the previous page
            } else {
              alert('Update failed');
            }
            return res.json();
          })
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }

  
  return (
    // style={{padding:'80px 0px'}}
    <section>
      <div className="container col-lg-5">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group py-3">
             <h4 style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>Update Class</h4>
            <br></br>
          </div>
          

          <div className="form-group">
            {/* image */}
            <label htmlFor="subjectname">Subjectname</label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              value={subjectname}
              onChange={(e) => setSubjectname(e.target.value)}
              style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
            />
            <br></br>
            <label htmlFor="date" className="mt-2">
              Date
            </label>
            
              <input
                type="text"
                // placeholder="Enter  date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
              />
              <br></br>

            <label htmlFor="time" className="mt-2">
              Time
            </label>
            
              <input
                type="text"
                // placeholder="Enter  time"
                className="form-control"
                pattern=".{12-12}"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
              />
              <br></br>
             
            <label htmlFor="teacher" className="mt-2">
              Teacher
            </label>
            <input
              type="text"
              // placeholder="Enter teacher"
              className="form-control"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
            />

                        
          </div>
          <br></br>
          <button style={{backgroundColor: '#065A82',color: 'white'}} className="btn btn-primary mt-2">Save</button>
          
        </form><br/>
        <Link to="/displayclass" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">
              Back
            </Link>
        
      </div>
    </section>
  );
};

export default Updateclass;
