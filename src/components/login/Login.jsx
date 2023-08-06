import React from 'react';
import { useState } from 'react';
import './login.css';
import axios from "axios";

function Login() {
    const baseUrl=process.env.REACT_APP_BASE_URL
    const [name, setName] = useState("");  
    const [password, setPassword] = useState(""); 
    const [token, setToken] = useState(""); 

    const values={
        email:name, 
        password:password
    }

    const handleSubmit = (event) => {
        const endUrl=baseUrl+"login";
       console.log("  endUrl "+endUrl)
       axios.post(endUrl,values).then(res=>{       
        setToken(res.data.jwtToken)       
        console.log(" token "+JSON.stringify(res.data.token));  
    }) 
    }

  return (   
      <form onSubmit={handleSubmit}  className='login-form'>
      <label>User Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label> <br/>
      <label>Password: &nbsp;&nbsp;
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label><br/>
      <input type="submit" value="Login" className='login'/>
    </form>
  )
}

export default Login
