import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css";
import { useDispatch } from 'react-redux';
import { setJwtToken,userRole, userLoggedIn} from "../../features/counter/authSlice";
import jwtDecode from "jwt-decode";
import {CREATE} from "../../services/Service";

function Login() { 
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const values = {
    email: name,
    password: password,
  };

  async function handleSubmit() { 
    if(name!==null && password!==null && name!==undefined && password!==undefined && name!=="" && password!==""){
   
    const res=await CREATE(`login`,values);
    setToken(res.data);   
    if(res.data.jwtToken!==null){
      sessionStorage.setItem("jwtToken",res.data.jwtToken);
      const jwt_decode=jwtDecode(res.data.jwtToken);

      if(jwt_decode.sub==="Admin"){
        dispatch(userRole());
      }

      dispatch(userLoggedIn());
      console.log("  jwt_decode sub "+JSON.stringify(jwt_decode))
    }


   // setData(data.data); 
    //console.log("  endUrl " + endUrl);
   /*  axios.post(endUrl, values).then((res) => {
      debugger;
      setToken(res.data);   
      if(res.data.jwtToken!==null){
        dispatch(setJwtToken(res.data.jwtToken));
        sessionStorage.setItem("jwtToken",res.data.jwtToken);
        const jwt_decode=jwtDecode(res.data.jwtToken);
        dispatch(userLoggedIn());
        if(jwt_decode.sub==="Admin"){
          dispatch(userRole());
        }
        console.log("  jwt_decode sub "+JSON.stringify(jwt_decode))
      }
    }); */
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
