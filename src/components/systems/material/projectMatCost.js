// import { Alert, AlertTitle, Box, Button, Paper, Snackbar, TextField } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import {
//   DataGrid,
//   GridRowEditStopReasons,
//   GridRowModes,
//   GridToolbarContainer,
// } from '@mui/x-data-grid';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetProjectMatCostService } from 'src/store/systems/materialManagement/ProjectMatCostSlice';

// function generateInitialRows(projectmatcosts, searchTerm) {
//   return projectmatcosts
//     .filter((projectmatcost) =>
//       Object.values(projectmatcost).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     .map((projectmatcost) => ({
//       id: projectmatcost.LocCode,
//       LocCode: projectmatcost.LocCode,
//       MatCode: projectmatcost.MatCode,
//       DocumentType: projectmatcost.DocumentType,
//       DocumentNo: projectmatcost.DocumentNo,
//       MatDescription: projectmatcost.MatDescription,
//       MatUnit: projectmatcost.MatUnit,
//       Quantity: projectmatcost.Quantity,
//       Value: projectmatcost.Value,
//       ProjectName: projectmatcost.ProjectName,
//       OriginatedBy: projectmatcost.OriginatedBy,
//       MatDate: projectmatcost.MatDate,
//       AvgRate: projectmatcost.AvgRate,
//     }));
// }

// function EditToolbar(props) {
//   return (
//     <GridToolbarContainer
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingRight: '2px',
//         marginBottom: '20px',
//       }}
//     >
//       {/* Optionally, add additional toolbar buttons here */}
//     </GridToolbarContainer>
//   );
// }

// export default function ComMatCost() {
//   const [rowModesModel, setRowModesModel] = useState({});
//   const { projectmatcosts } = useSelector((state) => state.projectMaterialCostReducer);
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [rows, setRows] = useState([]);
//   const [date, setDate] = useState({
//     startDate: '',
//     endDate: '',
//   });

//   const formatDateString = (date) => {
//     if (!date) return '';
//     const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
//     return formattedDate;
//   };

//   const handlestartDate = (newStartDate) => {
//     setDate({
//       startDate: formatDateString(newStartDate),
//       endDate: date.endDate,
//     });
//   };

//   const handleEndDate = (newEndDate) => {
//     setDate({
//       endDate: formatDateString(newEndDate),
//       startDate: date.startDate,
//     });
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     handleLoadData();
//   };

//   const handleLoadData = async () => {
//     if (date.startDate === '' || date.endDate === '') {
//       setOpen(true);
//       return;
//     }

//     await dispatch(GetProjectMatCostService(date));
//   };

//   const handleReload = async () => {
//     await dispatch(GetProjectMatCostService(date));
//   };

//   const handleSelectionModelChange = (newSelectionModel) => {};

//   useEffect(() => {
//     dispatch(GetProjectMatCostService(date));
//   }, [dispatch, date]);

//   useEffect(() => {
//     const initialRows = generateInitialRows(projectmatcosts, searchTerm);
//     setRows(initialRows);
//   }, [projectmatcosts, searchTerm]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleAddClick = () => {
//     const id = Math.random().toString();
//     const newRow = { id, name: '', age: '', isNew: true };
//     setRows((oldRows) => [newRow, ...oldRows]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const columns = [
//     {
//       field: 'MatDate',
//       headerName: 'DATE',
//       width: 150,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'LocCode',
//       headerName: 'LOCATION CODE',
//       width: 150,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'MatCode',
//       headerName: 'MATERIAL CODE',
//       width: 150,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'DocumentType',
//       headerName: 'MATERIAL DOCUMENT TYPE',
//       width: 180,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'DocumentNo',
//       headerName: 'DOCUMENT NUMBER',
//       width: 150,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'MatDescription',
//       headerName: 'MATERIAL DESCRIPTION',
//       width: 160,
//       align: 'left',
//       headerAlign: 'center',
//       backgroundColor: '#ECECEC',
//       editable: true,
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'MatUnit',
//       headerName: 'MATERIAL UNIT',
//       width: 150,
//       align: 'center',
//       headerAlign: 'center',
//       backgroundColor: '#ECECEC',
//       editable: true,
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'Quantity',
//       headerName: 'MATERIAL QUANTITY',
//       backgroundColor: '#ECECEC',
//       width: 150,
//       align: 'right',
//       headerAlign: 'center',
//       editable: true,
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'Value',
//       headerName: 'MATERIAL VALUE',
//       width: 130,
//       align: 'right',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'ProjectName',
//       headerName: 'PROJECT NAME',
//       width: 150,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'OriginatedBy',
//       headerName: 'ORIGINATED BY',
//       width: 230,
//       align: 'center',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'AvgRate',
//       headerName: 'AVERAGE RATE',
//       width: 150,
//       align: 'right',
//       headerAlign: 'center',
//       editable: true,
//       backgroundColor: '#ECECEC',
//       headerClassName: 'table-header',
//     },
//   ];

//   return (
//     <div>
//       <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
//         <Alert onClose={() => setOpen(false)} severity="warning" sx={{ width: '100%' }}>
//           <AlertTitle>Warning</AlertTitle>
//           Please select both start and end dates.
//         </Alert>
//       </Snackbar>

//       <form onSubmit={handleFormSubmit}>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{ flexGrow: 1 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <DatePicker
//                   // label="Select Start Date"
//                   value={date.startDate ? new Date(date.startDate) : null}
//                   onChange={handlestartDate}
//                   renderInput={(params) => (
//                     <TextField {...params} sx={{ width: '100%' }} required />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <DatePicker
//                   // label="Select End Date"
//                   value={date.endDate ? new Date(date.endDate) : null}
//                   onChange={handleEndDate}
//                   renderInput={(params) => (
//                     <TextField {...params} sx={{ width: '100%' }} required />
//                   )}
//                 />
//               </Grid>

//               <Grid
//                 item
//                 xs={12}
//                 sm={12}
//                 md={6}
//                 container
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
// <Button
//   type="submit"
//   variant="contained"
//   size="large"
//   sx={{
//     width: '20%',
//     marginTop: '3px',
//     fontSize: '14px',
//     backgroundColor: '#blue',
//     color: '#FFFFFF',
//     '&:hover': {
//       backgroundColor: '#1565c0',
//     },
//   }}
// >
//   Load
// </Button>
// <Button
//   type="button"
//   variant="contained"
//   size="large"
//   onClick={handleReload}
//   sx={{
//     width: '20%',
//     marginTop: '3px',
//     marginRight: '60vh',
//     fontSize: '14px',
//     backgroundColor: '#blue',
//     color: '#FFFFFF',
//     '&:hover': {
//       backgroundColor: '#1565c0',
//     },
//   }}
// >
//   Reload
// </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </LocalizationProvider>
//       </form>

//       <Paper elevation={5} sx={{ borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
//         <Box sx={{ height: 570, width: '100%', padding: '16px' }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             rowModesModel={rowModesModel}
//             onRowModesModelChange={handleRowModesModelChange}
//             processRowUpdate={processRowUpdate}
//             onRowEditStop={handleRowEditStop}
//             // selectionModel={selectionModel}
//             onSelectionModelChange={handleSelectionModelChange}
//             experimentalFeatures={{ newEditingApi: true }}
//             sx={{
//               '& .table-header': {
//                 backgroundColor: '#f5f5f5',
//                 fontWeight: 'bold',
//               },
//               '& .MuiDataGrid-root': {
//                 border: 'none',
//                 borderRadius: '4px',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//               },
//               '& .MuiDataGrid-cell': {
//                 borderBottom: 'none',
//               },
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#e0e0e0',
//                 borderBottom: 'none',
//               },
//               '& .MuiDataGrid-footerContainer': {
//                 backgroundColor: '#e0e0e0',
//                 borderTop: 'none',
//               },
//               '& .MuiDataGrid-row': {
//                 borderBottom: '1px solid #e0e0e0',
//               },
//             }}
//             components={{ Toolbar: EditToolbar }}
//             componentsProps={{
//               toolbar: {
//                 handleSearchChange,
//                 searchTerm,
//                 handleAddClick,
//               },
//             }}
//           />
//         </Box>
//       </Paper>
//     </div>
//   );
// }



import { Alert, AlertTitle, Box, Button, Paper, Snackbar, TextField, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjectMatCostService } from 'src/store/systems/materialManagement/ProjectMatCostSlice';
import * as XLSX from 'xlsx';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  footer: {
    fontWeight: 'bold',
    backgroundColor: '#ECECEC',
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
  },
});

function generateInitialRows(projectmatcosts, searchTerm) {
  return projectmatcosts
    .filter((projectmatcost) =>
      Object.values(projectmatcost).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((projectmatcost, index) => ({
      id: `${projectmatcost.LocCode}-${projectmatcost.MatCode}-${index}`,
      LocCode: projectmatcost.LocCode,
      MatCode: projectmatcost.MatCode,
      DocumentType: projectmatcost.DocumentType,
      DocumentNo: projectmatcost.DocumentNo,
      MatDescription: projectmatcost.MatDescription,
      MatUnit: projectmatcost.MatUnit,
      Quantity: projectmatcost.Quantity,
      Value: projectmatcost.Value,
      ProjectName: projectmatcost.ProjectName,
      OriginatedBy: projectmatcost.OriginatedBy,
      MatDate: projectmatcost.MatDate,
      AvgRate: projectmatcost.AvgRate,
    }));
}


function groupRowsByProject(rows) {
  const groupedRows = {};
  rows.forEach((row) => {
    if (!groupedRows[row.ProjectName]) {
      groupedRows[row.ProjectName] = [];
    }
    groupedRows[row.ProjectName].push(row);
  });
  return groupedRows;
}

function calculateTotals(rows) {
  let totalQuantity = 0;
  let totalValue = 0;
  let totalAvgRate = 0;

  rows.forEach(row => {
    totalQuantity += parseFloat(row.Quantity || 0);
    totalValue += parseFloat(row.Value || 0);
    totalAvgRate += parseFloat(row.AvgRate || 0);
  });

  return { totalQuantity, totalValue, totalAvgRate };
}

export default function ComMatCost() {
  const theme = useTheme();
  const classes = useRowStyles();
  const { projectmatcosts } = useSelector((state) => state.projectMaterialCostReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
const headerCellStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  };
  const formatDateString = (date) => {
    if (!date) return '';
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const handlestartDate = (newStartDate) => {
    setDate({
      startDate: formatDateString(newStartDate),
      endDate: date.endDate,
    });
  };

  const handleEndDate = (newEndDate) => {
    setDate({
      endDate: formatDateString(newEndDate),
      startDate: date.startDate,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLoadData();
  };

  const handleLoadData = async () => {
    if (date.startDate === '' || date.endDate === '') {
      setOpen(true);
      return;
    }

    await dispatch(GetProjectMatCostService(date));
  };

  const handleReload = async () => {
    await dispatch(GetProjectMatCostService(date));
  };

  useEffect(() => {
    dispatch(GetProjectMatCostService(date));
  }, [dispatch, date]);

  useEffect(() => {
    const initialRows = generateInitialRows(projectmatcosts, searchTerm);
    setRows(initialRows);
  }, [projectmatcosts, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Project Material Cost');
    XLSX.writeFile(workbook, 'ProjectMaterialCost.xlsx');
  };

  const groupedRows = groupRowsByProject(rows);
  const totals = calculateTotals(rows);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="warning" sx={{ width: '100%' }}>
          <AlertTitle>Warning</AlertTitle>
          Please select both start and end dates.
        </Alert>
      </Snackbar>

      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '16px', marginTop: '20px' }}>
        <form onSubmit={handleFormSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flexGrow: 1, marginBottom: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    value={date.startDate ? new Date(date.startDate) : null}
                    onChange={handlestartDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '100%' }} required label="Start Date" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    value={date.endDate ? new Date(date.endDate) : null}
                    onChange={handleEndDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '100%' }} required label="End Date" />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={2}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      width: '20%',
                      marginTop: '3px',
                      fontSize: '14px',
                      backgroundColor: '#blue',
                      color: '#FFFFFF',

                    }}
                  >
                    Load
                  </Button>


                </Grid>
              </Grid>
            </Box>
          </LocalizationProvider>
        </form>

        {/* <Toolbar>
          <TextField
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter text to search..."
          />
          <Button variant="contained" sx={{ ml: 1 }}>
            Find
          </Button>
        </Toolbar> */}

        <TableContainer sx={{ maxHeight: 450 }}>
          <Table aria-label="project material cost table" stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={headerCellStyle}>DATE</TableCell>
                <TableCell align="center" sx={headerCellStyle}>LOCATION CODE</TableCell>
                <TableCell align="center" sx={headerCellStyle}>MATERIAL CODE</TableCell>
                <TableCell align="center" sx={headerCellStyle}>DOCUMENT TYPE</TableCell>
                <TableCell align="center" sx={headerCellStyle}>DOCUMENT NUMBER</TableCell>
                <TableCell align="left" sx={headerCellStyle}>MATERIAL DESCRIPTION</TableCell>
                <TableCell align="center" sx={headerCellStyle}>UNIT</TableCell>
                <TableCell align="right" sx={headerCellStyle}>QUANTITY</TableCell>
                <TableCell align="right" sx={headerCellStyle}>VALUE</TableCell>
                <TableCell align="center" sx={headerCellStyle}>PROJECT NAME</TableCell>
                <TableCell align="center" sx={headerCellStyle}>ORIGINATED BY</TableCell>
                <TableCell align="right" sx={headerCellStyle}>AVERAGE RATE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(groupedRows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((projectName, index) => (
                  <React.Fragment key={index}>
                    <TableRow sx={headerCellStyle}>
                      <TableCell colSpan={12} align="left">
                        PROJECT: {projectName}
                      </TableCell>
                    </TableRow>
                    {groupedRows[projectName].map((row, rowIndex) => (
                      <TableRow key={rowIndex} className={classes.root}>
                        <TableCell align="center">{row.MatDate}</TableCell>
                        <TableCell align="center">{row.LocCode}</TableCell>
                        <TableCell align="center">{row.MatCode}</TableCell>
                        <TableCell align="center">{row.DocumentType}</TableCell>
                        <TableCell align="center">{row.DocumentNo}</TableCell>
                        <TableCell align="left">{row.MatDescription}</TableCell>
                        <TableCell align="center">{row.MatUnit}</TableCell>
                        <TableCell align="right">{row.Quantity}</TableCell>
                        <TableCell align="right">{row.Value}</TableCell>
                        <TableCell align="center">{row.ProjectName}</TableCell>
                        <TableCell align="center">{row.OriginatedBy}</TableCell>
                        <TableCell align="right">{row.AvgRate}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}

              <TableRow className={classes.footer}>
                <TableCell colSpan={7} align="right" sx={headerCellStyle}>
                  TOTAL
                </TableCell>
                <TableCell align="right" sx={headerCellStyle}>{totals.totalQuantity.toFixed(2) }</TableCell>
                <TableCell align="right" sx={headerCellStyle}>{totals.totalValue.toFixed(2)}</TableCell>
                <TableCell colSpan={2} align="right" sx={headerCellStyle}></TableCell>
                <TableCell align="right" sx={headerCellStyle}>{totals.totalAvgRate.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Object.keys(groupedRows).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Toolbar>
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            <Button variant="contained" sx={{ ml: 2 }} onClick={exportToExcel}>
              Excel Export
            </Button>
          </Box>
        </Toolbar>
      </Paper>
    </div>
  );
}