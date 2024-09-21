import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./components/Sidebar";
import "./new.css";



//pages and components
import Display from "./pages/displaystudents";
import Addstudent from "./pages/studentadd";
import UpdateStudent from "./pages/updatestudent";

import AdminPage from './pages/displayteacherReq.js';


import Addstaff from "./pages/staffadd";
import DisplayS from "./pages/displaystaff";
import Updatestaff from "./pages/updatestaff";


import DisplayT from "./pages/displayteachers";
import Updateteacher from "./pages/updateteacher";

import DisplayInventory from "./pages/DisplayInventory";
import CreateInventory from "./pages/CreateInventory";
import UpdateInventory from "./pages/UpdateInventory";

import AddCourses from './pages/AddCourses/AddCourses';
import AllCourses from './pages/Allacourses/AllCourses';
import PaymentDetails from "./pages/paymentDetails/PaymentDetails";
import EditCourse from './pages/EditCourse/EditCourse';
import Home from './pages/Home_M/Home';
import WatchCourses from './pages/WatchCourses/WatchCourses';

import Addnotice from "./pages/noticeadd";
import DisplayN from "./pages/displaynotice";
import Updatenotice from "./pages/updatenotice";


import DisplayC from "./pages/displayclass";
import DisplayH from './pages/displayhall';
import Addclass from "./pages/classadd";
import Addhall from './pages/halladd';
import Updateclass from "./pages/updateclass";
import Updatehall from "./pages/updatehall";
import ReportClass from "./pages/classreport";



// import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <div >
        <Row>
          <BrowserRouter>


          
          <Col className="p-0 vh-100 sidebar" lg="2">
            <Sidebar/>
          </Col>
        <Col className="p-0 my-container" lg="10">
            <div className="pages">
              <Routes>

                {/* student routes */}
                <Route path="/addstudent" element={<Addstudent />} />
                <Route path="/" element={<Display />} />
                <Route path="/update/:id" element={<UpdateStudent />} />

                <Route path="/adminreq" element={<AdminPage />} />

               {/* staff routes */}
               <Route path="/addstaff" element={<Addstaff />} />
                <Route path="/displaystaff" element={<DisplayS />} />
                <Route path="/updatestaff/:id" element={<Updatestaff />} />


                 {/* teacher routes */}
                
                <Route path="/displayteacher" element={<DisplayT />} />
                <Route path="/updateteacher/:id" element={<Updateteacher />} />

                <Route path='/payment' element={<PaymentDetails />} />
                <Route path='/allCourse/addCourse' element={<AddCourses />} />
                <Route path='/allCourse' element={<AllCourses/>}/>
                <Route path='/allCourse/editCourse/:id' element={<EditCourse/>}/>
                <Route path='/Student_Courses' element={<WatchCourses/>}/>


                <Route path="/announcement/add" element={<Addnotice />} />
                <Route path="/announcement/" element={<DisplayN />} />
                <Route path="/announcement/update/:id" element={<Updatenotice />} />


                <Route

                    path="/InventoryManagment"
                    element={<DisplayInventory />}
                  />

                  <Route
                    path="/InventoryManagment/CreateInventory"
                    element={<CreateInventory />}
                  />

                  <Route
                    path="/InventoryManagment/UpdateInventory/:id"
                    element={<UpdateInventory />}
                  />




              <Route path="/displayclass" element={<DisplayC />} />
              <Route path="/displayhall" element={<DisplayH />} />
              <Route path="/classadd" element={<Addclass />} />
              <Route path="/halladd" element={<Addhall />} />
              <Route path="/updateclass/:id" element={<Updateclass />} />
              <Route path="/updatehall/:id" element={<Updatehall />} />
              <Route path="/classreport" element={<ReportClass />} />

                




                </Routes>
              </div>
            </Col>
          </BrowserRouter>
        </Row>
      </div>
    </div>
  );
}

export default App;
