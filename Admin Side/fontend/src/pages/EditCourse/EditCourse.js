import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const EditCourse = () => {

   const { id  } = useParams();

    const navigate = useNavigate();

    const [course, setCourse] = useState({});
    const [courseName, setCourseName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [grade, setGrade] = useState('');
    const [startingTime, setStartingTime] = useState('');
    const [date, setDate] = useState('');
    const [timeDuration, setTimeDuration] = useState('');
    const [fee, setFee] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8070/course/${id}`).then((res) => {
            setCourse(res.data);
            setCourseName(res.data.courseName);
            setTeacherName(res.data.teacherName);
            setGrade(res.data.grade);
            setStartingTime(res.data.startingTime);
            setDate(res.data.date);
            setTimeDuration(res.data.timeDuration);
            setFee(res.data.fee);
        }).catch((err) => {
            alert(err.message);
        });
    }, [id ]);

    const handleUpdate = (event) => {
        event.preventDefault();
        const updatedCourse = {
            courseName,
            teacherName,
            grade,
            startingTime,
            date,
            timeDuration,
            fee,
        };
        axios.put(`http://localhost:8070/course/update/${id }`, updatedCourse).then((res) => {
            Swal.fire(
                'Updated !',
                'You clicked the button!',
                'success'
              )
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <div>

            {/* <Sidebar /> */}

            <div style={{ width: '100%', float: 'right' }}>
                <h2>
                    <center>Edit Course Details</center>
                </h2>

                <div className='container' style={{width: '75%',marginTop: '50px'}}>

                    <form onSubmit={handleUpdate}>

                        <div className='form-group'>
                            <label>Course Name</label>
                            <input type='text' className='form-control' value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Teacher's Name</label>
                            <input type='text' className='form-control' value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Grade</label>
                            <input type='text' className='form-control' value={grade} onChange={(e) => setGrade(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Starting Time</label>
                            <input type='text' className='form-control' value={startingTime} onChange={(e) => setStartingTime(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Date</label>
                            <input type='text' className='form-control' value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Time Duration</label>
                            <input type='text' className='form-control' value={timeDuration} onChange={(e) => setTimeDuration(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Fee</label>
                            <input type='text' className='form-control' value={fee} onChange={(e) => setFee(e.target.value)} />
                        </div>

                        <div style={{marginTop:'50px',width:'100%'}}>
                            <button type='submit' className='btn btn-primary' style={{width:'100%'}}>Update</button>
                        </div>

                        <div class="col-12" style={{marginTop:'25px',width:'100%'}}>
                            <Link to='/allCourse'><button type="submit" class="btn btn-primary" style={{width:'100%'}}>All courses</button></Link>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};

export default EditCourse;