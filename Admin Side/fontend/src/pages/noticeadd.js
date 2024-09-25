import React,{useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Addnotice(){

    const [message,setMessage] = useState ("");
    const [mid,setMid] = useState ("");
    const [date,setDate] = useState ("");
    const [time,setTime] = useState ("");
    const [from,setFrom] = useState ("");
    const [to,setTo] = useState ("");

    function saveData(e){
        e.preventDefault();

        const noticeadding = {
            message,
            mid,
            date,
            time,
            from,
            to,
        }

        axios.post("http://localhost:8070/announcement/add",noticeadding).then(()=>{
            alert("notice added")
        }).catch((err)=>{
            alert (err)

        })
    }
    


    return(
        <div>
            <form onSubmit={saveData} className='container'>

                <h1>Add message</h1>

                <div class="mb-3">    
                <label for="message">message</label>
                <input type="text" class="form-control" id="message" 
                onChange={(e)=>
                    setMessage(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="mid" >mid</label>
                <input ptype="text" class="form-control" id="mid" 
                onChange={(e)=>
                    setMid(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="date">date</label>
                <input type="text" class="form-control" id="date" 
                onChange={(e)=>
                    setDate(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="dob" >time</label> 
                <input type="time" class="form-control" id="time"
                onChange={(e)=>
                    setTime(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="from" >from</label>
                <input type="text" class="form-control" id="from" 
                onChange={(e)=>
                    setFrom(e.target.value)
                }
                ></input>
                </div>


                <div class="mb-3">    
                <label for="to" >to</label>
                <input type="text" class="form-control" id="to"
                onChange={(e)=>
                    setTo(e.target.value)
                }
                ></input>
                </div>

                <button type="submit" style={{backgroundColor: '#065A82',color: 'white'}} class="btn btn-primary">submit</button>
                <div/>
                <br></br>
                {/* <button onclick="/displaynotice" type="submit" class="btn btn-primary">Back</button> */}

                <Link to="/announcement/" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">Back</Link>



            </form>

        </div>
    )
}

