import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./dashboard.css"

import axios from 'axios';

const TDashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const [marks, setMarks] = useState('');

    const [data, setData] = useState(false);


    const history = useNavigate();

    const TDashboardValid = async () => {
        let token = localStorage.getItem("teachersdatatoken");

        const res = await fetch("/teacher/validteacher", {
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
            history("/teacherdash");
        }
    }

   

    


    useEffect(() => {
        setTimeout(() => {
            TDashboardValid();
            setData(true)
        }, 2000)

    }, [])

    return (
        <>
            {
                data ?
                <center>
                <div class="page-content page-container" id="page-content">
                        <div class="padding">
                            <div class="row container d-flex justify-content-center">
                    <div class="col-xl-6 col-md-12">
                        <div class="card user-card-full">
                            <div class="row m-l-0 m-r-0">
                                <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                                                
                            <h6 class="f-w-600" style={{ color: 'white', fontSize: '20px' }}>{logindata ? logindata.Validteacher.name.toUpperCase() : ""} </h6>
                                                                
                                       <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                       
                                 </div>
                            </div>
                            <center>
                                <div class="col-sm-8">
                                   <div class="card-block">
                                   <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                     <div class="row">
                                      <center><div class="col-sm-7">
                                         <p class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400">{logindata ? logindata.Validteacher.email : ""}<br/><br/></h6>
                                         </div></center> 

                                         <div class="col-sm-6">
                                         <p class="m-b-10 f-w-600">NIC</p>
                                        <h6 class="text-muted f-w-400">{logindata ? logindata.Validteacher.nic : ""}<br/><br/></h6>
                                         </div>
                                         <div class="col-sm-6">
                                         <p class="m-b-10 f-w-600">Address</p>
                                        <h6 class="text-muted f-w-400">{logindata ? logindata.Validteacher.address : ""}<br/><br/></h6>
                                         </div>
                                         
                                         
                                                                    
                                           </div>

                                           <div class="row">
                                       <div class="col-sm-6">
                                         <p class="m-b-10 f-w-600">Mobile</p>
                                        <h6 class="text-muted f-w-400">{logindata ? logindata.Validteacher.mobile : ""}<br/><br/></h6>
                                         </div>

                                         <div class="col-sm-6">
                                         <p class="m-b-10 f-w-600">Subject</p>
                                        <h6 class="text-muted f-w-400">{logindata ? logindata.Validteacher.subject.toUpperCase() : ""}<br/><br/></h6>
                                         </div>
                                         
                                         
                                                                    
                                           </div>
                                           
                                                    
                                                

  
                                              
                                             </div>
                                            
                                         </div>
                                         </center>
                                     </div>
                                     
                                          </div>
                                            </div>
                                             </div>
                                             <center> <button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }}>
  <a href="http://localhost:3002" style={{ textDecoration: 'none', color: 'inherit' }}>Order Food</a>
</button>

<button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }}>
<NavLink to="/addresult" style={{ color: 'white', textDecoration: 'none' }}>Add Results</NavLink>
</button>

<button className="btn btn-primary" style={{ backgroundColor: '#065A82', color: 'white', borderRadius: '10px', marginRight: '10px' }}>
<NavLink to="/hall" style={{ color: 'white', textDecoration: 'none' }}>Halls</NavLink>
</button>
                                                
</center>
                                             
                                                </div>


 </div>
              
              </center>
               : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        

        </>

    )
}

export default TDashboard

//First Name: {logindata ? logindata.ValidUserOne.fname : ""}