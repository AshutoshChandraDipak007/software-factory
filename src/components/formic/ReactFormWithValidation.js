
import React, { useState } from "react";

import {useParams} from "react-router-dom";

const ReactFormWithValidation = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const {name} = useParams();

 const handleSubmit = (e) => {
  console.log(" calory "+name);
   e.preventDefault();
   alert("The email address and password are " + email + " and " + password + " respectively.");
 };

 return (
   <div>
       <span>{name}</span>
   </div>
 );
};


export default ReactFormWithValidation;