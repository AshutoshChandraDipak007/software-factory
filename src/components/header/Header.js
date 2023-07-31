import React from "react";
import "./header.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {Link} from "react-router-dom";

const style={
  borderRadius:"10px 10px 0 0",
  justifyContent: "center",
  textTransform:"none",
  fontSize:"12px",
  color:"white",
  backgroundColor:"#4F4F4F",
  marginRight:'5px'
}

export default function Header() {
  return (
    <div className="header">
      <div className="row utilities-row-up"> ENV: <span style={{color:'red'}}>{process.env.REACT_APP_APPLICATION_ENV}</span></div>
      <div className="row utilities-row-down">
        <LabTabs />
      </div>
    </div>
  );
}

function LabTabs() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value} variant="fullWidth">
          <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{style:{background:"#37AC45"}}}>
            <Tab label="Tools Tab"        style={style}  component={Link}  index={0} to={"/home"}/>
            <Tab label="Material Table" style={style}  component={Link}  index={1} to={"/announcement"}/>
            <Tab label="Graph Demo"       style={style}  component={Link}  index={2} to={"/graph"}/>
            <Tab label="React Form"       style={style}  component={Link}  index={2} to={"/formic"}/>
          </TabList>     
      </TabContext>
    </Box>
  );
}
