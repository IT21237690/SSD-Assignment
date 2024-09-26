import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';

const AddCourses = () => {

    const [courseID, SetcourseID] = useState("");
    const [courseName, SetcourseName] = useState("");
    const [teacherName, SetteacherName] = useState("");
    const [grade, Setgrade] = useState("");
    const [startingTime, SetstartingTime] = useState("");
    const [date, Setdate] = useState("");
    const [timeDuration, SettimeDuration] = useState("");
    const [fee, Setfee] = useState("");

    // Helper function to sanitize input (trim white spaces)
    const sanitizeInput = (input) => {
        return input.trim();
    }

    // Validation for courseID (must be selected from the dropdown)
    const validateCourseID = (id) => {
        return id !== "" && id !== "Choose...";
    }

    // Validation for courseName (must be selected from the dropdown)
    const validateCourseName = (name) => {
        return name !== "" && name !== "Choose...";
    }

    // Validation for teacher's name (required and should be a valid name)
    const validateTeacherName = (name) => {
        return !validator.isEmpty(name) && validator.isAlpha(name.replace(/\s/g, ''), 'en-US');
    }

    // Validation for grade (must be an integer and within a valid range)
    const validateGrade = (grade) => {
        return validator.isInt(grade, { min: 1, max: 12 });
    }

    // Validation for starting time (required)
    const validateStartingTime = (time) => {
        return !validator.isEmpty(time);
    }

    // Validation for date (required)
    const validateDate = (date) => {
        return !validator.isEmpty(date);
    }

    // Validation for time duration (must be a positive integer)
    const validateTimeDuration = (duration) => {
        return validator.isInt(duration, { min: 1 });
    }

    // Validation for fee (must be a positive number)
    const validateFee = (fee) => {
        return validator.isNumeric(fee, { no_symbols: true });
    }

    // Main function to handle submission
    function sendData(event) {
        event.preventDefault();

        // Sanitize inputs
        const sanitizedCourseID = sanitizeInput(courseID);
        const sanitizedCourseName = sanitizeInput(courseName);
        const sanitizedTeacherName = sanitizeInput(teacherName);
        const sanitizedGrade = sanitizeInput(grade);
        const sanitizedStartingTime = sanitizeInput(startingTime);
        const sanitizedDate = sanitizeInput(date);
        const sanitizedTimeDuration = sanitizeInput(timeDuration);
        const sanitizedFee = sanitizeInput(fee);

        // Validate inputs
        if (
            validateCourseID(sanitizedCourseID) &&
            validateCourseName(sanitizedCourseName) &&
            validateTeacherName(sanitizedTeacherName) &&
            validateGrade(sanitizedGrade) &&
            validateStartingTime(sanitizedStartingTime) &&
            validateDate(sanitizedDate) &&
            validateTimeDuration(sanitizedTimeDuration) &&
            validateFee(sanitizedFee)
        ) {
            const newCourse = {
                courseID: sanitizedCourseID,
                courseName: sanitizedCourseName,
                teacherName: sanitizedTeacherName,
                grade: sanitizedGrade,
                startingTime: sanitizedStartingTime,
                date: sanitizedDate,
                timeDuration: sanitizedTimeDuration,
                fee: sanitizedFee
            };

            axios.post("http://localhost:8070/course/add", newCourse).then(() => {
                Swal.fire(
                    'Successful!',
                    'Course Added!',
                    'success'
                );
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Validation Failed',
                text: 'Please check the input fields and try again.'
            });
        }
    }

    return (
        <div>
            <div className='container' style={{ width: '100%', float: 'right' }}>
                <center><h2>Add Course</h2></center>
                <div style={{ marginTop: '50px' }}>
                    <form class="row g-3" onSubmit={sendData}>
                        <div class="col-md-6">
                            <label class="form-label">Course ID</label>
                            <select class="form-select" size="3"
                                onChange={(event) => SetcourseID(event.target.value)}>
                                <option selected>Choose...</option>
                                <option value="GE000">Sinhala - GE000</option>
                                <option value="GE001">Tamil - GE001</option>
                                {/* Add other options */}
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label for="inputState" class="form-label">Course Name</label>
                            <select class="form-select" size="3"
                                onChange={(event) => SetcourseName(event.target.value)}>
                                <option selected>Choose...</option>
                                <option value="Sinhala">Sinhala - GE000</option>
                                <option value="Tamil">Tamil - GE001</option>
                                {/* Add other options */}
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Teacher's Name</label>
                            <input type="text" class="form-control" placeholder='Mr.Uddika Buddhikumara' required
                                onChange={(event) => SetteacherName(event.target.value)} />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Grade</label>
                            <input type="number" class="form-control" placeholder='08' required
                                onChange={(event) => Setgrade(event.target.value)} />
                        </div>

                        <div class="col-md-2">
                            <label class="form-label">Starting Time</label>
                            <input type="text" class="form-control" placeholder="11.00 a.m" required
                                onChange={(event) => SetstartingTime(event.target.value)} />
                        </div>

                        <div class="col-6">
                            <label class="form-label">Date</label>
                            <input type="text" class="form-control" placeholder="Wednesday" required
                                onChange={(event) => Setdate(event.target.value)} />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Time Duration (Hours)</label>
                            <input type="text" class="form-control" placeholder='02' required
                                onChange={(event) => SettimeDuration(event.target.value)} />
                        </div>

                        <div class="col-md-2">
                            <label class="form-label">Fee (Rs.)</label>
                            <input type="number" class="form-control" placeholder='5000' required
                                onChange={(event) => Setfee(event.target.value)} />
                        </div>

                        <div class="col-12" style={{ width: '100%' }}>
                            <button type="submit" class="btn btn-primary" style={{ width: '100%' }}>Add Course</button>
                        </div>

                        <div class="col-12" style={{ width: '100%' }}>
                            <Link to='/allCourse'><button type="button" class="btn btn-primary" style={{ width: '100%' }}>All courses</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCourses;
