import React from "react";
import mypic from "../../images/Ashutosh.jpg";
import './contact.css';


export default function Contacts() {
  return (
    <div>     
      <div className="row">
          <div className="col">
            <div className="card">           
              <div className="container">
              <img src={mypic} alt="harry potter" style={{ width: '99%',height:'80%' }} />
                <h2>Ashutosh Chandra Dipak</h2>
                <p className="title">CEO & Founder</p>
                <p>Software engineer working in Mercedes Benze</p>
                <p>ashutoshchandra@gmail.com</p>
                <p className="button">Contact :-  6362853651</p>
              </div>
            </div>
          </div> 
          </div>        
          
    </div>
  );
}