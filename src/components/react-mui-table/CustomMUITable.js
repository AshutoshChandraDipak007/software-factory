import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, Hidden, TableHead, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Input, Tooltip } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import './tableStyle.css';



function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [data, setData] = React.useState(rows);
  const [isFilter, setIsFilter] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterData = (event) => {
    console.log("  event values " + event.target.value);
    // console.log(event.target.value);
    rows.find(event.target.value);
    setData();
  };
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ width: 1000, display: "flex", margin:"100px", color:"white"}} >
      <Table aria-label="a dense table">
        <TableHead>
          <div className="col-8">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            InputProps={{
                endAdornment:(
                    <IconButton>
                        <SearchIcon />
                    </IconButton> )
            }}
            onChange={(e) => filterData(e)}
          /></div>
          <div className="col-2">
          <Tooltip title="Filter" placement="top-end" >
            <Button
              onClick={handleFilter}
              style={{ alignItems: "end", alignContent: "flex-end" }}>
              {isFilter && <FilterAltIcon style={{ color: "black" }} />}
              {!isFilter && <FilterAltOffIcon style={{ color: "black" }} />}
            </Button>
          </Tooltip></div>
          <br />
          <br />
          <TableRow style={{ textColor: "white" }}>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              Calories
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              Fat
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
          {!isFilter && (
            <TableRow style={{ minHeight: 10 }}>
              <TableCell component="th" scope="row">
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  size="small"
                  onChange={(e) => filterData(e)}
                  style={{ width: 100}}
                />
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  size="small"
                  onChange={(e) => filterData(e)}
                  style={{ width: 100, height: 40 }}
                />
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  size="small"
                  onChange={(e) => filterData(e)}
                  style={{ width: 100, height: 40 }}
                />
              </TableCell>
              <TableCell component="th" scope="row" align="center"></TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <>
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center"><Link  style={{color:"blue"}} to={`/table/${row.calories}`}>{row.calories}</Link></TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">                  
                  <EditIcon style={{color:"blue"}} />&nbsp; 
                  <DeleteIcon style={{color:"red"}} />
                </TableCell>
              </TableRow>
            </>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter >
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={0}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page">
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page">
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page">
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page">
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };