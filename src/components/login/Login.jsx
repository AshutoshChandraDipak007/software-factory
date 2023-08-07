import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { setJwtToken, userLoggedIn} from "../../features/counter/counterSlice";
import { useDispatch } from 'react-redux';

function Login() {
  const dispatch = useDispatch()
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const values = {
    email: name,
    password: password,
  };

  function handleSubmit() { 
    if(name!==null && password!==null && name!==undefined && password!==undefined && name!=="" &&password!==""){
    const endUrl = baseUrl + "login";
    console.log("  endUrl " + endUrl);
    axios.post(endUrl, values).then((res) => {
      setToken(res.data);   
      if(res.data.jwtToken!==null){
        console.log(" res.data.jwtToken "+res.data.jwtToken);
        dispatch(setJwtToken(res.data.jwtToken));
        dispatch(userLoggedIn());
      }
    });
  }  
  }

  return (
    <div className="login-form">
      <label>
        User Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password: &nbsp;&nbsp;
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />    
      <button type="submit" className="login" onClick={() => handleSubmit()}>
        Login
      </button>      
    </div>
  );
}
export default Login;
