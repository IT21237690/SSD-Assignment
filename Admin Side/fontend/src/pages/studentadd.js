import React,{useState} from 'react'
import axios from 'axios';


export default function Addstudent(){

    const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
    

    function sendData(e){
        e.preventDefault();

        const newStudent = {
            name,
            address,
            dob,
            gender,
            mobile,
            email,
            password
        }

        axios.post("http://localhost:8070/student/add",newStudent).then(()=>{
            alert("student added")
        }).catch((err)=>{
            alert (err)

        })
    }


    return(
        // style={{padding:'80px 0px'}}
    <section>
    <div className="container col-lg-5">
      
      <form onSubmit={sendData}>
        <div className="form-group py-3">
          <h4>Add Student</h4>
        </div>

        <div className="form-group">
          {/* image */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="address" className="mt-2">
            Address
          </label>
          
            <input
              type="text"
              placeholder="Enter  address"
              className="form-control"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
           
          <label htmlFor="dob" className="mt-2">
            DoB
          </label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            className="form-control"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
          />
          <label htmlFor="gender" className="mt-2">
              Gender
        </label>
          <input
            type="text"
            placeholder="Gender"
            className="form-control"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          />
          <label htmlFor="mobile" className="mt-2">
              Mobile Number
        </label>
          <input
            type="text"
            placeholder="07xxxxxxxx"
            className="form-control"
            pattern="[0][0-9]{9}"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />

          <label htmlFor="email" className="mt-2">
              Email
        </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label htmlFor="password" className="mt-2">
              Password
        </label>
          <input
            type="text"
            placeholder="Enter Password"
            className="form-control"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          
        </div><br/>
        <button type="submit" class="btn btn-primary">submit</button> <button type="submit" class="btn btn-primary">Back</button>
                <div/>
                
                
        
      </form><br/>
      
      
    </div>
  </section>
);
};
        // <div>
        //     <form onSubmit={sendData}>

        //     <div className='container'>

        //         <h1>Add New Student</h1>
                

        //         <div class="mb-3">    
        //         <label for="name">Name</label>
        //         <input type="text" class="form-control" id="name" 
        //         onChange={(e)=>
        //             setName(e.target.value)
        //         }
        //         ></input>
        //         </div>

        //         <div class="mb-3">    
        //         <label for="gender" >gender</label>
        //         <input ptype="text" class="form-control" id="gender" 
        //         onChange={(e)=>
        //             setgender(e.target.value)
        //         }
        //         ></input>
        //         </div>

        //         <div class="mb-3">    
        //         <label for="address">Address</label>
        //         <input type="text" class="form-control" id="address"
        //         onChange={(e)=>
        //             setaddress(e.target.value)
        //         }
        //         ></input>
        //         </div>

        //         <div class="mb-3">    
        //         <label for="dob" >Date of Birth</label>
                 
        //         <input type="text"  placeholder="DD/MM/YYYY" class="form-control" id="dob"
        //         onChange={(e)=>
        //             setdob(e.target.value)
        //         }
        //         ></input>
        //         </div>

        //         <div class="mb-3">    
        //         <label for="email" >email</label>
        //         <input type="text" class="form-control" id="email" 
        //         onChange={(e)=>
        //             setemail(e.target.value)
        //         }
        //         ></input>
        //         </div>


        //         <div class="mb-3">    
        //         <label for="mobile" >Mobile Number</label>
        //         <input type="text" pattern ="[0][0-9]{9}" class="form-control" id="mobile"
        //         onChange={(e)=>
        //             setmobile(e.target.value)
        //         }
        //         ></input>
        //         </div>

        //         <div class="mb-3">    
        //         <label for="password">password address</label>
        //         <input type="password" class="form-control" id="password" 
        //         onChange={(e)=>
        //             setpassword(e.target.value)
        //         }
        //         ></input>
        //         </div>

                

                // <button type="submit" class="btn btn-primary">submit</button>
                // <div/>
                // <br></br>
                // <button type="submit" class="btn btn-primary">Back</button>
                // </div>
        //     </form>
        
        // </div>
