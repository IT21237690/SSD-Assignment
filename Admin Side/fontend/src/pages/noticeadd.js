import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator';

export default function Addnotice() {
  const [message, setMessage] = useState("");
  const [mid, setMid] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    // Validate message
    if (!message) {
      newErrors.message = "Message is required.";
    } else if (!validator.isLength(message, { min: 1, max: 255 })) {
      newErrors.message = "Message must be between 1 and 255 characters.";
    }

    // Validate mid
    if (!mid) {
      newErrors.mid = "Mid is required.";
    } else if (!validator.isAlphanumeric(mid)) {
      newErrors.mid = "Mid must be alphanumeric.";
    }

    // Validate date
    if (!date) {
      newErrors.date = "Date is required.";
    } else if (!validator.isISO8601(date)) {
      newErrors.date = "Date must be in YYYY-MM-DD format.";
    }

    // Validate time
    if (!time) {
      newErrors.time = "Time is required.";
    }

    // Validate from
    if (!from) {
      newErrors.from = "From is required.";
    }

    // Validate to
    if (!to) {
      newErrors.to = "To is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  function saveData(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop the process if validation fails
    }

    const noticeadding = {
      message: validator.escape(message),
      mid: validator.escape(mid),
      date,
      time,
      from: validator.escape(from),
      to: validator.escape(to),
    };

    axios.post("http://localhost:8070/announcement/add", noticeadding)
      .then(() => {
        alert("Notice added");
        // Reset form fields after successful submission
        setMessage("");
        setMid("");
        setDate("");
        setTime("");
        setFrom("");
        setTo("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <form onSubmit={saveData} className='container'>
        <h1>Add Message</h1>

        <div className="mb-3">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <div className="text-danger">{errors.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="mid">Mid</label>
          <input
            type="text"
            className="form-control"
            id="mid"
            value={mid}
            onChange={(e) => setMid(e.target.value)}
          />
          {errors.mid && <div className="text-danger">{errors.mid}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <div className="text-danger">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <div className="text-danger">{errors.time}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="from">From</label>
          <input
            type="text"
            className="form-control"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          {errors.from && <div className="text-danger">{errors.from}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="to">To</label>
          <input
            type="text"
            className="form-control"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          {errors.to && <div className="text-danger">{errors.to}</div>}
        </div>

        <button
          type="submit"
          style={{ backgroundColor: '#065A82', color: 'white' }}
          className="btn btn-primary"
        >
          Submit
        </button>
        <br />
        <Link to="/announcement/" style={{ backgroundColor: '#1C7293', color: 'white' }} className="btn btn-primary">
          Back
        </Link>
      </form>
    </div>
  );
}
