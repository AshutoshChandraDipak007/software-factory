import React from "react";
import Example from "../MaterialTableCRUD";
import "./custom.css";
export default function ResponsiveApp() {
  return (
    <div className="body" style={{fontFamily:"sans-serif",color:"#aaaaaa"}}>

      <div className="header">
        <h1>Header</h1>
      </div>
      <div className="allComp">
            <div className="menu">
              <a href="#">Screen 1</a>
              <a href="#">Screen 2</a>
              <a href="#">Screen 3</a>
              <a href="#">Screen 4</a>
            </div>
            <div className="main">
              <Example></Example>
            </div> 
      </div>
      <div className="footer">Footer for fuck</div>
    </div>
  );
}
