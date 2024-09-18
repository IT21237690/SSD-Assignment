import axios from 'axios';
import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { LoginContext } from '../../components/ContextProvider/Context';
import CourseList from '../../components/CourseList/CourseList';

const WatchCourses = () => {

    const history = useNavigate();

    const { logindata, setLoginData } = useContext(LoginContext);

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
            history("/error");
        } else {
            console.log("user verify");
            setLoginData(data)
            
        }
    }



    useEffect(() => {
        axios.get('/course/').then((res) => {
            setCourses(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    }, []);

    useEffect(() => {
        DashboardValid();
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
                                        <Link to={`/Student_Courses/Course/${course._id}`}><button className='btn btn-info' type='button' id='EditButton' style={{ backgroundColor: '#065A82',color:'white'}}><b>View</b></button></Link>
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