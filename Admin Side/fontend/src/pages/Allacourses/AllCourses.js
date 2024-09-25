import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './AllCourses.module.css';
import Swal from 'sweetalert2';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [date, setDate] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [fee, setFee] = useState("");

  const navigate = useNavigate();

  const handleDestination = () => {
    navigate("/editCourse", { state: { courseID, courseName, teacherName, grade, startingTime, date, timeDuration, fee } });
  };



  const genReport = async () => {
    try {
      const res = await axios.get("http://localhost:8070/course/reporting", {
        responseType: 'blob', // Important: set the response type to "blob"
      });
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      // create a unique filename based on the current date
      const currentDate = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `course_report_${currentDate}.pdf`);
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
    axios.get('http://localhost:8070/course/').then((res) => {
      setCourses(res.data);
    }).catch((err) => {
      alert(err.message);
    });
  }, []);

  useEffect(() => {
    const results = courses.filter(course =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, courses]);

  const handleSearch = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };


  const deleteCourse = (id) => {
    axios.delete(`http://localhost:8070/course/delete/${id}`).then((res) => {
      // alert(res.data);

      Swal.fire('Succesfully Deleted')


      setCourses(courses.filter((course) => course.courseID !== id));
    }).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div className='AllContent'>

      <div className='container' style={{ width: '100%', float: 'right' }}>

        <h2>
          <center>All Courses Details</center>
        </h2>

        <div className='input-group mb-3' style={{ width: '75%', float: 'right', marginTop: '50px' }} >

          <center>
            <input style={{marginLeft: '100px'}}
              type='text'
              className='form-control'
              placeholder='Search by course Name'
              aria-label='Search'
              aria-describedby='search-btn'
              value={searchTerm}
              onChange={handleSearch}
            />
          </center>

          <div style={{ width: '50%', float: 'right', marginLef: '100px' }}>
            <button
              class="btn btn-outline-secondary"
              onClick={genReport}
              style={{ backgroundColor: '#065A82', color: 'white' }}>Generate Report</button>

            <Link to='/allCourse/addCourse'>
              <button
                class="btn btn-outline-secondary"
                style={{ backgroundColor: '#1C7293', color: 'white' }}>Add Course</button>
            </Link>

          </div>

        </div>

        <div class='table_conatiner' style={{ width: '100%', height: 'auto' }}>

          <table
            className='table table-bordered border-primary'
            style={{ width: '100%' }}>

            <thead>

              <tr>
                <th scope='col'>Course ID</th>
                <th scope='col'>Course Name</th>
                <th scope='col'>Teacher's Name</th>
                <th scope='col'>Grade</th>
                <th scope='col'>Starting Time</th>
                <th scope='col'>Date</th>
                <th scope='col'>Time Duration</th>
                <th scope='col'>Fee</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>

            </thead>

            <tbody>

              {searchResults.map((course) => (
                <tr key={course._id}>
                  <th onChange={(e) => setCourseID(e.target.value)}>{course.courseID}</th>
                  <td onChange={(e) => setCourseName(e.target.value)}>{course.courseName}</td>
                  <td onChange={(e) => setTeacherName(e.target.value)}>{course.teacherName}</td>
                  <td onChange={(e) => setGrade(e.target.value)}>Grade {course.grade}</td>
                  <td onChange={(e) => setStartingTime(e.target.value)}>{course.startingTime}</td>
                  <td onChange={(e) => setDate(e.target.value)}>{course.date}</td>
                  <td onChange={(e) => setTimeDuration(e.target.value)}>{course.timeDuration} hours</td>
                  <td onChange={(e) => setFee(e.target.value)}>Rs.{course.fee}</td>
                  <td>

                  <Link to={`/allCourse/editCourse/${course._id}`}>
                    <button className='btn btn-info' style={{backgroundColor: '#065A82',color: 'white'}} type='button' id='EditButton'>
                      Edit
                    </button>
                  </Link>
                    
                  </td>
                  <td>
                    <button className='btn btn-danger' type='button' id='DeleteButton' onClick={() => deleteCourse(course.id )}>Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AllCourses;