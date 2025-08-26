import { makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon, Search as SearchIcon, Visibility as ViewIcon, Key as PasswordIcon } from '@mui/icons-material';
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
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import DialogModal from 'src/components/shared/Dialog';
import UserAccessEntryForm from '../Model/UserAccessEntryForm';

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
  roleCell: {
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  activeChip: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  inactiveChip: {
    backgroundColor: '#f44336',
    color: 'white',
  },
});

// Hardcoded user access data
const userAccessData = [
  {
    UserId: 'USR0001',
    Username: 'john.smith',
    FullName: 'John Smith',
    Email: 'john.smith@example.com',
    // Department: 'Sales',
    Role: 'Administrator',
    AccessLevel: 'Admin',
    LastLogin: '2023-05-15 09:23:45',
    Status: 'Active',
    IsLocked: false,
    Permissions: 'View, Edit, Delete',
  },
  {
    UserId: 'USR0002',
    Username: 'sarah.jones',
    FullName: 'Sarah Jones',
    Email: 'sarah.jones@example.com',
    // Department: 'HR',
    Role: 'Cashier',
    AccessLevel: 'Moderator',
    LastLogin: '2023-05-18 14:12:33',
    Status: 'Active',
    IsLocked: false,
    Permissions: 'View, Edit',
  },
  {
    UserId: 'USR0003',
    Username: 'mike.brown',
    FullName: 'Michael Brown',
    Email: 'mike.brown@example.com',
    // Department: 'IT',
    Role: 'Supervisor',
    AccessLevel: 'Super Admin',
    LastLogin: '2023-05-20 11:45:22',
    Status: 'Active',
    IsLocked: false,
    Permissions: 'Full Access',
  },
  
];

function generateInitialRows(users, searchTerm) {
  return users
    .filter((user) =>
      Object.values(user).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((user, index) => ({
      id: `${user.UserId}-${index}`,
      UserId: user.UserId,
      Username: user.Username,
      FullName: user.FullName,
      Email: user.Email,
      Department: user.Department,
      Role: user.Role,
      AccessLevel: user.AccessLevel,
      LastLogin: user.LastLogin,
      Status: user.Status,
      IsLocked: user.IsLocked,
      Permissions: user.Permissions,
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
      <Box sx={{ flexGrow: 1, textAlign: 'left', fontSize: '1.2rem', fontWeight: 'bold' }}>
        User Access Management
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search users..."
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
          Add User
        </Button>
      </Box>
    </Box>
  );
}

export default function UserAccessCatalog() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState(userAccessData);

  const rows = useMemo(() => generateInitialRows(users, searchTerm), [users, searchTerm]);

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

  const handleViewClick = useCallback((event, row) => {
    event.stopPropagation();
    setSelectedRowData({...row, viewMode: true});
    setIsEntryFormOpen(true);
  }, []);

  const handlePasswordReset = useCallback((event, row) => {
    event.stopPropagation();
    // In a real application, this would trigger a password reset process
    alert(`Password reset initiated for user: ${row.Username}`);
  }, []);

  const handleToggleLock = useCallback((event, userId) => {
    event.stopPropagation();
    setUsers(users.map(user => 
      user.UserId === userId 
        ? { ...user, IsLocked: !user.IsLocked, Status: user.Status === 'Active' ? 'Inactive' : 'Active' } 
        : user
    ));
  }, [users]);

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
    const newUserId = `USR${String(users.length + 1).padStart(4, '0')}`;
    setSelectedRowData({ UserId: newUserId });
    setIsEntryFormOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (userData.UserId) {
      // Update existing user
      setUsers(users.map(user => 
        user.UserId === userData.UserId ? userData : user
      ));
    } else {
      // Add new user
      const newUserId = `USR${String(users.length + 1).padStart(4, '0')}`;
      setUsers([...users, {...userData, UserId: newUserId}]);
    }
    setIsEntryFormOpen(false);
    setSelectedRowData(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '16px' }}>
      <EditToolbar
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        handleAddClick={handleAddClick}
      />
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table aria-label="user access catalogue table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                USER ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                USERNAME
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                FULL NAME
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                EMAIL
              </TableCell>
              {/* <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                DEPARTMENT
              </TableCell> */}
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                ROLE
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                ACCESS LEVEL
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                STATUS
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                LOCKED
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                LAST LOGIN
              </TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow
                  key={index}
                  className={classes.tableRow}
                  hover
                  onClick={() => handleRowClick(user)}
                >
                  <TableCell align="center">{user.UserId}</TableCell>
                  <TableCell align="left">{user.Username}</TableCell>
                  <TableCell align="left">{user.FullName}</TableCell>
                  <TableCell align="left">{user.Email}</TableCell>
                  <TableCell align="center">{user.Department}</TableCell>
                  <TableCell align="center" className={classes.roleCell}>
                    {user.Role}
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={user.AccessLevel} 
                      size="small" 
                      color={
                        user.AccessLevel === 'Super Admin' ? 'error' : 
                        user.AccessLevel === 'Admin' ? 'primary' : 
                        user.AccessLevel === 'Moderator' ? 'secondary' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={user.Status} 
                      size="small" 
                      className={user.Status === 'Active' ? classes.activeChip : classes.inactiveChip}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.IsLocked}
                          onChange={(e) => handleToggleLock(e, user.UserId)}
                          color="primary"
                          size="small"
                        />
                      }
                      label={user.IsLocked ? "Yes" : "No"}
                    />
                  </TableCell>
                  <TableCell align="center">{user.LastLogin}</TableCell>
                  <TableCell align="center" sx={{ minWidth: '140px' }}>
                    <IconButton onClick={(event) => handleViewClick(event, user)} title="View User">
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={(event) => handleEditClick(event, user)} title="Edit User">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={(event) => handlePasswordReset(event, user)} title="Reset Password">
                      <PasswordIcon fontSize="small" />
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
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle={selectedRowData?.viewMode ? "View User" : (selectedRowData?.UserId ? "Edit User" : "Add New User")}>
        <UserAccessEntryForm 
          initialData={selectedRowData} 
          onSave={handleSaveUser} 
          onCancel={handleCloseEntryForm}
          viewMode={selectedRowData?.viewMode}
        />
      </DialogModal>
    </Paper>
  );
}