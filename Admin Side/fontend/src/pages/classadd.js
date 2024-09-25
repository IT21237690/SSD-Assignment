import React,{useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Addclass(){

    const [subjectname,setSubjectname] = useState ("");
    const [date,setDate] = useState ("");
    const [time,setTime] = useState ("");
    const [teacher,setTeacher] = useState ("");
    

    function saveData(e){
        e.preventDefault();

        const newClass = {
            subjectname,
            date,
            time,
            teacher,
            
            
        }

        axios.post("http://localhost:8070/class/add",newClass).then(()=>{
            alert("Class details added")
        }).catch((err)=>{
            alert (err)

        })
    }
    


    return(
        <div >
            <form onSubmit={saveData} className='container'>

                <h1>Add New Class</h1>
                <br></br>
                <div class="mb-3">   
                
                <label for="subjectname"> Subjectname </label>
                <input type="text" class="form-control" id="subjectname" 
                onChange={(e)=>
                    setSubjectname(e.target.value)
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
                ></input>
                </div>
                <br></br>

                <div class="mb-3">    
                <label for="date" >Date</label>
                <input  type="text" class="form-control" id="date" 
        
                onChange={(e)=>
                    setDate(e.target.value)
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
                ></input>
                </div>
                <br></br>

                <div class="mb-3">    
                <label for="time">Time</label>
                <input type="text" class="form-control" id="time"
                onChange={(e)=>
                    setTime(e.target.value)
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
                ></input>
                </div>
                <br></br>

                <div class="mb-3">    
                <label for="teacher" >Teacher</label>
                <input type="text" class="form-control" id="teacher"
                onChange={(e)=>
                    setTeacher(e.target.value)
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
                ></input>
                </div>
               <br></br>

                <button type="submit" style={{backgroundColor: '#065A82',color: 'white'}} class="btn btn-primary">submit</button>
                <div/>
                <br></br>
                {/* <button onclick="/displayclass" type="submit" class="btn btn-primary">Back</button> */}

                <Link to="/displayclass" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">Back</Link>



            </form>

        </div>
    )
}

