import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



function Updatenotice() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const [message, setMessage] = useState([]);
  const [mid, setMid] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8070/announcement/get/${id}`)
        .then(res => res.json())
        .then(y => {
          setMessage(y.message);
          setMid(y.mid);
          setDate(y.date);
          setTime(y.time);
          setFrom(y.from);
          setTo(y.to);

          })
          .catch(err => console.log(err));
      }, [id]);


      function handleSubmit(e) {
        e.preventDefault();
      
        fetch(`http://localhost:8070/announcement/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message,mid,date,time,from,to})
        })
          .then(res => {
            if (res.ok) {
              alert('successfully updated');
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
            <h4>Announcement Update</h4>
          </div>

          <div className="form-group">
            {/* image */}
            <label htmlFor="name">Message</label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="mid" className="mt-2">Message ID</label>
              <input
                type="text"
                placeholder="Enter message ID"
                className="form-control"
                value={mid}
                onChange={(e) => setMid(e.target.value)}
              />

              <label htmlFor="date" className="mt-2">Date</label>
              <input
              type="text"
              placeholder="Enter date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
             
            <label htmlFor="Time" className="mt-2">Time</label>
              <input
              type="time"
              className="form-control"
              placeholder="Enter Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="from" className="mt-2">from</label>
            <input
            type="text"
            placeholder="Enter message sender"
            className="form-control"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            />
            <label htmlFor="to" className="mt-2">to</label>
            <input
            type="text"
            placeholder="Target audience"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            />
            
            </div>
            <button style={{backgroundColor: '#065A82',color: 'white'}} className="btn btn-primary mt-2">Save</button>
          
          </form><br/>
          <Link to="/announcement/" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">
              Back
            </Link>
        
      </div>
    </section>
  );
};

export default Updatenotice;
