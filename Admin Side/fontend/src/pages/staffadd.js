import React,{useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Addstaff(){

    const [name,setName] = useState ("");
    const [nic,setNic] = useState ("");
    const [address,setAddress] = useState ("");
    const [age,setAge] = useState ("");
    const [gender,setGender] = useState ("");
    const [land,setLand] = useState ("");
    const [mobile,setMobile] = useState ("");
    const [email,setEmail] = useState ("");
    const [category,setCategory] = useState ("");

    

    function saveData(e){
        e.preventDefault();

        const newStaff = {
            name,
            nic,
            address,
            age,
            gender,
            land,
            mobile,
            email,
            category,
        }

        axios.post("http://localhost:8070/staff/add",newStaff).then(()=>{
            alert("Staff member added")
        }).catch((err)=>{
            alert (err)

        })
    }
    


    return(
        <div >
            <form onSubmit={saveData} className='container'>

                <h1>Add New Staff Member</h1>

                <div class="mb-3">    
                <label for="name">Name</label>
                <input 
                // type="text" 
                placeholder='eg: name surename'
                pattern="^[A-Za-z]+(?:\s+[A-Za-z]+)*$"
                class="form-control" id="name" 
                onChange={(e)=>
                    setName(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="nic" >NIC</label>
                
                <input  type="text" class="form-control" id="nic" 
                placeholder='eg: 1234543212'
                pattern=".{12,12}"
                onChange={(e)=>
                    setNic(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address"
                placeholder='eg: 11, street name, city'
                pattern="^\d+, .+, .+$"
                onChange={(e)=>
                    setAddress(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="age" >Age</label>
                <input type="text" class="form-control" id="age"
                placeholder='eg: 33'
                 pattern="^(?:2[6-9]|[3-9][0-9])$"
                onChange={(e)=>
                    setAge(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="gender" >Gender</label>
                <input type="text" class="form-control" id="gender" 
                placeholder='male/female'
                pattern="^(Male|Female|male|female)$"
                onChange={(e)=>
                    setGender(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="land" >Land Number</label>
                <input  type="text" pattern="[0][0-9]{9}" class="form-control" id="land" 
                placeholder='eg: 0123456789'
                onChange={(e)=>
                    setLand(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="mobile" >Mobile Number</label>
                <input  type="text" pattern="[0][0-9]{9}" class="form-control" id="mobile"
                placeholder='eg: 0123456789'
                onChange={(e)=>
                    setMobile(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" 
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                placeholder='example@ex.com'
                onChange={(e)=>
                    setEmail(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="category" >Category</label>
                <input type="text" class="form-control" id="category"
                placeholder='claricle/security/office'
                pattern="^(Security|Clarical|Office|security|clarical|office)$"
                onChange={(e)=>
                    setCategory(e.target.value)
                }
                ></input>
                </div>

                <button type="submit" style={{backgroundColor: '#065A82',color: 'white'}} class="btn btn-primary">submit</button>
                <div/>
                <br></br>
                {/* <button onclick="/displaystaff" type="submit" class="btn btn-primary">Back</button> */}

                <Link to="/displaystaff" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">Back</Link>



            </form>

        </div>
    )
}