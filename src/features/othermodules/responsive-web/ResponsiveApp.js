import React from "react";
import Example from "../MaterialTableCRUD";
import "./custom.css";
export default function ResponsiveApp() {
  return (
    <div style={{fontFamily:"sans-serif",color:"#aaaaaa"}}>
      <div className="header">
        <h1>Header</h1>
      </div>
      <div className="allComp">
        <div className="menu">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">Link 4</a>
        </div>
        <div className="main">
          <Example></Example>
        </div>        
      </div>
      <div className="footer">© copyright w3schools.com</div>
    </div>
  );
}
