import { makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
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
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import DialogModal from 'src/components/shared/Dialog';
import CustomerEntryForm from '../Model/CustomerEntryForm';

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
  remarkCell: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

 
const customerData = [
  {
    CustCode: 'C0001',
    CustName: 'John Smith',
    CustEmail: 'john.smith@example.com',
    CustPhoneNo: '+1 555-123-4567',
    CustAddress: '123 Main St, New York, NY 10001',
    CustType: 'Individual',
    CustStatus: 'Active',
    CustRemarks: 'Regular customer with premium membership',
    CustJoinDate: '2022-01-15',
  },
  {
    CustCode: 'C0002',
    CustName: 'ABC Corporation',
    CustEmail: 'contact@abccorp.com',
    CustPhoneNo: '+1 555-987-6543',
    CustAddress: '456 Corporate Blvd, San Francisco, CA 94105',
    CustType: 'Business',
    CustStatus: 'Active',
    CustRemarks: 'Enterprise account with monthly billing',
    CustJoinDate: '2021-11-03',
  },
  {
    CustCode: 'C0003',
    CustName: 'Sarah Johnson',
    CustEmail: 'sarahj@example.com',
    CustPhoneNo: '+1 555-456-7890',
    CustAddress: '789 Oak Ave, Chicago, IL 60601',
    CustType: 'Individual',
    CustStatus: 'Inactive',
    CustRemarks: 'Account on hold - payment issues',
    CustJoinDate: '2022-03-22',
  },
  {
    CustCode: 'C0004',
    CustName: 'XYZ Enterprises',
    CustEmail: 'info@xyzenterprises.com',
    CustPhoneNo: '+1 555-789-0123',
    CustAddress: '321 Business Park, Austin, TX 78701',
    CustType: 'Business',
    CustStatus: 'Active',
    CustRemarks: 'Wholesale customer with volume discount',
    CustJoinDate: '2021-08-14',
  },
  {
    CustCode: 'C0005',
    CustName: 'Michael Brown',
    CustEmail: 'm.brown@example.com',
    CustPhoneNo: '+1 555-234-5678',
    CustAddress: '567 Pine St, Seattle, WA 98101',
    CustType: 'Individual',
    CustStatus: 'Active',
    CustRemarks: 'New customer - signed up last month',
    CustJoinDate: '2023-01-05',
  },
  {
    CustCode: 'C0006',
    CustName: 'Tech Solutions Ltd',
    CustEmail: 'support@techsolutions.com',
    CustPhoneNo: '+1 555-876-5432',
    CustAddress: '654 Tech Drive, Boston, MA 02108',
    CustType: 'Business',
    CustStatus: 'Active',
    CustRemarks: 'IT services company - corporate account',
    CustJoinDate: '2020-05-19',
  },
  {
    CustCode: 'C0007',
    CustName: 'Emily Wilson',
    CustEmail: 'emily.wilson@example.com',
    CustPhoneNo: '+1 555-345-6789',
    CustAddress: '987 Elm St, Los Angeles, CA 90001',
    CustType: 'Individual',
    CustStatus: 'Active',
    CustRemarks: 'Premium subscriber with annual plan',
    CustJoinDate: '2022-06-30',
  },
  {
    CustCode: 'C0008',
    CustName: 'Global Imports Inc',
    CustEmail: 'orders@globalimports.com',
    CustPhoneNo: '+1 555-765-4321',
    CustAddress: '159 Trade Center, Miami, FL 33101',
    CustType: 'Business',
    CustStatus: 'Active',
    CustRemarks: 'International shipping customer',
    CustJoinDate: '2019-12-10',
  },
  {
    CustCode: 'C0009',
    CustName: 'Robert Davis',
    CustEmail: 'robert.davis@example.com',
    CustPhoneNo: '+1 555-432-1098',
    CustAddress: '753 Cedar Rd, Denver, CO 80202',
    CustType: 'Individual',
    CustStatus: 'Inactive',
    CustRemarks: 'Account closed - moved overseas',
    CustJoinDate: '2021-04-17',
  },
  {
    CustCode: 'C0010',
    CustName: 'Quality Products Co',
    CustEmail: 'sales@qualityproducts.com',
    CustPhoneNo: '+1 555-901-2345',
    CustAddress: '286 Industrial Way, Phoenix, AZ 85001',
    CustType: 'Business',
    CustStatus: 'Active',
    CustRemarks: 'Manufacturer with bulk orders',
    CustJoinDate: '2022-09-08',
  },
];

function generateInitialRows(customers, searchTerm) {
  return customers
    .filter((customer) =>
      Object.values(customer).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((customer, index) => ({
      id: `${customer.CustCode}-${index}`,
      CustCode: customer.CustCode,
      CustName: customer.CustName,
      CustEmail: customer.CustEmail,
      CustPhoneNo: customer.CustPhoneNo,
      CustAddress: customer.CustAddress,
      CustType: customer.CustType,
      CustStatus: customer.CustStatus,
      CustRemarks: customer.CustRemarks,
      CustJoinDate: customer.CustJoinDate,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm, handleAddClick }) {
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
        <Button color="primary" variant="contained" onClick={handleAddClick} sx={{ marginLeft: 1 }}>
          Add Customer
        </Button>
      </Box>
    </Box>
  );
}

export default function CustomerCatalog() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = useMemo(() => generateInitialRows(customerData, searchTerm), [searchTerm]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleRowClick = useCallback((row) => {
    setSelectedRowData(row);
  }, []);

  const handleEditClick = useCallback((event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
  }, []);

  const handleCloseEntryForm = useCallback(() => {
    setIsEntryFormOpen(false);
    setSelectedRowData(null);
  }, []);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const handleAddClick = () => {
    const newCustomerCode = `C${String(customerData.length + 1).padStart(4, '0')}`;
    setSelectedRowData({ CustCode: newCustomerCode });
    setIsEntryFormOpen(true);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditToolbar
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        handleAddClick={handleAddClick}
      />
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table aria-label="customer catalogue table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                CODE
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                NAME
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                EMAIL
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                PHONE
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                ADDRESS
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                TYPE
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                STATUS
              </TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                REMARKS
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                JOIN DATE
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer, index) => (
                <TableRow
                  key={index}
                  className={classes.tableRow}
                  hover
                  onClick={() => handleRowClick(customer)}
                >
                  <TableCell align="center">{customer.CustCode}</TableCell>
                  <TableCell align="left">{customer.CustName}</TableCell>
                  <TableCell align="left">{customer.CustEmail}</TableCell>
                  <TableCell align="left">{customer.CustPhoneNo}</TableCell>
                  <TableCell align="left">{customer.CustAddress}</TableCell>
                  <TableCell align="center">{customer.CustType}</TableCell>
                  <TableCell align="center">{customer.CustStatus}</TableCell>
                  <TableCell align="left" className={classes.remarkCell}>
                    {customer.CustRemarks}
                  </TableCell>
                  <TableCell align="center">{customer.CustJoinDate}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(event) => handleEditClick(event, customer)}>
                      <EditIcon />
                    </IconButton>
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
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Customer Info">
        <CustomerEntryForm initialData={selectedRowData} />
      </DialogModal>
    </Paper>
  );
}