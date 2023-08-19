import * as React from "react";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import "./mouseover.css";
/* import JiraLog from "../../images/jira-logo-clipart-2.png";
import ConfluenceLogo from "../../images/confluence-logo-4.jpg";
import JenkinsLogo from "../../images/Jenkins-Main-Image.jpg"; */

export default function MouseOverPopover(props) {  
  const { toolName, title, url, description,logo,icon } = props.item;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    console.log("event.currentTarget " + event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    console.log(" anchorEl " + anchorEl);
  };


/*  const getLogo={
  "Jira":JiraLog,
  "ConfluenceLogo":ConfluenceLogo
 }
 getLogo[toolname] */

 /* const getlogo=new Map([    //map in js
  ["Jira",JiraLog], 
  ["Confluence",ConfluenceLogo],
  ["Bamboo",JenkinsLogo],
  ["Jenkins",JenkinsLogo],
  ["Bitbucket",ConfluenceLogo],
 ]); */


  return (
    <>
      <div 
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <div className="item-name"> 
        <a href={url} target="_blank" rel="noreferrer">                       
            {/* <img src={getlogo.get(toolName)} alt="toollogo"/> */}
            <img src={logo} alt="toollogo"/>
            <p>  
            {toolName}                 
          </p>
          </a>   
        </div>
      </div>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
    <div className="on-hover-display-details">
       <b>{title} &nbsp; {icon} </b><br/>
          <p>
            {description}   
          </p>
        </div>
      </Popover>
    </>
  );
}
