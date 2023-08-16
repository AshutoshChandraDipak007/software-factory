import { Box } from "@mui/material";
import React from "react";
import { portFolioList } from "../../features/container/PortfolioList";
import MouseOverPopover from "../sdptools/HandleOnOver";


import "./tooldetails.css";

function Sdptools() {
  return (
    <div className="tool-details" style={{color:"F4F4F4"}}>
      <p id="application-list">Internet Application</p>
      <Box className="display-tools-item-par-page">
        {portFolioList.map((item) => {
          return (
            <MouseOverPopover item={item} key={item.id}></MouseOverPopover>
          );
        })}
      </Box>
      <p id="application-list">Intranet Application</p>
      <Box className="display-tools-item-par-page">
        {portFolioList.map((item) => {
          return (
            <MouseOverPopover item={item} key={item.id}></MouseOverPopover>
          );
        })}
      </Box>
    </div>
  );
}
export default Sdptools;
