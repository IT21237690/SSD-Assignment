import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [date, setDate] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [fee, setFee] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8070/course/${id}`)
      .then((res) => {
        setCourse(res.data);
        setCourseName(res.data.courseName);
        setTeacherName(res.data.teacherName);
        setGrade(res.data.grade);
        setStartingTime(res.data.startingTime);
        setDate(res.data.date);
        setTimeDuration(res.data.timeDuration);
        setFee(res.data.fee);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  return (
    <center>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <h4
                        class="f-w-600"
                        style={{ color: "white", fontSize: "20px" }}
                      >
                        Course
                      </h4>

                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <center>
                    <div class="col-sm-8">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div class="row">
                          <center>
                            <div class="col-sm-8">
                              <p class="m-b-10 f-w-600">Course Name:</p>
                              <h6 class="text-muted f-w-400">
                                {courseName}
                              </h6>
                            </div>
                          </center>
                          <div class="col-sm-6">
                            <br />
                            <p class="m-b-10 f-w-600">Teacher's Name:</p>
                            <h6 class="text-muted f-w-400">
                              {teacherName}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <br />
                            <p class="m-b-10 f-w-600">Grade:</p>
                            <h6 class="text-muted f-w-400">
                              Grade {grade}
                            </h6>
                          </div>

                          <div class="col-6 ">
                            <br />
                            <p class="m-b-10 f-w-600">Starting Time:</p>
                            <h6 class="text-muted f-w-400">
                              {startingTime}
                            </h6>
                          </div>
                          <div class="col-6">
                            <br />
                            <p class="m-b-10 f-w-600">Date:</p>
                            <h6 class="text-muted f-w-400">
                              {date}
                            </h6>
                          </div>

                          <div class="col-6 ">
                            <br />
                            <p class="m-b-10 f-w-600">Time Duration:</p>
                            <h6 class="text-muted f-w-400">
                              {timeDuration} Hours
                            </h6>
                          </div>
                          <div class="col-6">
                            <br />
                            <p class="m-b-10 f-w-600">Monthly Fee:</p>
                            <h6 class="text-muted f-w-400">
                              Rs. {fee}
                            </h6>
                          </div>
                        </div>

                        <div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/Student_Courses/Course/payment/${course._id}`}>
      <button type="submit" class="btn btn-primary" style={{backgroundColor:'#065A82',color:'white',marginBottom:'50px',marginTop:'0px',width:'40%'}}><b>Enroll</b></button>
      </Link>

    </center>
  );
};

export default Course;
