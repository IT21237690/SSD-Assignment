import React, { useState, useEffect } from 'react'; import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const PaymentDetails = () => {

    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [address, SetAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");

    const genReport = async () => {
    try {
      const res = await axios.get("http://localhost:8070/payment/reporting", {
        responseType: 'blob', // Important: set the response type to "blob"
      });
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      // create a unique filename based on the current date
      const currentDate = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `payment_report_${currentDate}.pdf`);
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      //setVariant("Danger");
      //setcmpMessage("Report genaration");
      //setShow(true);
      console.log(error);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8070/payment/').then((res) => {
      setPayments(res.data);
    }).catch((err) => {
      alert(err.message);
    });
  }, []);

  useEffect(() => {
    const results = payments.filter(payment =>
        payment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, payments]);

  const handleSearch = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };

    return (
        <div className='AllContent'>

      {/* <Sidebar /> */}

      <div className='container' style={{ width: '100%', float: 'right' }}>

        <h2>
          <center>All Payment Details</center>
        </h2>

        <div className='input-group mb-3' style={{ width: '75%', float: 'right', marginTop: '50px' }} >

          <center>
            <input style={{ marginLeft: '100px'}}
              type='text'
              className='form-control'
              placeholder='Search by Name'
              aria-label='Search'
              aria-describedby='search-btn'
              value={searchTerm}
              onChange={handleSearch}
            />
          </center>

          <div style={{ width: '50%', float: 'right' }}>
            <button
              class="btn btn-outline-secondary"
              onClick={genReport}
              style={{ backgroundColor: '#065A82', color: 'white' }}>Generate Report</button>        

          </div>

        </div>

        <div class='table_conatiner' style={{ width: '100%', height: 'auto' }}>

          <table
            className='table table-bordered border-primary'
            style={{ width: '100%' }}>

            <thead>

              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Card Number</th>
                <th scope='col'>Address</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Amount</th>
              </tr>

            </thead>

            <tbody>

              {searchResults.map((course) => (
                <tr key={course._id}>
                  <th onChange={(e) => setName(e.target.value)}>{course.name}</th>
                  <td onChange={(e) => setCardNumber(e.target.value)}>{course.cardNumber}</td>
                  <td onChange={(e) => SetAddress(e.target.value)}>{course.address}</td>
                  <td onChange={(e) => setEmail(e.target.value)}>{course.email}</td>
                  <td onChange={(e) => setPhone(e.target.value)}>{course.phone}</td>
                  <td onChange={(e) => setAmount(e.target.value)}>{course.amount}</td>
                  
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
    )
}

export default PaymentDetails