// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import { format } from 'date-fns';
// import {
//     Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TablePagination,
//     TableRow,
//     TableSortLabel,
//     Toolbar,
//     IconButton,
//     Tooltip,
//     FormControlLabel,
//     Typography,
//     Avatar,
//     TextField,
//     InputAdornment,
//     Paper,
// } from '@mui/material';

// import { visuallyHidden } from '@mui/utils';
// import Button from '@mui/material/Button';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts } from 'src/store/systems/warehouse/EcommerceSlice';
// import CustomCheckbox from '../../../../components/forms/theme-elements/CustomCheckbox';
// import CustomSwitch from '../../../../components/forms/theme-elements/CustomSwitch';
// import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons';

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: false,
//         label: 'GRN NO',
//     },
//     {
//         id: 'pname',
//         numeric: false,
//         disablePadding: false,
//         label: 'SUPPLIER NAME',
//     },

//     {
//         id: 'status',
//         numeric: false,
//         disablePadding: false,
//         label: 'INVOICE NO',
//     },
//     {
//         id: 'price',
//         numeric: false,
//         disablePadding: false,
//         label: 'GRN DATE',
//     },
//     {
//         id: 'action',
//         numeric: false,
//         disablePadding: false,
//         label: 'GRN ORIGINATED BY',
//     },
//     {
//         id: 'action',
//         numeric: false,
//         disablePadding: false,
//         label: 'WAREHOUSE',
//     },
//     {
//         id: 'action',
//         numeric: false,
//         disablePadding: false,
//         label: 'PROJECT',
//     },

// ];

// function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };

//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding="checkbox">
//                     <CustomCheckbox
//                         color="primary"
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         inputprops={{
//                             'aria-label': 'select all desserts',
//                         }}
//                     />
//                 </TableCell>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={headCell.numeric ? 'right' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

// const EnhancedTableToolbar = (props) => {
//     const { numSelected, handleAddNewPRN } = props;

//     return (
//         <Toolbar
//             sx={{
//                 pl: { sm: 2 },
//                 pr: { xs: 1, sm: 1 },
//                 ...(numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 }),
//             }}
//         >
//             {numSelected > 0 ? (
//                 <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
//                     {numSelected} selected
//                 </Typography>
//             ) : null}
//             <Box sx={{ flex: '1 1 100%' }} />
//             <Button variant="contained" onClick={handleAddNewPRN} sx={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
//                 Add New PRN
//             </Button>

//             {/* <Box sx={{ flex: '1 1 100%' }}>
//                     <TextField
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <IconSearch size="1.1rem" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         // placeholder="Search Product"
//                         // size="small"
//                         // onChange={handleSearch}
//                         // value={search}
//                     />
//                 </Box> */}

//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton>
//                         <IconTrash width="18" />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title="Filter list">
//                     <IconButton>

//                     </IconButton>
//                 </Tooltip>
//             )}
//         </Toolbar>
//     );
// };

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

// const ComPrn = () => {
//     const [order, setOrder] = React.useState('asc');
//     const [orderBy, setOrderBy] = React.useState('calories');
//     const [selected, setSelected] = React.useState([]);
//     const [page, setPage] = React.useState(0);
//     const [dense, setDense] = React.useState(false);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//     const handleAddNewPRN = () => {
//         console.log('Add New GRN button clicked');
//         // logic
//     };

//     const handleSave = () => {
//         console.log('Save button clicked');
//     };

//     const handlePrint = () => {
//         console.log('Print button clicked');
//     };
//     const dispatch = useDispatch();
//     //Fetch Products
//     React.useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     const getProducts = useSelector((state) => state.ecommerceReducer.products);

//     const [rows, setRows] = React.useState(getProducts);
//     const [search, setSearch] = React.useState('');

//     React.useEffect(() => {
//         setRows(getProducts);
//     }, [getProducts]);

//     const handleSearch = (event) => {
//         const filteredRows = getProducts.filter((row) => {
//             return row.title.toLowerCase().includes(event.target.value);
//         });
//         setSearch(event.target.value);
//         setRows(filteredRows);
//     };

//     // This is for the sorting
//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     // This is for select all the row
//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             const newSelecteds = rows.map((n) => n.title);
//             setSelected(newSelecteds);
//             return;
//         }
//         setSelected([]);
//     };

//     // This is for the single row sleect
//     const handleClick = (event, name) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1),
//             );
//         }

//         setSelected(newSelected);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleChangeDense = (event) => {
//         setDense(event.target.checked);
//     };

//     const isSelected = (name) => selected.indexOf(name) !== -1;

//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//     return (

//         <Box>
//             <Box sx={{ mt: 10, ml: 2, mb: -7 }}>
//                 <Typography variant="h6">PRN Details</Typography>
//             </Box>
//             <Box>
//                 <EnhancedTableToolbar
//                     // numSelected={selected.length}
//                     // search={search}
//                     // handleSearch={(event) => handleSearch(event)}
//                     handleSave={handleSave}
//                     handlePrint={handlePrint}
//                     handleAddNewPRN={handleAddNewPRN}
//                 />
//                 <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
//                     <TableContainer>
//                         <Table
//                             sx={{ minWidth: 750 }}
//                             aria-labelledby="tableTitle"
//                             size={dense ? 'small' : 'medium'}
//                         >
//                             <EnhancedTableHead
//                                 numSelected={selected.length}
//                                 order={order}
//                                 orderBy={orderBy}
//                                 onSelectAllClick={handleSelectAllClick}
//                                 onRequestSort={handleRequestSort}
//                                 rowCount={rows.length}
//                             />
//                             <TableBody>
//                                 {stableSort(rows, getComparator(order, orderBy))
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row, index) => {
//                                         const isItemSelected = isSelected(row.title);
//                                         const labelId = `enhanced-table-checkbox-${index}`;

//                                         return (
//                                             <TableRow
//                                                 hover
//                                                 onClick={(event) => handleClick(event, row.title)}
//                                                 role="checkbox"
//                                                 aria-checked={isItemSelected}
//                                                 tabIndex={-1}
//                                                 key={row.title}
//                                                 selected={isItemSelected}
//                                             >
//                                                 <TableCell padding="checkbox">
//                                                     <CustomCheckbox
//                                                         color="primary"
//                                                         checked={isItemSelected}
//                                                         inputprops={{
//                                                             'aria-labelledby': labelId,
//                                                         }}
//                                                     />
//                                                 </TableCell>

//                                                 <TableCell>
//                                                     <Box display="flex" alignItems="center">
//                                                         <Avatar
//                                                             src={row.photo}
//                                                             alt={row.photo}
//                                                             variant="rounded"
//                                                             sx={{ width: 56, height: 56, borderRadius: '100%' }}
//                                                         />
//                                                         <Box
//                                                             sx={{
//                                                                 ml: 2,
//                                                             }}
//                                                         >
//                                                             <Typography variant="h6" fontWeight="600">
//                                                                 {row.title}
//                                                             </Typography>
//                                                             <Typography color="textSecondary" variant="subtitle2">
//                                                                 {row.category}
//                                                             </Typography>
//                                                         </Box>
//                                                     </Box>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Typography>{format(new Date(row.created), 'E, MMM d yyyy')}</Typography>
//                                                 </TableCell>

//                                                 <TableCell>
//                                                     <Box display="flex" alignItems="center">
//                                                         <Box
//                                                             sx={{
//                                                                 backgroundColor: row.stock
//                                                                     ? (theme) => theme.palette.success.main
//                                                                     : (theme) => theme.palette.error.main,
//                                                                 borderRadius: '100%',
//                                                                 height: '10px',
//                                                                 width: '10px',
//                                                             }}
//                                                         />
//                                                         <Typography
//                                                             color="textSecondary"
//                                                             variant="subtitle2"
//                                                             sx={{
//                                                                 ml: 1,
//                                                             }}
//                                                         >
//                                                             {row.stock ? 'InStock' : 'Out of Stock'}
//                                                         </Typography>
//                                                     </Box>
//                                                 </TableCell>

//                                                 <TableCell>
//                                                     <Typography fontWeight="500" variant="h6">
//                                                         ${row.price}
//                                                     </Typography>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Tooltip title="Edit">
//                                                         <IconButton size="small">
//                                                             <IconDotsVertical size="1.1rem" />
//                                                         </IconButton>
//                                                     </Tooltip>
//                                                 </TableCell>
//                                             </TableRow>
//                                         );
//                                     })}
//                                 {emptyRows > 0 && (
//                                     <TableRow
//                                         style={{
//                                             height: (dense ? 33 : 53) * emptyRows,
//                                         }}
//                                     >
//                                         <TableCell colSpan={6} />
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
//                         count={rows.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Paper>
//                 <Box ml={2}>
//                     <FormControlLabel
//                         control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
//                         label="Dense padding"
//                     />
//                 </Box>
//                 <Box mt={2}
//                     display="flex"
//                     justifyContent="flex-end"
//                     alignItems="flex-end"
//                     pr={2}
//                 >
//                     <Button variant="contained" onClick={handleSave}>
//                         Save
//                     </Button>
//                     <Button variant="contained" onClick={handlePrint} sx={{ ml: 2 }}>
//                         Print PRN
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default ComPrn;



import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { format } from 'date-fns';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import CustomCheckbox from '../../../../components/forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../../../../components/forms/theme-elements/CustomSwitch';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons'; 

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'prnNo',
    numeric: false,
    disablePadding: false,
    label: 'PRN NO',
  },
  {
    id: 'supplierName',
    numeric: false,
    disablePadding: false,
    label: 'SUPPLIER NAME',
  },
  {
    id: 'invoiceNo',
    numeric: false,
    disablePadding: false,
    label: 'INVOICE NO',
  },
  {
    id: 'prnDate',
    numeric: false,
    disablePadding: false,
    label: 'PRN DATE',
  },
  {
    id: 'originatedBy',
    numeric: false,
    disablePadding: false,
    label: 'PRN ORIGINATED BY',
  },
  {
    id: 'warehouse',
    numeric: false,
    disablePadding: false,
    label: 'WAREHOUSE',
  },
  {
    id: 'project',
    numeric: false,
    disablePadding: false,
    label: 'PROJECT',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
    const theme = useTheme();
  const headerCellStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputprops={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headerCellStyle}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleAddNewPRN } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : null}
      <Box sx={{ flex: '1 1 100%' }} />
      <Button variant="contained" onClick={handleAddNewPRN} sx={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
        Add New PRN
      </Button>

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <IconTrash width="18" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter width="18" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const ComPrn = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('prnNo');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');




  // Fake data for PRN records
  const prnData = [
    {
      id: 1,
      prnNo: 'PRN-2023-001',
      supplierName: 'ABC Suppliers Ltd.',
      invoiceNo: 'INV-2023-04567',
      prnDate: '2023-05-15',
      originatedBy: 'John Smith',
      warehouse: 'Main Warehouse',
      project: 'Office Renovation',
      status: 'Approved',
    //   avatar: '/static/images/avatar/1.jpg'
    },
    {
      id: 2,
      prnNo: 'PRN-2023-002',
      supplierName: 'XYZ Distributors',
      invoiceNo: 'INV-2023-04568',
      prnDate: '2023-05-16',
      originatedBy: 'Sarah Johnson',
      warehouse: 'East Warehouse',
      project: 'New Construction',
      status: 'Pending',
    //   avatar: '/static/images/avatar/2.jpg'
    },
    {
      id: 3,
      prnNo: 'PRN-2023-003',
      supplierName: 'Global Materials Inc.',
      invoiceNo: 'INV-2023-04569',
      prnDate: '2023-05-17',
      originatedBy: 'Michael Brown',
      warehouse: 'Main Warehouse',
      project: 'Infrastructure Upgrade',
      status: 'Rejected',
    //   avatar: '/static/images/avatar/3.jpg'
    },
    {
      id: 4,
      prnNo: 'PRN-2023-004',
      supplierName: 'Premium Supplies Co.',
      invoiceNo: 'INV-2023-04570',
      prnDate: '2023-05-18',
      originatedBy: 'Emily Davis',
      warehouse: 'West Warehouse',
      project: 'Equipment Maintenance',
      status: 'Approved',
    //   avatar: '/static/images/avatar/4.jpg'
    },
    {
      id: 5,
      prnNo: 'PRN-2023-005',
      supplierName: 'Quality Goods Ltd.',
      invoiceNo: 'INV-2023-04571',
      prnDate: '2023-05-19',
      originatedBy: 'Robert Wilson',
      warehouse: 'Main Warehouse',
      project: 'Office Supplies',
      status: 'Pending',
    //   avatar: '/static/images/avatar/5.jpg'
    },
    {
      id: 6,
      prnNo: 'PRN-2023-006',
      supplierName: 'Reliable Distributors',
      invoiceNo: 'INV-2023-04572',
      prnDate: '2023-05-20',
      originatedBy: 'Jennifer Lee',
      warehouse: 'North Warehouse',
      project: 'IT Equipment',
      status: 'Approved',
    //   avatar: '/static/images/avatar/6.jpg'
    },
    {
      id: 7,
      prnNo: 'PRN-2023-007',
      supplierName: 'Tech Supplies Inc.',
      invoiceNo: 'INV-2023-04573',
      prnDate: '2023-05-21',
      originatedBy: 'David Kim',
      warehouse: 'Main Warehouse',
      project: 'Safety Equipment',
      status: 'Pending',
    //   avatar: '/static/images/avatar/7.jpg'
    },
    {
      id: 8,
      prnNo: 'PRN-2023-008',
      supplierName: 'Industrial Parts Co.',
      invoiceNo: 'INV-2023-04574',
      prnDate: '2023-05-22',
      originatedBy: 'Amanda White',
      warehouse: 'South Warehouse',
      project: 'Construction Materials',
      status: 'Approved',
    //   avatar: '/static/images/avatar/8.jpg'
    }
  ];

  const [rows, setRows] = React.useState(prnData);

  const handleAddNewPRN = () => {
    console.log('Add New PRN button clicked');
    // logic
  };

  const handleSave = () => {
    console.log('Save button clicked');
  };

  const handlePrint = () => {
    console.log('Print button clicked');
  };

  const handleSearch = (event) => {
    const filteredRows = prnData.filter((row) => {
      return Object.values(row).some(value => 
        value && value.toString().toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  // This is for the sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.prnNo);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // This is for the single row select
  const handleClick = (event, prnNo) => {
    const selectedIndex = selected.indexOf(prnNo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, prnNo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (prnNo) => selected.indexOf(prnNo) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Box sx={{ mt: 10, ml: 2, mb: -7 }}>
        <Typography variant="h6">PRN Details</Typography>
      </Box>
      <Box>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleAddNewPRN={handleAddNewPRN}
        />
        <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size="1.1rem" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search PRN..."
              size="small"
              onChange={handleSearch}
              value={search}
            />
          </Box>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.prnNo);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.prnNo)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <CustomCheckbox
                            color="primary"
                            checked={isItemSelected}
                            inputprops={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {/* <Avatar
                              src={row.avatar}
                              alt={row.originatedBy}
                              variant="rounded"
                              sx={{ width: 56, height: 56, borderRadius: '100%' }}
                            /> */}
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="h6" fontWeight="600">
                                {row.prnNo}
                              </Typography>
                              <Typography color="textSecondary" variant="subtitle2">
                                {row.supplierName}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Typography>{row.supplierName}</Typography>
                        </TableCell>
                        
                        <TableCell>
                          <Typography>{row.invoiceNo}</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>{row.prnDate}</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>{row.originatedBy}</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>{row.warehouse}</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>{row.project}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box ml={2}>
          <FormControlLabel
            control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
        <Box mt={2}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          pr={2}
        >
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handlePrint} sx={{ ml: 2 }}>
            Print PRN
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ComPrn;