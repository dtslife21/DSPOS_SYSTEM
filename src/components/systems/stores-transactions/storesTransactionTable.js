// import { makeStyles } from '@material-ui/core/styles';
// import { Search as SearchIcon } from '@mui/icons-material';
// import {
//   Box,
//   Button,
//   InputAdornment,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TextField
// } from '@mui/material';
// import * as React from 'react';
// import { useEffect, useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DialogModal from 'src/components/shared/Dialog';
// import {
//   GetStoresTransactionDetails,
//   GetStoresTransactions,
// } from 'src/store/systems/storesTransaction/StoresTransactionSlice';
// import StoresTransactionEntryForm from '../Model/StoresTransactionEntryForm';

// import Grid from '@mui/material/Grid';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const useStyles = makeStyles({
//   tableHeader: {
//     backgroundColor: '#ECECEC',
//   },
//   tableRow: {
//     cursor: 'pointer',
//   },
//   searchInput: {
//     width: '220px',
//   },
// });

// function generateInitialRows(storesTransactionDetails, searchTerm) {
//   console.log('Stores Transaction Details 1', storesTransactionDetails);
//   return storesTransactionDetails
//     .filter((storesTransactionDetails) =>
//       Object.values(storesTransactionDetails)
//         .join(' ')
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()),
//     )
//     .map((storesTransactionDetails, index) => ({
//       id: `${storesTransactionDetails.WHcode}-${index}`,
//       WearHouse_code: storesTransactionDetails.WHcode,
//       Doc_Type: storesTransactionDetails.DocType,
//       Doc_No: storesTransactionDetails.DocNo,
//       Material_Code: storesTransactionDetails.MatCode,
//       Material_Desc: storesTransactionDetails.MatDesc,
//       Unit: storesTransactionDetails.Unit,
//       Quantity: storesTransactionDetails.Qty,
//       Value: storesTransactionDetails.Value,
//       Project: storesTransactionDetails.Project,
//       Originated_By: storesTransactionDetails.OriginatedBy,
//       Date: storesTransactionDetails.Date,
//       AvgRate: storesTransactionDetails.AvgRate,
//     }));
// }

// function EditToolbar({ handleSearchChange, searchTerm }) {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [open, setOpen] = React.useState(false);

//   const handlestartDate = (newStartDate) => {
//     const formattedDate = newStartDate.toISOString().split('T')[0];
//     setStartDate(formattedDate);
//   };

//   const handleEndDate = (newEndDate) => {
//     const formattedDate = newEndDate.toISOString().split('T')[0];
//     setEndDate(formattedDate);
//   };

//   const handleLoadData = async () => {
//     if (startDate == '' && endDate == '') {
//       setOpen(true);
//       return;
//     }

//     await dispatch(
//       GetStoresTransactions({
//         startDate: startDate,
//         endDate: endDate,
//       }),
//     );
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingRight: '2px',
//         marginBottom: '20px',
//       }}
//     >
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container spacing={1}>
//             <Grid item xs={15} sm={8} lg={2}>
//               <DatePicker
//                 label="Select Start Date"
//                 value={startDate}
//                 onChange={handlestartDate}
//                 renderInput={(params) => <TextField {...params} />}
//                 maxDate={new Date()}
//               />
//             </Grid>
//             <Grid item xs={15} sm={8} lg={2}>
//               <DatePicker
//                 label="Select End Date"
//                 value={endDate}
//                 onChange={handleEndDate}
//                 renderInput={(params) => <TextField {...params} />}
//                 maxDate={new Date()}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} lg={1}>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 onClick={handleLoadData}
//                 sx={{
//                   height: '42px',
//                 }}
//               >
//                 LOAD
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </LocalizationProvider>

//       <TextField
//         placeholder="Search ..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className={classes.searchInput}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//           sx: {
//             '& input': {
//               padding: '7px',
//             },
//           },
//         }}
//       />
//     </Box>
//   );
// }

// export default function StoresTransaction() {
//   const classes = useStyles();
//   const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
//   const { storesTransactios, storesTransactionDetails } = useSelector(
//     (state) => state.storesTransactionReducer,
//   );
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     dispatch(GetStoresTransactions());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log('Stores Transaction Details 2', storesTransactionDetails);
//   }, [storesTransactionDetails]);

//   const rows = useMemo(
//     () => generateInitialRows(storesTransactionDetails, searchTerm),
//     [storesTransactionDetails, searchTerm],
//   );

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleRowClick = (row) => {
//     setSelectedRowData(row);
//     dispatch(GetStoresTransactionDetails(row.WearHouse_code));
//   };

//   const handleEditClick = (event, row) => {
//     event.stopPropagation();
//     setSelectedRowData(row);
//     setIsEntryFormOpen(true);
//     dispatch(GetStoresTransactionDetails(row.WearHouse_code));
//   };

//   const handleCloseEntryForm = () => {
//     setIsEntryFormOpen(false);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
//       <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Material Info">
//         <StoresTransactionEntryForm initialData={selectedRowData} />
//       </DialogModal>
//       <TableContainer sx={{ maxHeight: 450 }}>
//         <Table aria-label="stores transaction details" stickyHeader size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 WAREHOUSE CODE
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 DOC TYPE
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 DOC NO
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 MAT CODE
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 MAT DESCRIPTION
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 UNIT
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 QUANTITY
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 VALUE
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 PROJECT
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 ORIGINATED BY
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 DATE
//               </TableCell>
//               <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
//                 AVERAGE RATE
//               </TableCell>
//               {/* <TableCell align="center" className={classes.tableHeader}>
//                 ACTIONS
//               </TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//               <TableRow
//                 key={row.id}
//                 onClick={() => handleRowClick(row)}
//                 className={classes.tableRow}
//               >
//                 <TableCell align="left">{row.WearHouse_code}</TableCell>
//                 <TableCell align="left">{row.Doc_Type}</TableCell>
//                 <TableCell align="left">{row.Doc_No}</TableCell>
//                 <TableCell align="left">{row.Material_Code}</TableCell>
//                 <TableCell align="left">{row.Material_Desc}</TableCell>
//                 <TableCell align="left">{row.Unit}</TableCell>
//                 <TableCell align="left">{row.Quantity}</TableCell>
//                 <TableCell align="left">{row.Value}</TableCell>
//                 <TableCell align="left">{row.Project}</TableCell>
//                 <TableCell align="left">{row.Originated_By}</TableCell>
//                 <TableCell align="left">{row.Date}</TableCell>
//                 <TableCell align="left">{row.AvgRate}</TableCell>
//                 {/* <TableCell align="center">
//                   <IconButton onClick={(event) => handleEditClick(event, row)}>
//                     <EditIcon />
//                   </IconButton>
//                 </TableCell> */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[25, 50, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }




import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from 'src/components/shared/Dialog';
import {
  GetStoresTransactionDetails,
  GetStoresTransactions,
} from 'src/store/systems/storesTransaction/StoresTransactionSlice';
import StoresTransactionEntryForm from '../Model/StoresTransactionEntryForm';

import Grid from '@mui/material/Grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
  },
  searchInput: {
    width: '220px',
  },
});

// Fake data for stores transaction details
const fakeStoresTransactionDetails = [
  {
    id: 'WH-001-0',
    WHcode: 'WH-001',
    DocType: 'GRN',
    DocNo: 'GRN-2023-001',
    MatCode: 'MAT-001',
    MatDesc: 'Steel Beams',
    Unit: 'PCS',
    Qty: 50,
    Value: 25000,
    Project: 'Office Renovation',
    OriginatedBy: 'John Smith',
    Date: '2023-05-15',
    AvgRate: 500
  },
  {
    id: 'WH-002-1',
    WHcode: 'WH-002',
    DocType: 'MRN',
    DocNo: 'MRN-2023-001',
    MatCode: 'MAT-002',
    MatDesc: 'Concrete Blocks',
    Unit: 'PCS',
    Qty: 200,
    Value: 10000,
    Project: 'New Construction',
    OriginatedBy: 'Sarah Johnson',
    Date: '2023-05-16',
    AvgRate: 50
  },
  {
    id: 'WH-003-2',
    WHcode: 'WH-003',
    DocType: 'PRN',
    DocNo: 'PRN-2023-001',
    MatCode: 'MAT-003',
    MatDesc: 'Electrical Wiring',
    Unit: 'M',
    Qty: 500,
    Value: 7500,
    Project: 'Infrastructure Upgrade',
    OriginatedBy: 'Michael Brown',
    Date: '2023-05-17',
    AvgRate: 15
  },
  {
    id: 'WH-004-3',
    WHcode: 'WH-004',
    DocType: 'GRN',
    DocNo: 'GRN-2023-002',
    MatCode: 'MAT-004',
    MatDesc: 'Lubricants',
    Unit: 'L',
    Qty: 25,
    Value: 1250,
    Project: 'Equipment Maintenance',
    OriginatedBy: 'Emily Davis',
    Date: '2023-05-18',
    AvgRate: 50
  },
  {
    id: 'WH-005-4',
    WHcode: 'WH-005',
    DocType: 'MRN',
    DocNo: 'MRN-2023-002',
    MatCode: 'MAT-005',
    MatDesc: 'Office Chairs',
    Unit: 'PCS',
    Qty: 30,
    Value: 9000,
    Project: 'Office Supplies',
    OriginatedBy: 'Robert Wilson',
    Date: '2023-05-19',
    AvgRate: 300
  },
  {
    id: 'WH-006-5',
    WHcode: 'WH-006',
    DocType: 'PRN',
    DocNo: 'PRN-2023-002',
    MatCode: 'MAT-006',
    MatDesc: 'Network Cables',
    Unit: 'M',
    Qty: 300,
    Value: 4500,
    Project: 'IT Equipment',
    OriginatedBy: 'Jennifer Lee',
    Date: '2023-05-20',
    AvgRate: 15
  },
  {
    id: 'WH-007-6',
    WHcode: 'WH-007',
    DocType: 'GRN',
    DocNo: 'GRN-2023-003',
    MatCode: 'MAT-007',
    MatDesc: 'Safety Helmets',
    Unit: 'PCS',
    Qty: 100,
    Value: 5000,
    Project: 'Safety Equipment',
    OriginatedBy: 'David Kim',
    Date: '2023-05-21',
    AvgRate: 50
  },
  {
    id: 'WH-008-7',
    WHcode: 'WH-008',
    DocType: 'MRN',
    DocNo: 'MRN-2023-003',
    MatCode: 'MAT-008',
    MatDesc: 'Cement Bags',
    Unit: 'BAG',
    Qty: 150,
    Value: 9000,
    Project: 'Construction Materials',
    OriginatedBy: 'Amanda White',
    Date: '2023-05-22',
    AvgRate: 60
  },
  {
    id: 'WH-009-8',
    WHcode: 'WH-009',
    DocType: 'PRN',
    DocNo: 'PRN-2023-003',
    MatCode: 'MAT-009',
    MatDesc: 'Paint Cans',
    Unit: 'CAN',
    Qty: 40,
    Value: 4000,
    Project: 'Building Maintenance',
    OriginatedBy: 'James Wilson',
    Date: '2023-05-23',
    AvgRate: 100
  },
  {
    id: 'WH-010-9',
    WHcode: 'WH-010',
    DocType: 'GRN',
    DocNo: 'GRN-2023-004',
    MatCode: 'MAT-010',
    MatDesc: 'PVC Pipes',
    Unit: 'M',
    Qty: 200,
    Value: 6000,
    Project: 'Plumbing Works',
    OriginatedBy: 'Lisa Anderson',
    Date: '2023-05-24',
    AvgRate: 30
  }
];

function generateInitialRows(storesTransactionDetails, searchTerm) {
  console.log('Stores Transaction Details 1', storesTransactionDetails);
  return storesTransactionDetails
    .filter((storesTransactionDetails) =>
      Object.values(storesTransactionDetails)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .map((storesTransactionDetails, index) => ({
      id: `${storesTransactionDetails.WHcode}-${index}`,
      WearHouse_code: storesTransactionDetails.WHcode,
      Doc_Type: storesTransactionDetails.DocType,
      Doc_No: storesTransactionDetails.DocNo,
      Material_Code: storesTransactionDetails.MatCode,
      Material_Desc: storesTransactionDetails.MatDesc,
      Unit: storesTransactionDetails.Unit,
      Quantity: storesTransactionDetails.Qty,
      Value: storesTransactionDetails.Value,
      Project: storesTransactionDetails.Project,
      Originated_By: storesTransactionDetails.OriginatedBy,
      Date: storesTransactionDetails.Date,
      AvgRate: storesTransactionDetails.AvgRate,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [open, setOpen] = React.useState(false);

  const handlestartDate = (newStartDate) => {
    const formattedDate = newStartDate.toISOString().split('T')[0];
    setStartDate(formattedDate);
  };

  const handleEndDate = (newEndDate) => {
    const formattedDate = newEndDate.toISOString().split('T')[0];
    setEndDate(formattedDate);
  };

  const handleLoadData = async () => {
    if (startDate == '' && endDate == '') {
      setOpen(true);
      return;
    }

    await dispatch(
      GetStoresTransactions({
        startDate: startDate,
        endDate: endDate,
      }),
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '2px',
        marginBottom: '20px',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={15} sm={8} lg={2}>
              <DatePicker
                label="Select Start Date"
                value={startDate}
                onChange={handlestartDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
              />
            </Grid>
            <Grid item xs={15} sm={8} lg={2}>
              <DatePicker
                label="Select End Date"
                value={endDate}
                onChange={handleEndDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleLoadData}
                sx={{
                  height: '42px',
                }}
              >
                LOAD
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>

      <TextField
        placeholder="Search ..."
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
    </Box>
  );
}

export default function StoresTransaction() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const { storesTransactios, storesTransactionDetails } = useSelector(
    (state) => state.storesTransactionReducer,
  );
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Use fake data instead of API call for demonstration
    // dispatch(GetStoresTransactions());
  }, [dispatch]);

  useEffect(() => {
    console.log('Stores Transaction Details 2', storesTransactionDetails);
  }, [storesTransactionDetails]);

  // Use fake data instead of Redux store data
  const rows = useMemo(
    () => generateInitialRows(fakeStoresTransactionDetails, searchTerm),
    [searchTerm],
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    // dispatch(GetStoresTransactionDetails(row.WearHouse_code));
  };

  const handleEditClick = (event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
    // dispatch(GetStoresTransactionDetails(row.WearHouse_code));
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Material Info">
        <StoresTransactionEntryForm initialData={selectedRowData} />
      </DialogModal>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table aria-label="stores transaction details" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                WAREHOUSE CODE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                DOC TYPE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                DOC NO
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                MAT CODE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                MAT DESCRIPTION
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                UNIT
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                QUANTITY
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                VALUE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                PROJECT
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                ORIGINATED BY
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                DATE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>
                AVERAGE RATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row)}
                className={classes.tableRow}
                hover
              >
                <TableCell align="left">{row.WearHouse_code}</TableCell>
                <TableCell align="left">{row.Doc_Type}</TableCell>
                <TableCell align="left">{row.Doc_No}</TableCell>
                <TableCell align="left">{row.Material_Code}</TableCell>
                <TableCell align="left">{row.Material_Desc}</TableCell>
                <TableCell align="left">{row.Unit}</TableCell>
                <TableCell align="left">{row.Quantity}</TableCell>
                <TableCell align="left">{row.Value}</TableCell>
                <TableCell align="left">{row.Project}</TableCell>
                <TableCell align="left">{row.Originated_By}</TableCell>
                <TableCell align="left">{row.Date}</TableCell>
                <TableCell align="left">{row.AvgRate}</TableCell>
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