import React from "react";
import { Link } from 'react-router-dom';
import Logo from './images/logo2.svg'

function Header() {
    return (
        <nav >

            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f2f2f2', padding: '20px 50px' }}>
                <div>
                    <Link style={{ display: 'flex', justifyContent: 'center', textAlign:'center', textDecoration:'none', color:'#000'}}>
                        <div><img src={Logo} style={{ height: '40px', width:'40px' }}/></div>
                        <div style={{padding:'7px', fontWeight:'500'}}>WISHWA</div>
                    </Link>
                </div>
                <div id="navbarSupportedContent" style={{ display: 'flex' }}>
                    <div>
                        <Link to='/'style={{textDecoration: 'none',color:'white',background:'#3461fd',borderRadius: '7px',padding:'10px'}}>Home</Link>
                    </div>
                    <div>
                        <Link to='/Student_Courses' style={{textDecoration: 'none',color:'white',background:'#3461fd',borderRadius: '7px',padding:'10px',marginLeft: '5px'}}>Courses</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;