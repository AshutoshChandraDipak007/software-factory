import React from "react";
import Example from "../MaterialTableCRUD";
import "./custom.css";
import {Link} from "react-router-dom";
export default function ResponsiveApp() {
  return (
    <div className="body" style={{fontFamily:"sans-serif",color:"#aaaaaa"}}>
      <div className="allComp">
            <div className="menu">              
              <Link to="/contact">Screen 1</Link>
              <Link to="/contact">Screen 2</Link>
              <Link to="/contact">Screen 3</Link>
              <Link to="/contact">Screen 4</Link>
            </div>
            <div className="main">
              <Example></Example>
            </div> 
      </div>     
    </div>
  );
}
