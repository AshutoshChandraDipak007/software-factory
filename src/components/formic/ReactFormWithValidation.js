/* import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./formstyle.css";

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });


function ReactFormWithValidation() {
  return (
    <div>
      <ValidationSchemaExample />
    </div>
  )
}

const ValidationSchemaExample = () => (
  <div>

    <h1>Signup</h1>

    <Formik

      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}

      validationSchema={SignupSchema}

      onSubmit={values => {
        debugger;
        console.log(values);
      }}

    >
      {({ errors, touched }) => (

        <Form>
          <Field name="firstName" />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}

          <Field name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}


          <button type="submit">Submit</button>

        </Form>
      )}
    </Formik>
  </div>
);



export default ReactFormWithValidation */

import React, { useState } from "react";



const ReactFormWithValidation = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
   e.preventDefault();
   alert("The email address and password are " + email + " and " + password + " respectively.");
 };

 return (
   <div className="app">
     <form onSubmit={handleSubmit} >
       <h1>Register</h1>
       <div className="formInput">
         <label>Email</label>
         <input
           type="email"
           name="email"
           value={email}
           placeholder="Enter your email..."
           onChange={(e) => setEmail(e.target.value)}
         />
       </div>
       <div className="formInput">
         <label>Password</label>
         <input
           type="password"
           name="password"
           value={password}
           placeholder="Enter a strong password..."
           onChange={(e) => setPassword(e.target.value)}
         />
       </div>
       <button>Submit</button>
     </form >
   </div >
 );
};


export default ReactFormWithValidation;