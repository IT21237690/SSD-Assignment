import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCourses = () => {

    const [courseID, SetcourseID] = useState("");
    const [courseName, SetcourseName] = useState("");
    const [teacherName, SetteacherName] = useState("");
    const [grade, Setgrade] = useState("");
    const [startingTime, SetstartingTime] = useState("");
    const [date, Setdate] = useState("");
    const [timeDuration, SettimeDuration] = useState("");
    const [fee, Setfee] = useState("");

    function sendData(event) {
        event.preventDefault();

        const newCourse = {
            courseID,
            courseName,
            teacherName,
            grade,
            startingTime,
            date,
            timeDuration,
            fee
        }

        axios.post("http://localhost:8070/course/add", newCourse).then(() => {
            Swal.fire(
                'Successful !',
                'Course Added!',
                'success'
              )
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        })
    }

    return (
        <div>

            <div className='container' style={{ width: '100%', float: 'right'}}>

                <center><h2>Add Course</h2></center>

                <div style={{ marginTop: '50px'}}>

                    <form class="row g-3">

                        <div class="col-md-6">

                            <label class="form-label">Course ID</label>
                            <select class="form-select" size="3" aria-label="size 3 select example"
                                onChange={(event) => {
                                    SetcourseID(event.target.value)
                                }}>
                                <option selected>Choose...</option>
                                <option value="GE000">Sinhala - GE000</option>
                                <option value="GE001">Tamil - GE001</option>
                                <option value="GE002">English - GE002</option>
                                <option value="GE003">Mathematics - GE003</option>
                                <option value="GE004">Science - GE004</option>
                                <option value="GE005">History - GE005</option>
                                <option value="GE006">Geography - GE006</option>
                                <option value="OL001">Commerce - OL001</option>
                                <option value="AL001">ICT - AL001</option>
                                <option value="AL002">Physics - AL002</option>
                                <option value="AL003">Chemistry - AL003</option>
                                <option value="AL004">Combined Mathematics - AL004</option>
                                <option value="AL005">Biology - AL005</option>
                                <option value="AL006">Agricultural Science - AL006</option>
                                <option value="AL007">Accounting - AL007</option>
                                <option value="AL008">Business Studies - AL008</option>
                                <option value="AL009">Economics - AL009</option>
                                <option value="AL010">Business Statistics - AL010</option>
                            </select>

                        </div>

                        <div class="col-md-6">

                            <label for="inputState" class="form-label">Course Name</label>
                            <select class="form-select" size="3" aria-label="size 3 select example"
                                onChange={(event) => {
                                    SetcourseName(event.target.value)
                                }}>
                                <option selected>Choose...</option>
                                <option value="Sinhala">Sinhala - GE000</option>
                                <option value="Tamil">Tamil - GE001</option>
                                <option value="English">English - GE002</option>
                                <option value="Mathematics">Mathematics - GE003</option>
                                <option value="Science">Sciencr - GE004</option>
                                <option value="History">History - GE005</option>
                                <option value="Geography">Geography - GE006</option>
                                <option value="Commerce">Commerce - OL001</option>
                                <option value="ICT">ICT - AL001</option>
                                <option value="Physics">Physics - AL002</option>
                                <option value="Chemistry">Chemistry - AL003</option>
                                <option value="Combined Mathematics">Combined Mathematics - AL004</option>
                                <option value="Biology">Biology - AL005</option>
                                <option value="Agricultural Science">Agricultural Science - AL006</option>
                                <option value="Accounting">Accounting - AL007</option>
                                <option value="Business Studies">Business Studies - AL008</option>
                                <option value="Economics">Economics - AL009</option>
                                <option value="Business Statistics">Business Statistics - AL010</option>
                            </select>

                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Teacher's Name</label>
                            <input type="text" class="form-control" id="inputTeachersName" placeholder='Mr.Uddika Buddhikumara' required
                                onChange={(event) => {
                                    SetteacherName(event.target.value)
                                }} />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Grade</label>
                            <input type="number" class="form-control" id="inputGrade" placeholder='08' require
                                onChange={(event) => {
                                    Setgrade(event.target.value)
                                }} />
                        </div>

                        <div class="col-md-2">
                            <label class="form-label">Starting Time</label>
                            <input type="text" class="form-control" id="inputStartingTime" placeholder="11.00 a.m" require
                                onChange={(event) => {
                                    SetstartingTime(event.target.value)
                                }} />
                        </div>

                        <div class="col-6">
                            <label class="form-label">date</label>
                            <input type="text" class="form-control" id="inputDate" placeholder="Wednesday" require
                                onChange={(event) => {
                                    Setdate(event.target.value)
                                }} />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Time Duration (Hours)</label>
                            <input type="text" class="form-control" id="inputTimeDuration" placeholder='02' require
                                onChange={(event) => {
                                    SettimeDuration(event.target.value)
                                }} />
                        </div>

                        <div class="col-md-2">
                            <label class="form-label">Fee (Rs.)</label>
                            <input type="number" class="form-control" id="inputFee" placeholder='5000' require
                                onChange={(event) => {
                                    Setfee(event.target.value)
                                }} />
                        </div>

                        <div class="col-12" style={{width: '100%'}}>
                            <button type="submit" class="btn btn-primary" onClick={sendData} style={{width:'100%'}}>Add Course</button>
                        </div>

                        <div class="col-12" style={{width: '100%'}}>
                            <Link to='/allCourse'><button type="submit" class="btn btn-primary" style={{width:'100%'}}>All courses</button></Link>
                        </div>

                    </form>

                </div>



            </div>

        </div>
    )
}

export default AddCourses