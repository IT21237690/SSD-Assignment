import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , NavLink } from "react-router-dom"

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/student/logout", {
            method: "GET",
    
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);
        

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    };


    const logoutteacher = async () => {
        let token = localStorage.getItem("teachersdatatoken");

        const res = await fetch("/teacher/Tlogout", {
            method: "GET",
    
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);
        

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("teachersdatatoken");
            setLoginData(false)
            history("/Teacher");
        } else {
            console.log("error");
        }
    };
      

    const goDash = () => {
        if (logindata.ValidUserOne) {
            history("/dash")
        } else if (logindata.Validteacher) {
            history("/teacherdash")
        }
    }

    const gologin = () => {
        history("/mainlogin")
    }

    return (
        <>
            <header>
                <nav>
                    
                <NavLink to="/" style={{ textDecoration: 'none' }}>
  <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem', fontWeight: 'bold', color: '#065A82', margin: 0 }}>WISHWA INSTITUTE</h1>
</NavLink>



                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.name[0].toUpperCase()}</Avatar> :
                            logindata.Validteacher ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.Validteacher.name[0].toUpperCase()}</Avatar> :
                            <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                        

                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne || logindata.Validteacher ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logindata.ValidUserOne ? logoutuser() : logoutteacher();
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        gologin()
                                        handleClose()
                                    }}>Login</MenuItem>
                                </>
                            )
                        }

                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header