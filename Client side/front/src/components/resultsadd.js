import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post('/results/upload', formData)
      .then(res => {
        setMessage(res.data.message);
        setFile(null);
      })
      .catch(err => {
        console.error(err);
        setMessage('There was an error uploading the file.');
      });
  }

  return (
  
<center>
    
  
        
    

       
        <form onSubmit={handleSubmit}>
        <center><div>
            <h1>Upload Result File</h1>
          </div></center>
          {message && <p>{message}</p>}
          <div >
        

          <input type="file" accept=".txt" onChange={handleFileChange} />

            </div>
          <button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }}>Submit</button>
        </form>
        
      
    
    </center>
  );
  
}

export default UploadForm;
