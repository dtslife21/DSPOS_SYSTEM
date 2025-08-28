// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
// } from '@mui/material';
// import { useState, useEffect, useMemo } from 'react';
// import { format } from 'date-fns';
// import { IconDotsVertical } from '@tabler/icons';
// import DialogModal from 'src/components/shared/Dialog';
// import MrqEntryForm from 'src/components/systems/Model/MrqEntryForm'; 
// import MrqService from 'src/store/service/MrqService';  

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
//         placeholder="Search MRQ Materials"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className={classes.searchInput}
//       />
//       <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
//         Add New MRQ
//       </Button>
//     </Box>
//   );
// };

// const MRQScreen = () => {
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
//         const initialData = await MrqService.loadMRQMaterialDetails(whCode);
//         setMaterials(Array.isArray(initialData) ? initialData : []);
//       } catch (error) {
//         console.error('Failed to load initial data', error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleAddMRQ = () => {
//     setIsEntryFormOpen(true);
//   };

//   const handleCloseEntryForm = () => {
//     setIsEntryFormOpen(false);
//   };

//   const handleSave = async () => {
//     try {
//       const whCode = 'STM'; // Replace with the actual warehouse code if needed

//       // Save MRQ details
//       const response = await MrqService.saveMRQDetails(whCode, materials);

//       if (response && response.success) {
//         alert('MRQ details saved successfully');
//       } else {
//         alert('Failed to save MRQ details');
//       }
//     } catch (error) {
//       console.error('Failed to save MRQ details', error);
//       alert('An error occurred while saving MRQ details');
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
//       <EditToolbar handleAddClick={handleAddMRQ} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h6" sx={{ mb: 1 }}>MRQ Details</Typography>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>MRQ NO</TableCell>
//                 <TableCell>MRQ DATE</TableCell>
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
//         <Typography variant="h6" sx={{ mb: 1 }}>MRQ Materials</Typography>
//         <Paper variant="outlined">
//           <TableContainer sx={{ maxHeight: 580 }}>
//             <Table aria-label="MRQ materials table" stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY', 'ISSUED QUANTITY', 'ACTIONS'].map((header) => (
//                     <TableCell key={header} align="center" className={classes.tableHeader}>
//                       {header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
//                   <TableRow key={index} className={classes.tableRow}>
//                     {Object.keys(material).map((key) => (
//                       <TableCell key={key} align="center">
//                         <TextField
//                           size="small"
//                           value={material[key]}
//                           onChange={(e) => {
//                             const newMaterials = [...materials];
//                             newMaterials[index][key] = e.target.value;
//                             setMaterials(newMaterials);
//                           }}
//                         />
//                       </TableCell>
//                     ))}
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
//           Print MRQ
//         </Button>
//         <Button variant="contained" onClick={handleSave}>Save</Button>
//       </Box>
      // <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MRQ Entry">
      //   <MrqEntryForm />
      // </DialogModal>
//     </Box>
//   );
// };

// export default MRQScreen;









import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { IconDotsVertical } from '@tabler/icons';
import DialogModal from 'src/components/shared/Dialog';
import MrqEntryForm from 'src/components/systems/Model/MrqEntryForm'; 
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

// Generate fake MRQ materials data
const generateFakeMaterials = () => {
  return [
    {
      id: 1,
      materialCode: 'MAT-001',
      materialDescription: 'Steel Beams',
      materialSpecification: 'ASTM A36, 6" x 6"',
      uom: 'PCS',
      balanceQuantity: 150,
      issuedQuantity: 25
    },
    {
      id: 2,
      materialCode: 'MAT-002',
      materialDescription: 'Concrete Mix',
      materialSpecification: '4000 PSI, Ready Mix',
      uom: 'M3',
      balanceQuantity: 80,
      issuedQuantity: 10
    },
    {
      id: 3,
      materialCode: 'MAT-003',
      materialDescription: 'Rebar',
      materialSpecification: '#5, Grade 60',
      uom: 'M',
      balanceQuantity: 500,
      issuedQuantity: 120
    },
    {
      id: 4,
      materialCode: 'MAT-004',
      materialDescription: 'Plywood',
      materialSpecification: '3/4", CDX',
      uom: 'SHT',
      balanceQuantity: 200,
      issuedQuantity: 45
    },
    {
      id: 5,
      materialCode: 'MAT-005',
      materialDescription: 'PVC Pipes',
      materialSpecification: '4", Schedule 40',
      uom: 'M',
      balanceQuantity: 300,
      issuedQuantity: 75
    },
    {
      id: 6,
      materialCode: 'MAT-006',
      materialDescription: 'Electrical Wire',
      materialSpecification: '12/2 NM-B',
      uom: 'M',
      balanceQuantity: 400,
      issuedQuantity: 100
    },
    {
      id: 7,
      materialCode: 'MAT-007',
      materialDescription: 'Drywall',
      materialSpecification: '1/2", 4x8',
      uom: 'SHT',
      balanceQuantity: 180,
      issuedQuantity: 30
    },
    {
      id: 8,
      materialCode: 'MAT-008',
      materialDescription: 'Roofing Shingles',
      materialSpecification: 'Architectural, Black',
      uom: 'SQ',
      balanceQuantity: 50,
      issuedQuantity: 15
    },
    {
      id: 9,
      materialCode: 'MAT-009',
      materialDescription: 'Paint',
      materialSpecification: 'Latex, White, Semi-Gloss',
      uom: 'GAL',
      balanceQuantity: 60,
      issuedQuantity: 12
    },
    {
      id: 10,
      materialCode: 'MAT-010',
      materialDescription: 'Nails',
      materialSpecification: '16d, Galvanized',
      uom: 'KG',
      balanceQuantity: 100,
      issuedQuantity: 20
    }
  ];
};

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
        placeholder="Search MRQ Materials"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchInput}
      />
      <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
        Add New MRQ
      </Button>
    </Box>
  );
};

const MRQScreen = () => {
  const classes = useStyles();
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [mrqDetails, setMrqDetails] = useState({
    mrqNo: 'MRQ-2023-001',
    mrqDate: format(new Date(), 'yyyy-MM-dd'),
    requestedBy: '',
    warehouse: 'STM',
    project: '',
    remarks: ''
  });
 const theme = useTheme();
    const headerCellStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  };

  useEffect(() => {
    // Load fake data instead of API call
    const fakeData = generateFakeMaterials();
    setMaterials(fakeData);
  }, []);

  const handleAddMRQ = () => {
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleSave = async () => {
    try {
      // Simulate saving data
      console.log('Saving MRQ details:', mrqDetails);
      console.log('Saving materials:', materials);
      
      alert('MRQ details saved successfully');
    } catch (error) {
      console.error('Failed to save MRQ details', error);
      alert('An error occurred while saving MRQ details');
    }
  };

  const handleMrqDetailChange = (field, value) => {
    setMrqDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...materials];
    newMaterials[index][field] = value;
    setMaterials(newMaterials);
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
      <EditToolbar handleAddClick={handleAddMRQ} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MRQ Details</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>MRQ NO</TableCell>
                <TableCell sx={headerCellStyle}>MRQ DATE</TableCell>
                <TableCell sx={headerCellStyle}>REQUESTED BY</TableCell>
                <TableCell sx={headerCellStyle}>WAREHOUSE</TableCell>
                <TableCell sx={headerCellStyle}>PROJECT</TableCell>
                <TableCell sx={headerCellStyle}>REMARKS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    value={mrqDetails.mrqNo}
                    onChange={(e) => handleMrqDetailChange('mrqNo', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    type="date" 
                    value={mrqDetails.mrqDate}
                    onChange={(e) => handleMrqDetailChange('mrqDate', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    value={mrqDetails.requestedBy}
                    onChange={(e) => handleMrqDetailChange('requestedBy', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    value={mrqDetails.warehouse}
                    onChange={(e) => handleMrqDetailChange('warehouse', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    value={mrqDetails.project}
                    onChange={(e) => handleMrqDetailChange('project', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    value={mrqDetails.remarks}
                    onChange={(e) => handleMrqDetailChange('remarks', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MRQ Materials</Typography>
        <Paper variant="outlined">
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table aria-label="MRQ materials table" stickyHeader>
              <TableHead>
                <TableRow>
                  {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY', 'ISSUED QUANTITY', 'ACTIONS'].map((header) => (
                    <TableCell key={header} align="center" sx={headerCellStyle}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
                  <TableRow key={material.id} className={classes.tableRow}>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.materialCode}
                        onChange={(e) => handleMaterialChange(index, 'materialCode', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.materialDescription}
                        onChange={(e) => handleMaterialChange(index, 'materialDescription', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.materialSpecification}
                        onChange={(e) => handleMaterialChange(index, 'materialSpecification', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.uom}
                        onChange={(e) => handleMaterialChange(index, 'uom', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={material.balanceQuantity}
                        onChange={(e) => handleMaterialChange(index, 'balanceQuantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={material.issuedQuantity}
                        onChange={(e) => handleMaterialChange(index, 'issuedQuantity', e.target.value)}
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
          Print MRQ
        </Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Box>
            <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MRQ Entry">
        <MrqEntryForm />
      </DialogModal>
    </Box>
  );
};

export default MRQScreen;