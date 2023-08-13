import "./announcement.css";
import CampaignIcon from "@mui/icons-material/Campaign";
import React, { useCallback, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
//import { data as initialData } from "../../features/container/AnnouncementData";
import { Box, Button, DialogContentText } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TextField } from "@mui/material";
import { darken } from "@mui/material";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl=process.env.REACT_APP_BASE_URL
export default function Announcement() {
  const isAdmin = useSelector((state) => state.auth.isAdmin); ;
  const columns = useMemo(
    () => [
      {
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
        accessorFn: (row) => new Date(row.announcementDate),
        filterFn: "greaterThan",
        accessorKey: "announcementDate",
        filterVariant: "date",
        sortingFn: "datetime",
        type: "date",
        size: 70,
        header: "Anouncement Date",
        enableColumnFilter: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "date",
          variant: "outlined",
        },

        muiTableHeadCellFilterTextFieldProps: {
          type: "date",
        },
      },

      {
        accessorKey: "description",
        header: "Description",
        filterFn: "contains",
        size: 120,
        enableColumnFilter: false,
        muiTableBodyCellEditTextFieldProps: {
          required: false,
          type: "text",
          variant: "outlined",
        },
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span>{renderedCellValue}</span>
            <a
              href=""
              target="_blank"
              className="tool-hyperlink"
              rel="noreferrer"
            >
              {isAdmin && (
                <EditNoteIcon sx={{ color: "#20A32F", fontSize: "large" }} />
              )}
              {!isAdmin && (
                <RemoveRedEyeIcon
                  sx={{ color: "#20A32F", fontSize: "large" }}
                />
              )}
            </a>
          </Box>
        ),
      },
      {
        accessorKey: "impactedServices",
        header: "Impacted services",
        enableColumnFilter: false,
        size: 70,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
          variant: "outlined",
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        filterFn: "contains",
        filterSelectOptions: [
          { text: "Planned Maintenace", value: "Planned Maintenace" },
          { text: "Outage", value: "Outage" },
        ],

        filterVariant: "select",
        size: 70,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
          variant: "outlined",
        },
      },
      {
        accessorKey: "environment",
        header: "Environment",
        size: 50,
        filterFn: "contains",
        filterSelectOptions: [
          { text: "STAGE", value: "STAGE" },
          { text: "INT", value: "INT" },
          { text: "PROD", value: "PROD" },
        ],
        filterVariant: "select",
        enableColumnFilter: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
          variant: "outlined",
        },

        //custom conditional format and styling  theme={outerTheme}
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === "STAGE"
                  ? "#ADADAD"
                  : cell.getValue() === "INT"
                  ? "#FFA5A5"
                  : "#7AC883",
              borderRadius: "0.25rem",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.({})}
          </Box>
        ),
      },
      {
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
        accessorFn: (row) => new Date(row.startDate),
        accessorKey: "startDate",
        filterVariant: "date",
        sortingFn: "datetime",
        type: "date",
        size: 30,
        header: "Start Date",

        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "date",
          variant: "outlined",
        },

        muiTableHeadCellFilterTextFieldProps: {
          type: "date",
        },
        enableColumnFilter: false,
      },
      {
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
        accessorFn: (row) => new Date(row.endDate),
        accessorKey: "endDate",
        filterVariant: "date",
        sortingFn: "datetime",
        type: "date",
        size: 30,
        header: "End Date",
        enableColumnFilter: false,
        muiTableBodyCellEditTextFieldProps: {
          required: false,
          type: "date",
          variant: "outlined",
        },

        muiTableHeadCellFilterTextFieldProps: {
          type: "date",
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
   <div className="upcomming-release-calender-div">
        <CampaignIcon style={{ color: "#14661E", fontSize: "70px" }} />{" "}
        Announcement
      </div> 
      <div className="data-table">
        <DataTable isAdmin={isAdmin} columns={columns} />
      </div>
    </React.Fragment>
  );
}

const DataTable = (props) => {
  const { isAdmin, columns } = props;
  const [data, setData] = useState(" ");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const jwtToken = useSelector((state) => state.auth.jwtToken);
  //const AuthStr ='Bearer '.concat(jwtToken); 
   const AuthStr ='Bearer '.concat(sessionStorage.getItem("jwtToken")); 
  
  useEffect(() => {
    getData();
  }, []);

  const deleteData =async (id)=>{  
     axios.delete(baseUrl+"api/deleteannouncement/"+id,{ headers: { Authorization: AuthStr } }).then(res=>{
      setData(res.data);
  }) 
  .catch((error) => {
    console.log(error);
  });
 }

  const getData =async ()=>{   
    axios.get(baseUrl+"api/getannouncement",{ headers: { Authorization: AuthStr } }).then(res=>{      
      setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
   }


  const handleCreateNewRow = (values) => {   
      axios.post(baseUrl+"api/createannouncement",values,{ headers: { Authorization: AuthStr } }).then(res=>{
      setData(res.data);
  })  .catch((error) => {
    console.log(error);
  });
  };

  const handleDeleteRow = useCallback(
    (row) => {     
      deleteData(row.original.id);
      setDeleteModalOpen(false); 
    },
    [data],    
  );
  
  const handleDeleteRowOnCancel = () => {
    setDeleteModalOpen(false);
  };


  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions={isAdmin}
      enableColumnActions={false}
      positionActionsColumn="last"
      enableDensityToggle={false}
      enableBottomToolbar={true}
      initialState={{ density: "compact" }}
      enableHiding={false}
      enableGlobalFilter={false}
      enableFullScreenToggle={false}
      icons={filterIconsCunstomize}
      enableColumnResizin
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditNoteIcon sx={{ color: "#20A32F", fontSize: "large" }} />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              onClick={() => setDeleteModalOpen(true)}
              sx={{ color: "red", fontSize: "small" }}
            >
              <RiDeleteBin6Line />
            </IconButton>
          </Tooltip>
          <DeleteAnnouncementDialog
            open={deleteModalOpen}
            onClickOk={() => handleDeleteRow(row)}
            onCancel={() => handleDeleteRowOnCancel()}
          />
        </Box>
      )}
      renderTopToolbarCustomActions={() =>
        isAdmin && (
          <Box>
            <Button
              variant="filled"
              onClick={() => setCreateModalOpen(true)}
              sx={{
                "&:hover": { background: "#14661E" },
                color: "#F4F4F4",
                textTransform: "none",
                background: "#14661E",
              }}
            >
              Create &nbsp;
              <AddCircleOutlineIcon
                sx={{
                  color: "#F4F4F4",
                  textTransform: "none",
                  background: "#14661E",
                }}
              />
            </Button>
            <CreateAnnouncementDialog
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </Box>
        )
      }
      muiTableProps={{
        sx: {
          tableLayout: "fixed",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          borderRight: "1px solid #e0e0e0",
          fontSize: {
            sx: "8px",
            sm: "9px",
            md: "10px",
            lg: "12px",
            xl: "13px",
          },
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: "#4F4F4F",
          color: "#F4F4F4",
          borderRight: "1px solid #e0e0e0",
          fontSize: {
            sx: "8px",
            sm: "9px",
            md: "10px",
            lg: "12px",
            xl: "13px",
          },
        },
      }}
      muiTableHeadCellFilterTextFieldProps={{
        variant: "standard",
        sx: { backgroundColor: "white", m: "0.5rem 0", width: "100%" },
      }}
      muiTableBodyProps={{
        sx: (theme) => ({
          "& tr:nth-of-type(odd)": {
            backgroundColor: darken(theme.palette.background.default, 0.1),
          },
        }),
      }}
      displayColumnDefOptions={{
        "mrt-row-actions": {
          header: "Edit Row", //change header text
          size: 30, //make actions column wider
        },
      }}
    />
  );
};

const filterIconsCunstomize = {
  FilterListIcon: (props) => <MdFilterAlt icon={RiDeleteBin6Line} {...props} />,
  FilterListOffIcon: () => <MdFilterAltOff icon={MdFilterAltOff} />,
};

export const CreateAnnouncementDialog = ({
  open,
  columns,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    debugger;
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Release</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: {
                xs: "300px",
                sm: "360px",
                md: "400px",
                height: "auto",
              },
              gap: "1rem",
            }}
          >
            <TextField
              key={columns[0].accessorKey}
              type={columns[0].type}
              name={columns[0].accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />

            <TextField
              key={columns[1].accessorKey}
              type={columns[1].type}
              label={columns[1].header}
              name={columns[1].accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />

            <TextField
              key={columns[2].accessorKey}
              type={columns[2].type}
              label={columns[2].header}
              name={columns[2].accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                key={columns[3].accessorKey}
                type={columns[3].type}
                name={columns[3].accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              >
                <MenuItem value="Planned Maintenance">
                  Planned Maintenance
                </MenuItem>
                <MenuItem value="Outage">Outage</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Environment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                key={columns[4].accessorKey}
                type={columns[4].type}
                name={columns[4].accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              >
                <MenuItem value="INT">INT</MenuItem>
                <MenuItem value="PROD">PROD</MenuItem>
              </Select>
            </FormControl>

            <TextField
              key={columns[5].accessorKey}
              type={columns[5].type}
              name={columns[5].accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key={columns[6].accessorKey}
              type={columns[6].type}
              name={columns[6].accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            "&:hover": { background: "#1c8e29" },
            color: "white",
            textTransform: "none",
            background: "#20A32F",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteAnnouncementDialog = ({ open, onClickOk, onCancel }) => {
  return (
    <form>
      <Dialog open={open}>
        {" "}
        <DialogTitle textAlign="left">Confirm deletion</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: "100%",
              minWidth: {
                xs: "300px",
                sm: "360px",
                md: "400px",
                height: "auto",
              },
              gap: "1rem",
            }}
          >
            <DialogContentText id="alert-dialog-description" textAlign="left">
              Are you sure you want to delete this announcement?
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCancel}
            variant="contained"
            sx={{
              "&:hover": { background: "#1c8e29" },
              color: "white",
              textTransform: "none",
              background: "#1c8e29",
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={onClickOk}
            variant="contained"
            sx={{
              "&:hover": { background: "#c70000" },
              color: "danger",
              textTransform: "none",
              background: "#c70000",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
