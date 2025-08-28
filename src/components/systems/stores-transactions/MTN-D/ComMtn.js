// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
// } from '@mui/material';
// import { useState, useEffect, useMemo } from 'react';
// import { format } from 'date-fns';
// import { IconDotsVertical } from '@tabler/icons';
// import DialogModal from 'src/components/shared/Dialog'; // Update this path if needed
// import MtnEntryForm from 'src/components/systems/Model/MtnEntryForm'; // Update this path if needed
// import MtnService from 'src/store/service/MtnService'; // Update the path accordingly

// const useStyles = makeStyles({
//   tableHeader: {
//     backgroundColor: '#ECECEC',
//   },
//   tableRow: {
//     cursor: 'pointer',
//   },
//   searchInput: {
//     width: '120px',
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px',
//   },
//   toolbarButton: {
//     marginLeft: 'auto',
//   },
// });

// const generateInitialRows = (materials, searchTerm) => {
//   if (!Array.isArray(materials)) return [];
//   return materials.filter(material =>
//     Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
//   );
// };

// const EditToolbar = ({ handleAddClick, searchTerm, setSearchTerm }) => {
//   const classes = useStyles();
//   return (
//     <Box className={classes.toolbar}>
//       <TextField
//         variant="outlined"
//         size="small"
//         placeholder="Search MTN Materials"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className={classes.searchInput}
//       />
//       <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
//         Add New MTN
//       </Button>
//     </Box>
//   );
// };

// const MTNScreen = () => {
//   const classes = useStyles();
//   const [materials, setMaterials] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const whCode = 'STM'; // Replace with the actual warehouse code as needed
//         const initialData = await MtnService.loadMTNMaterialDetails(whCode);
//         setMaterials(Array.isArray(initialData) ? initialData : []);
//       } catch (error) {
//         console.error('Failed to load initial data', error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleAddMTN = () => {
//     setIsEntryFormOpen(true);
//   };

//   const handleCloseEntryForm = () => {
//     setIsEntryFormOpen(false);
//   };

//   const handleSave = async () => {
//     try {
//       const whCode = 'STM'; // Replace with the actual warehouse code if needed

//       // Save MTN details
//       const response = await MtnService.saveMTNDetails(whCode, materials);

//       if (response && response.success) {
//         alert('MTN details saved successfully');
//       } else {
//         alert('Failed to save MTN details');
//       }
//     } catch (error) {
//       console.error('Failed to save MTN details', error);
//       alert('An error occurred while saving MTN details');
//     }
//   };

//   const rows = useMemo(() => generateInitialRows(materials, searchTerm), [materials, searchTerm]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Box sx={{ mt: 4, mx: 2 }}>
//       <EditToolbar handleAddClick={handleAddMTN} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h6" sx={{ mb: 1 }}>MTN Details</Typography>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>MTN NO</TableCell>
//                 <TableCell>MTN DATE</TableCell>
//                 <TableCell>REQUESTED BY</TableCell>
//                 <TableCell>WAREHOUSE</TableCell>
//                 <TableCell>PROJECT</TableCell>
//                 <TableCell>REMARKS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>
//                   <TextField size="small" variant="outlined" />
//                 </TableCell>
//                 <TableCell>
//                   <TextField size="small" variant="outlined" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
//                 </TableCell>
//                 <TableCell>
//                   <TextField size="small" variant="outlined" />
//                 </TableCell>
//                 <TableCell>
//                   <TextField size="small" variant="outlined" defaultValue="STM" />
//                 </TableCell>
//                 <TableCell>
//                   <TextField size="small" variant="outlined" />
//                 </TableCell>
//                 <TableCell>
//                   <TextField size="small" variant="outlined" />
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h6" sx={{ mb: 1 }}>MTN Materials</Typography>
//         <Paper variant="outlined">
//           <TableContainer sx={{ maxHeight: 580 }}>
//             <Table aria-label="MTN materials table" stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY','ACTIONS'].map((header) => (
//                     <TableCell key={header} align="center" className={classes.tableHeader}>
//                       {header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
//                   <TableRow key={index} className={classes.tableRow}>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.MatCode}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].MatCode = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.MatDesc}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].MatDesc = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.Spec}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].Spec = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.Unit}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].Unit = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.BalQuantity}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].BalQuantity = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Tooltip title="Edit">
//                         <IconButton size="small">
//                           <IconDotsVertical size="1.1rem" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 80]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Box>
//       <Box mt={2} display="flex" justifyContent="flex-end">
//         <Button variant="contained" sx={{ mr: 2 }}>
//           Print MTN
//         </Button>
//         <Button variant="contained" onClick={handleSave}>Save</Button>
//       </Box>
//       <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MTN Entry">
//         <MtnEntryForm />
//       </DialogModal>
//     </Box>
//   );
// };

// export default MTNScreen;



import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { IconDotsVertical } from '@tabler/icons';
import DialogModal from 'src/components/shared/Dialog';
import MtnEntryForm from 'src/components/systems/Model/MtnEntryForm';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
  },
  searchInput: {
    width: '220px',
    marginLeft: '10px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  toolbarButton: {
    marginLeft: 'auto',
  },
});

const generateInitialRows = (materials, searchTerm) => {
  if (!Array.isArray(materials)) return [];
  return materials.filter(material =>
    Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const EditToolbar = ({ handleAddClick, searchTerm, setSearchTerm }) => {
  const classes = useStyles();
  return (
    <Box className={classes.toolbar}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search MTN Materials"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchInput}
      />
      <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
        Add New MTN
      </Button>
    </Box>
  );
};

const MTNScreen = () => {
  const classes = useStyles();
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
const theme = useTheme();
  const headerCellStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  };

  // Fake data for MTN records
  const fakeMTNData = [
    {
      id: 1,
      MTN_NO: 'MTN-2023-001',
      MTN_DATE: '2023-05-15',
      REQUESTED_BY: 'John Smith',
      WAREHOUSE: 'Main Warehouse',
      PROJECT: 'Office Renovation',
      REMARKS: 'Urgent materials needed',
      MatCode: 'MAT-001',
      MatDesc: 'Steel Beams',
      Spec: 'ASTM A36',
      Unit: 'PCS',
      BalQuantity: 50
    },
    {
      id: 2,
      MTN_NO: 'MTN-2023-002',
      MTN_DATE: '2023-05-16',
      REQUESTED_BY: 'Sarah Johnson',
      WAREHOUSE: 'East Warehouse',
      PROJECT: 'New Construction',
      REMARKS: 'Standard materials',
      MatCode: 'MAT-002',
      MatDesc: 'Concrete Blocks',
      Spec: '20x20x40 cm',
      Unit: 'PCS',
      BalQuantity: 200
    },
    {
      id: 3,
      MTN_NO: 'MTN-2023-003',
      MTN_DATE: '2023-05-17',
      REQUESTED_BY: 'Michael Brown',
      WAREHOUSE: 'Main Warehouse',
      PROJECT: 'Infrastructure Upgrade',
      REMARKS: 'Special order',
      MatCode: 'MAT-003',
      MatDesc: 'Electrical Wiring',
      Spec: 'Copper 2.5mm',
      Unit: 'M',
      BalQuantity: 500
    },
    {
      id: 4,
      MTN_NO: 'MTN-2023-004',
      MTN_DATE: '2023-05-18',
      REQUESTED_BY: 'Emily Davis',
      WAREHOUSE: 'West Warehouse',
      PROJECT: 'Equipment Maintenance',
      REMARKS: 'Regular maintenance',
      MatCode: 'MAT-004',
      MatDesc: 'Lubricants',
      Spec: 'Industrial Grade',
      Unit: 'L',
      BalQuantity: 25
    },
    {
      id: 5,
      MTN_NO: 'MTN-2023-005',
      MTN_DATE: '2023-05-19',
      REQUESTED_BY: 'Robert Wilson',
      WAREHOUSE: 'Main Warehouse',
      PROJECT: 'Office Supplies',
      REMARKS: 'New stock',
      MatCode: 'MAT-005',
      MatDesc: 'Office Chairs',
      Spec: 'Ergonomic',
      Unit: 'PCS',
      BalQuantity: 30
    },
    {
      id: 6,
      MTN_NO: 'MTN-2023-006',
      MTN_DATE: '2023-05-20',
      REQUESTED_BY: 'Jennifer Lee',
      WAREHOUSE: 'North Warehouse',
      PROJECT: 'IT Equipment',
      REMARKS: 'IT department request',
      MatCode: 'MAT-006',
      MatDesc: 'Network Cables',
      Spec: 'Cat6',
      Unit: 'M',
      BalQuantity: 300
    },
    {
      id: 7,
      MTN_NO: 'MTN-2023-007',
      MTN_DATE: '2023-05-21',
      REQUESTED_BY: 'David Kim',
      WAREHOUSE: 'Main Warehouse',
      PROJECT: 'Safety Equipment',
      REMARKS: 'Safety compliance',
      MatCode: 'MAT-007',
      MatDesc: 'Safety Helmets',
      Spec: 'ANSI Z89.1',
      Unit: 'PCS',
      BalQuantity: 100
    },
    {
      id: 8,
      MTN_NO: 'MTN-2023-008',
      MTN_DATE: '2023-05-22',
      REQUESTED_BY: 'Amanda White',
      WAREHOUSE: 'South Warehouse',
      PROJECT: 'Construction Materials',
      REMARKS: 'Site materials',
      MatCode: 'MAT-008',
      MatDesc: 'Cement Bags',
      Spec: 'Portland Type I',
      Unit: 'BAG',
      BalQuantity: 150
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setMaterials(fakeMTNData);
  }, []);

  const handleAddMTN = () => {
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleSave = async () => {
    try {
      // Simulate saving data
      console.log('Saving MTN details:', materials);
      alert('MTN details saved successfully');
    } catch (error) {
      console.error('Failed to save MTN details', error);
      alert('An error occurred while saving MTN details');
    }
  };

  const rows = useMemo(() => generateInitialRows(materials, searchTerm), [materials, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ mt: 4, mx: 2 }}>
      <EditToolbar handleAddClick={handleAddMTN} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MTN Details</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>MTN NO</TableCell>
                <TableCell sx={headerCellStyle}>MTN DATE</TableCell>
                <TableCell sx={headerCellStyle}>REQUESTED BY</TableCell>
                <TableCell sx={headerCellStyle}>WAREHOUSE</TableCell>
                <TableCell sx={headerCellStyle}>PROJECT</TableCell>
                <TableCell sx={headerCellStyle}>REMARKS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField size="small" variant="outlined" defaultValue="MTN-2023-009" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" defaultValue="User Name" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" defaultValue="Main Warehouse" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" defaultValue="Current Project" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" defaultValue="Additional remarks" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MTN Materials</Typography>
        <Paper variant="outlined">
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table aria-label="MTN materials table" stickyHeader>
              <TableHead>
                <TableRow>
                  {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY', 'ACTIONS'].map((header) => (
                    <TableCell key={header} align="center" sx={headerCellStyle}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
                  <TableRow key={material.id || index} className={classes.tableRow}>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.MatCode}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].MatCode = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.MatDesc}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].MatDesc = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.Spec}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].Spec = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.Unit}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].Unit = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.BalQuantity}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].BalQuantity = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <IconDotsVertical size="1.1rem" />
                        </IconButton>
                      </Tooltip>
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
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={{ mr: 2 }}>
          Print MTN
        </Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Box>
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MTN Entry">
        <MtnEntryForm />
      </DialogModal>
    </Box>
  );
};

export default MTNScreen;