import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./dashboard.css"


import axios from 'axios';

const Dashboard = () => {

   

    const { logindata, setLoginData } = useContext(LoginContext);
    const [marks, setMarks] = useState([]);
    const [subject, setSubject] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/student/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }

    const handleGetResult = async () => {
        try {
          const response = await axios.get(`/results/student/results/${logindata ? logindata.ValidUserOne.name : ""}`);
          const data = response.data.results;
          const allMarks = data.map((result) => result.marks);
          const allSubjects = data.map((result) => result.subject);
          setMarks(allMarks);
          setSubject(allSubjects);
          setShowTable(true);
        } catch (err) {
          console.error(err.message);
        }
      };
      

      
      

    useEffect(() => {
        setTimeout(() => {
            
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    
    



    return (
        <>
            {

                
                data ?

                
         
                <>
                <center><div class="page-content page-container" id="page-content">
                        <div class="padding">
                            <div class="row container d-flex justify-content-center">
                                <div class="col-xl-6 col-md-12">
                                    <div class="card user-card-full">
                                        <div class="row m-l-0 m-r-0">
                                            <div class="col-sm-4 bg-c-lite-green user-profile">
                                                <div class="card-block text-center text-white">

                                                    <h6 class="f-w-600" style={{ color: 'white', fontSize: '20px' }}>{logindata ? logindata.ValidUserOne.name.toUpperCase() : ""} </h6>

                                                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>

                                                </div>
                                            </div>
                                            <center>
                                            <div class="col-sm-8">
                                                <div class="card-block">
                                                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                    <div class="row">
                                                        <center>
                                                        <div class="col-sm-8">
                                                            <p class="m-b-10 f-w-600">Email</p>
                                                            <h6 class="text-muted f-w-400">{logindata ? logindata.ValidUserOne.email : ""}</h6>
                                                        </div>
                                                        </center>
                                                        <div class="col-sm-6"><br />
                                                            <p class="m-b-10 f-w-600">Phone</p>
                                                            <h6 class="text-muted f-w-400">{logindata ? logindata.ValidUserOne.mobile : ""}</h6>
                                                        </div>
                                                        <div class="col-sm-6"><br />
                                                            <p class="m-b-10 f-w-600">Address</p>
                                                            <h6 class="text-muted f-w-400">{logindata ? logindata.ValidUserOne.address : ""}</h6>
                                                        </div>
                                                        
                                                        <div class="col-6 "><br />
                                                            <p class="m-b-10 f-w-600">DoB</p>
                                                            <h6 class="text-muted f-w-400">{logindata ? logindata.ValidUserOne.dob : ""}</h6>
                                                        </div>
                                                        <div class="col-6"><br />
                                                            <p class="m-b-10 f-w-600">Student ID</p>
                                                            <h6 class="text-muted f-w-400">{logindata ? logindata.ValidUserOne.Sid : ""}</h6>
                                                        </div>
                                                      

                                                    </div>

                                                    <div>
                                                        <div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            </center>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                           <center> 
                        
                            
<button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }} onClick={handleGetResult}>Results</button>




<button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }}>
  <NavLink to="/Student_Courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</NavLink>
</button>
<button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }}>
  <a href="http://localhost:3002" style={{ textDecoration: 'none', color: 'inherit' }}>Order Food</a>
</button>


</center>
<br/><br/>


{showTable && (
        <table style={{ borderCollapse: 'collapse', width: '40%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid blue', padding: '10px', textAlign: 'center' }}>Subject</th>
              <th style={{ border: '1px solid blue', padding: '10px', textAlign: 'center' }}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {subject.map((subj, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid blue', padding: '10px', textAlign: 'center' }}>{subj}</td>
                <td style={{ border: '1px solid blue', padding: '10px', textAlign: 'center' }}>{marks[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

                        </div>
                    </div><div>
 

                    

    </div></center></>
              
              
               : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        

        </>

    )
}

export default Dashboard