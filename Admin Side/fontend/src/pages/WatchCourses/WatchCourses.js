import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import CourseList from '../../components/CourseList/CourseList';

const WatchCourses = () => {

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

    // starting Code
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



    return (
        <div>
            <div>
                <Header />
                <CourseList/>
            </div>

            <div className='container' style={{ width: '75%', float: 'right' }}>

                <h2 style={{marginTop:'25px'}}>
                    <center>All Courses Details</center>
                </h2>

                <div className='input-group mb-3' style={{ width: '75%', float: 'right', marginTop: '50px' }} >

                    <center>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search by course Name'
                            aria-label='Search'
                            aria-describedby='search-btn'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </center>

                </div>

                <div class='table_conatiner' style={{ width: '100%', height: 'auto' }}>

                    <table
                        className='table table-bordered border-primary'
                        style={{ width: '100%' }}>

                        <thead>
                                {/*table*/}
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
                            </tr>

                        </thead>

                        <tbody>

                            {searchResults.map((course) => (
                                <tr key={course._id}>
                                    <th >{course.courseID}</th>
                                    <td >{course.courseName}</td>
                                    <td >{course.teacherName}</td>
                                    <td >Grade {course.grade}</td>
                                    <td >{course.startingTime}</td>
                                    <td >{course.date}</td>
                                    <td >{course.timeDuration} hours</td>
                                    <td >Rs.{course.fee}</td>
                                    <td>
                                        <Link to='/allCourse/editCourse'><button className='btn btn-info' type='button' id='EditButton' style={{ backgroundColor: '#16FF00' }}>View</button></Link>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    )
}

export default WatchCourses