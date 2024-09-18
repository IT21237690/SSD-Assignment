import React,{useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Addhall(){

    const [hallname,setHallname] = useState ("");
    const [classname,setClassname] = useState ("");
    const [location,setLocation] = useState ("");
    

    function saveData(e){
        e.preventDefault();

        const newHall = {
            hallname,
            classname,
            location,
            
            
        }

        axios.post("http://localhost:8070/hall/add",newHall).then(()=>{
            alert("Hall details added")
        }).catch((err)=>{
            alert (err)

        })
    }
    


    return(
        <div >
            <form onSubmit={saveData} className='container'>

                <h1>Add New Hall</h1>
            <br></br>
                <div hall="mb-3">    
                <label for="hallname">Hallname</label>
                <input type="text" class="form-control" id="hallname" 
                onChange={(e)=>
                    setHallname(e.target.value)
                    
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
            
                ></input>
                </div>
                <br></br>

                <div class="mb-3">    
                <label for="classname" >Classname</label>
                <input  type="text" class="form-control" id="classname" 
                pattern=".{12-12}"
                onChange={(e)=>
                    setClassname(e.target.value)
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
                ></input>
                </div>
               <br></br>
                <div class="mb-3">    
                <label for="location">location</label>
                <input type="text" class="form-control" id="location"
                onChange={(e)=>
                    setLocation(e.target.value)
                }
                style={{margin:'auto',borderRadius:'10px',border:'none',height:'33px',boxShadow:'0 6px 6px -6px black',border:'2px solid pink'}}
                ></input>
                </div>
                <br></br>

                <button type="submit" style={{backgroundColor: 'white',color: 'black',padding:'3px 3px',margin:'auto',borderRadius:'15px',border:'2px solid black'}} class="btn btn-primary">submit</button>
                <div/>
                <br></br>
                {/* <button onclick="/displayclass" type="submit" class="btn btn-primary">Back</button> */}

                <Link to="/displayhall" style={{backgroundColor: 'white',color: 'black',padding:'3px 3px',margin:'auto',borderRadius:'15px',border:'2px solid black'}} className="btn btn-primary">Back</Link>



            </form>

        </div>
    )
}

