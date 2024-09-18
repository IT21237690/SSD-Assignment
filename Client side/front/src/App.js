import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import TeacherRegister from "./components/TeacherReg"
import Dashboard from "./components/Dashboard";
import LoginT from "./components/TeacherLogin";
import ForgotPassword from "./components/ForgotPasswordteacher";
import SutdentForgotPassword from "./components/studentforgotpassword";
import ResultPage from "./components/ViewResults";
import UploadForm from "./components/resultsadd";

import Home from "./components/Home";
import About from "./components/About";
import NoticeBoard from "./components/notices";
import Contact from "./components/Contact";


import Error from "./components/Error";
import TDashboard from "./components/teacherdash";


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";

import WatchCourses from './pages/WatchCourses/WatchCourses';
import AddPayment from './pages/Payment/AddPayment'
import EditCourse from './pages/EditCourse/EditCourse';
import Course from "./pages/Course/Course";

import Hallallocation from "./components/hallalocation";


function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash");
    }
  }

  const TDashboardValid = async () => {
    const token = localStorage.getItem("teachersdatatoken");
    const res = await fetch("/teacher/validteacher", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.status == 401 || !data) {
      console.log("teacher not valid");
    } else {
      console.log("teacher verified");
      setLoginData(data);
      history("/teacherdash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      TDashboardValid();
      setData(true);
    }, 2000);
  }, []);

  
  return (
    <>
      {
        data ? (
          <>
            <Header />

            <Routes>

                            <Route path="/" element={
                  <>
                    <Home />
                    <About />
                    <NoticeBoard />
                    <Contact />
                  </>
                } />

              <Route path="/mainlogin" element={<Login />} />
              <Route path="/Teacher" element={<LoginT />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Tregister" element={<TeacherRegister />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/result" element={<ResultPage />} />

              <Route path='/fpt' element={<ForgotPassword/>}/>
              <Route path='/fps' element={<SutdentForgotPassword/>}/>
          
        
              <Route path="/teacherdash" element={<TDashboard />} />
              <Route path="/addresult" element={<UploadForm />} />

              <Route path="/hall" element={<Hallallocation />} />




              <Route path="/error" element={<Error />} />

            

              {/* <Route path='/payment' element={<AddPayment />} />              */}
              <Route path='/Student_Courses' element={<WatchCourses/>}/>
              <Route path='/Student_Courses/Course/:id' element={<Course  />}/>
              <Route path='/Student_Courses/Course/payment/:id' element={<AddPayment/>}/>
              <Route path='/allCourse/editCourse' element={<EditCourse/>}/>




            </Routes>
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;
