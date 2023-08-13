import React from "react";
import "./header.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/counter/authSlice";


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
      <div className="row utilities-row-up"> ENV: <span style={{color:'red'}}>{process.env.REACT_APP_APPLICATION_ENV}</span>
      <div className="logout">   
        <Button>        
        <MenuPopupState style={style}/>
        </Button>
      </div>  
      </div>
      <div className="row utilities-row-down">
        <div>
        <LabTabs />
        </div>          
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
    <Box sx={{ width: "50%", typography: "body1" }}>
      <TabContext value={value} variant="fullWidth">
          <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{style:{background:"#37AC45"}}}>
            <Tab label="Tools Tab"        style={style}  component={Link}  index={0} to={"/home"}/>
            <Tab label="Material Table"   style={style}  component={Link}  index={1} to={"/announcement"}/>
            <Tab label="Graph Demo"       style={style}  component={Link}  index={2} to={"/graph"}/>
            <Tab label="React Form"       style={style}  component={Link}  index={2} to={"/formic"}/>
            <Tab label="Flex Demo"       style={style}  component={Link}  index={2} to={"/flex"}/>
          </TabList>     
      </TabContext>
    </Box>
  );
}

function MenuPopupState() {
  const dispatch = useDispatch();

  const setLogOutFlagFalse=()=>{   
    sessionStorage.clear();
   dispatch(dispatch(userLoggedOut()));
  }


  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)} >
            Profile
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={setLogOutFlagFalse}>Logout &nbsp;<LogoutIcon fontSize="small"/></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}