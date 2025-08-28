// import {
//   Add as AddIcon,
//   Close as CancelIcon,
//   DeleteOutlined as DeleteIcon,
//   Edit as EditIcon,
//   Save as SaveIcon,
//   Search as SearchIcon,
// } from '@mui/icons-material';
// import { Box, Button, InputAdornment, Paper, TextField } from '@mui/material';
// import {
//   DataGrid,
//   GridActionsCellItem,
//   GridRowEditStopReasons,
//   GridRowModes,
//   GridToolbarContainer,
// } from '@mui/x-data-grid';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   GetEmployeeDetails,
//   PostEmployeeManDetails,
// } from 'src/store/systems/emplopyee/EmployeeSlice';

// function generateInitialRows(employees, searchTerm) {
//   return employees
//     .filter((employee) =>
//       Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     .map((employee) => ({
//       id: employee.ServiceNo,
//       ServiceNo: employee.ServiceNo,
//       FirstName: employee.FirstName,
//       LastName: employee.LastName,
//       MobileNo: employee.MobileNo,
//       Email: employee.Email,
//       NIC: employee.NIC,
//       Status: employee.Status,
//       isNew: false,
//     }));
// }

// function EditToolbar(props) {
//   const { handleSearchChange, searchTerm, handleAddClick, handleSaveAllClick, canSave } = props;

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
//       <div>
//         <TextField
//           placeholder="Search Employee..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           style={{ width: '220px' }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             '& input': {
//               padding: '7px',
//             },
//           }}
//         />
//       </div>
//       <div style={{ marginLeft: 'auto' }}>
//         <Button 
//         variant="contained" 
//         color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
//           Add Employee
//         </Button>
//       </div>
//       <div>
//         <Button
//           color="primary"
//           variant="contained"
//           onClick={handleSaveAllClick}
//           sx={{
//             height: '33px',
//             marginRight: '16px',
//           }}
//           disabled={canSave}
//         >
//           Save All
//         </Button>
//       </div>
//     </GridToolbarContainer>
//   );
// }

// export default function ComEmployee() {
//   const [rowModesModel, setRowModesModel] = useState({});
//   const [selectionModel, setSelectionModel] = useState([]);
//   const { empData } = useSelector((state) => state.employeeReducer);
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [canSave, setCanSave] = useState(true);
//   const [rows, setRows] = useState([]);
//   // let canSave = true;
//   const handleSelectionModelChange = (newSelectionModel) => {
//     // setSelectionModel(newSelectionModel);
//     // console.log(newSelectionModel);
//   };

//   useEffect(() => {
//     dispatch(GetEmployeeDetails());
//   }, [dispatch]);

//   useEffect(() => {
//     const initialRows = generateInitialRows(empData, searchTerm);
//     setRows(initialRows);
//   }, [empData, searchTerm]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleAddClick = () => {
//     const id = Math.random().toString();
//     // const newRow = { id, name: '', age: '', isNew: true };
//     const newRow = {
//       id: id,
//       ServiceNo: '',
//       FirstName: '',
//       LastName: '',
//       MobileNo: '',
//       Email: '',
//       NIC: '',
//       Status: 'Active',
//       isNew: true,
//     };
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

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   const handleSaveAllClick = () => {
//     // const newObjects = rows.filter((obj) => obj.isNew);
//     const newObjects = rows.filter((obj) => obj.isNew || obj.isUpdated);
//      dispatch(PostEmployeeManDetails(newObjects));
//     console.log(newObjects);
//     setCanSave(true);
//     // canSave = false;
//   };

//   // const handleProcessRowUpdate = (newRow) => {
//   //   const updatedRows = rows.map((row) =>
//   //     row.id === newRow.id ? { ...row, ...newRow } : row
//   //   );
//   //   setRows(updatedRows);
//   //   return newRow;
//   // };

//   const processRowUpdate = (newRow) => {
//     if (newRow.ServiceNo !== '') {
//       const updatedRow = { ...newRow, isNew: false, isUpdated: true };
//       setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     } else {
//       setRows(rows.map((row) => (row.id === newRow.id ? { ...row, ...newRow } : row)));
//     }
//     setCanSave(false);
//     return newRow;
//   };
//   const handleDeleteClick = (id) => () => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const handleCancelClick = (id) => () => {
//     alert("Sf");
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };
//   const columns = [
//     {
//       field: 'ServiceNo',
//       headerName: 'SERVICE NO',
//       width: 210,
//       align: 'left',
//       headerAlign: 'left',
//       editable: false,
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'FirstName',
//       headerName: 'FIRST NAME',
//       type: 'string',
//       width: 220,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'LastName',
//       headerName: 'LAST NAME',
//       type: 'string',
//       width: 220,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'MobileNo',
//       headerName: 'MOBILE NO',
//       width: 220,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       type: 'string',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'Email',
//       headerName: 'EMAIL',
//       width: 210,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       type: 'string',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'NIC',
//       headerName: 'NIC',
//       width: 180,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       type: 'string',
//       headerClassName: 'table-header',
//     },
//     {
//       field: 'Status',
//       headerName: 'STATUS',
//       width: 160,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       type: 'singleSelect',
//       headerClassName: 'table-header',
//       valueOptions: ['Active', 'Inactive'],
//     },
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'ACTION',
//       width: 100,
//       cellClassName: 'actions',
//       headerClassName: 'table-header',
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               sx={{
//                 color: 'primary.main',
//               }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   columns.forEach((column) => {
//     // column.headerClassName = 'custom-header';
//   });

//   return (
//     <div style={{ height: 650, width: '100%' }}>
//       <Box
//         sx={{
//           height: '100%',
//           width: '100%',
//           '& .actions': {
//             color: 'text.secondary',
//           },
//           '& .textPrimary': {
//             color: 'text.primary',
//           },
//           '& .table-header': {
//             backgroundColor: '#ECECEC',
//           },
//         }}
//       >
//         <Paper elevation={3} sx={{ padding: '16px', height: '100%' }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             editMode="row"
//             selectionModel={selectionModel}
//             rowModesModel={rowModesModel}
//             onSelectionModelChange={handleSelectionModelChange}
//             onRowModesModelChange={handleRowModesModelChange}
//             onCellEditStop={processRowUpdate}
//             onRowEditStop={processRowUpdate}
//             processRowUpdate={processRowUpdate}
//             initialState={{
//               pagination: { paginationModel: { pageSize: 9 } },
//             }}
//             pageSizeOptions={[9, 25, 50, 100]}
//             slots={{
//               toolbar: EditToolbar,
//             }}
//             slotProps={{
//               toolbar: {
//                 setRows,
//                 setRowModesModel,
//                 handleSearchChange,
//                 searchTerm,
//                 handleAddClick,
//                 handleSaveAllClick,
//                 canSave,
//               },
//             }}
//           />
//         </Paper>
//       </Box>
//     </div>
//   );
// }





import {
  Add as AddIcon,
  Close as CancelIcon,
  DeleteOutlined as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetEmployeeDetails,
  PostEmployeeManDetails,
} from 'src/store/systems/emplopyee/EmployeeSlice';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
  },
  searchInput: {
    width: '180px',
    marginRight: '16px',
  },
  actionCell: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
});

function generateInitialRows(employees, searchTerm) {
  return employees
    .filter((employee) =>
      Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((employee) => ({
      id: employee.ServiceNo,
      ServiceNo: employee.ServiceNo,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      MobileNo: employee.MobileNo,
      Email: employee.Email,
      NIC: employee.NIC,
      Status: employee.Status,
      isNew: false,
      isUpdated: false,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm, handleAddClick, handleSaveAllClick, canSave }) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '2px',
        marginBottom: '20px',
      }}
    >
      <Box sx={{ flexGrow: 1, textAlign: 'left', fontSize: '1.2rem', fontWeight: 'bold' }}></Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search Employee..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              '& input': {
                padding: '7px',
              },
            },
          }}
        />
        <Button 
          color="primary" 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleAddClick}
          sx={{ marginLeft: 1, marginRight: 1 }}
        >
          Add Employee
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSaveAllClick}
          sx={{
            height: '36px',
          }}
          disabled={canSave}
        >
          Save All
        </Button>
      </Box>
    </Box>
  );
}

export default function ComEmployee() {
  const classes = useStyles();
  const { empData } = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [canSave, setCanSave] = useState(true);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingRow, setEditingRow] = useState(null);
const theme = useTheme();
  const headerCellStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  };


  useEffect(() => {
    dispatch(GetEmployeeDetails());
  }, [dispatch]);

  useEffect(() => {
    const initialRows = generateInitialRows(empData, searchTerm);
    setRows(initialRows);
  }, [empData, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    const id = Math.random().toString();
    const newRow = {
      id: id,
      ServiceNo: '',
      FirstName: '',
      LastName: '',
      MobileNo: '',
      Email: '',
      NIC: '',
      Status: 'Active',
      isNew: true,
      isUpdated: false,
    };
    setRows((oldRows) => [newRow, ...oldRows]);
    setEditingRow(id);
  };

  const handleEditClick = (id) => {
    setEditingRow(id);
  };

  const handleSaveClick = (id) => {
    setEditingRow(null);
    setCanSave(false);
  };

  const handleSaveAllClick = () => {
    const newObjects = rows.filter((obj) => obj.isNew || obj.isUpdated);
    dispatch(PostEmployeeManDetails(newObjects));
    setCanSave(true);
  };

  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => {
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
    setEditingRow(null);
  };

  const handleFieldChange = (id, field, value) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return { 
          ...row, 
          [field]: value, 
          isUpdated: !row.isNew 
        };
      }
      return row;
    }));
    setCanSave(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isEditing = (id) => editingRow === id;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditToolbar
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        handleAddClick={handleAddClick}
        handleSaveAllClick={handleSaveAllClick}
        canSave={canSave}
      />
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table aria-label="employee table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                SERVICE NO
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                FIRST NAME
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                LAST NAME
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                MOBILE NO
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                EMAIL
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                NIC
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={headerCellStyle}>
                STATUS
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={headerCellStyle}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} className={classes.tableRow} hover>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <TextField
                        value={row.ServiceNo}
                        onChange={(e) => handleFieldChange(row.id, 'ServiceNo', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.ServiceNo
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <TextField
                        value={row.FirstName}
                        onChange={(e) => handleFieldChange(row.id, 'FirstName', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.FirstName
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <TextField
                        value={row.LastName}
                        onChange={(e) => handleFieldChange(row.id, 'LastName', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.LastName
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <TextField
                        value={row.MobileNo}
                        onChange={(e) => handleFieldChange(row.id, 'MobileNo', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.MobileNo
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <TextField
                        value={row.Email}
                        onChange={(e) => handleFieldChange(row.id, 'Email', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.Email
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <TextField
                        value={row.NIC}
                        onChange={(e) => handleFieldChange(row.id, 'NIC', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.NIC
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEditing(row.id) ? (
                      <Select
                        value={row.Status}
                        onChange={(e) => handleFieldChange(row.id, 'Status', e.target.value)}
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    ) : (
                      row.Status
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.actionCell}>
                      {isEditing(row.id) ? (
                        <>
                          <IconButton onClick={() => handleSaveClick(row.id)} size="small">
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={() => handleCancelClick(row.id)} size="small">
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEditClick(row.id)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(row.id)} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}