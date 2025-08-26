import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from 'src/components/shared/Dialog';
import { GetWarehouseInfo } from 'src/store/systems/warehouse/WarehouseManagementDetailsSlice';
import MaterialEntryForm from '../Model/WarehouseManagementEntryform';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
    width: 210,
  },
  searchInput: {
    width: '220px',
    marginLeft: '10px',
  },
});

function generateInitialRows(warehouses, searchTerm) {
  return warehouses
    .filter(warehouse =>
      Object.values(warehouse).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((warehouse, index) => ({
      id: `${warehouse.LocCode}-${index}`,
      WarehouseCode: warehouse.LocCode,
      WarehouseName: warehouse.LocName,
      Status: warehouse.Status,
      EntryStartDate: warehouse.EntrySDate,
      EntryEndDate: warehouse.EntryEDate,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm, handleAddClick }) {
  const classes = useStyles();

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
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
        sx={{ marginLeft: 2 }}
      >
        Add New
      </Button>
    </Box>
  );
}

export default function WarehouseManagementTable() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const warehouses = useSelector(state => state.warehouseManagementDetails.warehouses);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetWarehouseInfo());
  }, [dispatch]);

  const rows = useMemo(() => generateInitialRows(warehouses, searchTerm), [warehouses, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
  };

  const handleEditClick = (event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedRowData(null);
    setIsEntryFormOpen(true);
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
      <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} handleAddClick={handleAddClick} />
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Warehouse Info">
      <MaterialEntryForm initialData={selectedRowData} />
      </DialogModal>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table aria-label="warehouse management table" stickyHeader  size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>WAREHOUSE CODE</TableCell>
              <TableCell align="left" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>WAREHOUSE NAME</TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>STATUS</TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>DATA ENTRY START DATE</TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>DATA ENTRY END DATE</TableCell>
              <TableCell align="center" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover className={classes.tableRow} onClick={() => handleRowClick(row)}>
                <TableCell align="center">{row.WarehouseCode}</TableCell>
                <TableCell align="left">{row.WarehouseName}</TableCell>
                <TableCell align="center">{row.Status}</TableCell>
                <TableCell align="center">{row.EntryStartDate}</TableCell>
                <TableCell align="center">{row.EntryEndDate}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => handleEditClick(event, row)}>
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
    </Paper>
  );
}
