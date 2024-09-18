import React, { createContext, useState } from 'react'


export const LoginContext = createContext("");
export const adddata = createContext("");
export const updatedata = createContext("");
export const deldata = createContext("");

const Context = ({children}) => {

    const [logindata,setLoginData] = useState("");
    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");

  return (
    <>
    <LoginContext.Provider value={{logindata,setLoginData}}>
    <adddata.Provider value={{ udata, setUdata }}>
            <updatedata.Provider value={{ updata, setUPdata }}>
                <deldata.Provider value={{dltdata, setDLTdata}}>
        {children}
        </deldata.Provider>

            </updatedata.Provider>

        </adddata.Provider>
    </LoginContext.Provider>
    </>
  )
}

export default Context