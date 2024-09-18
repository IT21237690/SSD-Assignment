import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



function Updatehall() {
    const { id } = useParams();

    const [data, setData] = useState([]);

     const [hallname,setHallname] = useState ("");
    const [classname,setClassname] = useState ("");
    const [location,setLocation] = useState ("");
    

    useEffect(() => {
        fetch(`http://localhost:8070/hall/get/${id}`)
          .then(res => res.json())
          .then(data => {
            setHallname(data.hallname);
            setClassname(data.classname);
            setLocation(data.location);
            
           
          })
          .catch(err => console.log(err));
      }, [id]);


      function handleSubmit(e) {
        e.preventDefault();
      
        fetch(`http://localhost:8070/hall/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hallname,classname,location})
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
          <h4 style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>Update Hall</h4>
            <br></br>
          </div>

          <div className="form-group">
            {/* image */}
            <label htmlFor="hallname">Hallname</label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              value={hallname}
              onChange={(e) => setHallname(e.target.value)}
              style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
            />
            <br></br>
            <label htmlFor="classname" className="mt-2">
              Classname
            </label>
            
              <input
                type="text"
                // placeholder="Enter  classname"
                className="form-control"
                value={classname}
                onChange={(e) => setClassname(e.target.value)}
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
              />
              <br></br>
            <label htmlFor="location" className="mt-2">
              Locaton
            </label>
            
              <input
                type="text"
                // placeholder="Enter  location"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
              />
             
                   <br></br>      
          </div>
          <button style={{backgroundColor: 'white',color: 'black',padding:'3px 3px',margin:'auto',borderRadius:'15px',border:'2px solid black'}} className="btn btn-primary mt-2">Save</button>
          
        </form><br/>
        <Link to="/displayhall" style={{backgroundColor: 'white',color: 'black',padding:'3px 3px',margin:'auto',borderRadius:'15px',border:'2px solid black'}} className="btn btn-primary">
              Back
            </Link>
        
      </div>
    </section>
  );
};

export default Updatehall;
