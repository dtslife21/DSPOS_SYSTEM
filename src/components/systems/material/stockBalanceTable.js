import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMonthlySummaryDetails, GetStockBalanceDetails } from 'src/store/systems/materialManagement/StockBalanceTableSlice';
import * as XLSX from 'xlsx';
import { useTheme } from '@mui/material/styles';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  matDesRow: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  matDesCell: {
    fontWeight: 'bold',
  },
  footer: {
    fontWeight: 'bold',
    backgroundColor: '#ECECEC',
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
  },
});

function generateInitialRows(stockBalances, searchTerm) {
  return stockBalances
    .filter((stockBalance) =>
      Object.values(stockBalance).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((stockBalance, index) => ({
      id: `${stockBalance.MatCode}-${index}`,
      LocCode: stockBalance.LocCode,
      MatCode: stockBalance.MatCode,
      BalQty: stockBalance.BalQty,
      BalValue: stockBalance.BalValue,
      AvgPrice: stockBalance.AvgPrice,
      Category: stockBalance.Category,
      MatDesc: stockBalance.MatDesc,
      MatUnit: stockBalance.MatUnit,
    }));
}

function groupRowsByMatDes(rows) {
  const groupedRows = {};
  rows.forEach((row) => {
    if (!groupedRows[row.MatDesc]) {
      groupedRows[row.MatDesc] = [];
    }
    groupedRows[row.MatDesc].push(row);
  });
  return groupedRows;
}

function calculateTotals(rows) {
  let totalQty = 0;
  let totalValue = 0;

  rows.forEach(row => {
    totalQty += parseFloat(row.BalQty || 0);
    totalValue += parseFloat(row.BalValue || 0);
  });

  return { totalQty, totalValue };
}

function calculateMonthlySummaryTotals(monthlySummaryData) {
  let totalOpBal = 0;
  let totalRecQty = 0;
  let totalIssuQty = 0;
  let totalBalQty = 0;

  monthlySummaryData.forEach(row => {
    totalOpBal += parseFloat(row.OpBal || 0);
    totalRecQty += parseFloat(row.RecQty || 0);
    totalIssuQty += parseFloat(row.IssuQty || 0);
    totalBalQty += parseFloat(row.BalQty || 0);
  });

  return { totalOpBal, totalRecQty, totalIssuQty, totalBalQty };
}

function StockBalance() {
  const classes = useRowStyles();
  const dispatch = useDispatch();
  const { stockBalances, monthlySummaryData } = useSelector((state) => state.stockBalance);
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showMonthlySummary, setShowMonthlySummary] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const theme = useTheme();

  const headerCellStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  };

  useEffect(() => {
    dispatch(GetStockBalanceDetails());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(stockBalances)) {
      const initialRows = generateInitialRows(stockBalances, searchTerm);
      setRows(initialRows);
    }
  }, [stockBalances, searchTerm]);

  useEffect(() => {
    if (showMonthlySummary) {
      dispatch(GetMonthlySummaryDetails({ sdate: startDate.toISOString().split('T')[0], edate: endDate.toISOString().split('T')[0] }));
    }
  }, [showMonthlySummary, startDate, endDate, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMonthlySummaryClick = () => {
    setShowMonthlySummary(true);
  };

  const handleCloseDialog = () => {
    setShowMonthlySummary(false);
  };

  const handleLoadSummary = () => {
    dispatch(GetMonthlySummaryDetails({
      sdate: startDate.toISOString().split('T')[0],
      edate: endDate.toISOString().split('T')[0]
    }));
  };

  const exportMonthlySummaryToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(monthlySummaryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Monthly Summary');
    XLSX.writeFile(workbook, 'MonthlySummary.xlsx');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Balance');
    XLSX.writeFile(workbook, 'StockBalance.xlsx');
  };

  const groupedRows = groupRowsByMatDes(rows);
  const totals = calculateTotals(rows);
  const monthlySummaryTotals = calculateMonthlySummaryTotals(monthlySummaryData);



  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar>
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
      </Toolbar>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table aria-label="collapsible table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={headerCellStyle}>WAREHOUSE</TableCell>
              <TableCell align="center" sx={headerCellStyle}>MATERIAL CODE</TableCell>
              <TableCell align="left" sx={headerCellStyle}>MATERIAL DESCRIPTION</TableCell>
              <TableCell align="center" sx={headerCellStyle}>CATEGORY</TableCell>
              <TableCell align="center" sx={headerCellStyle}>UOM</TableCell>
              <TableCell align="right" sx={headerCellStyle}>AVG RATE</TableCell>
              <TableCell align="right" sx={headerCellStyle}>BALANCE QUANTITY</TableCell>
              <TableCell align="right" sx={headerCellStyle}>BALANCE VALUE</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(groupedRows)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((matDesc, index) => (
                <React.Fragment key={index}>
                  <TableRow className={classes.matDesRow} />
                  {groupedRows[matDesc].map((row, rowIndex) => (
                    <TableRow key={rowIndex} className={classes.root}>
                      <TableCell align="center">{row.LocCode}</TableCell>
                      <TableCell align="center">{row.MatCode}</TableCell>
                      <TableCell align="left">{row.MatDesc}</TableCell>
                      <TableCell align="center">{row.Category}</TableCell>
                      <TableCell align="center">{row.MatUnit}</TableCell>
                      <TableCell align="right">{row.AvgPrice}</TableCell>
                      <TableCell align="right">{row.BalQty}</TableCell>
                      <TableCell align="right">{row.BalValue}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}

            <TableRow className={classes.footer}  >
              <TableCell colSpan={6} align="right" sx={headerCellStyle}>
                BALANCE
              </TableCell>
              <TableCell align="right"sx={headerCellStyle}>{totals.totalQty.toFixed(2)}</TableCell>
              <TableCell align="right"sx={headerCellStyle}>{totals.totalValue.toFixed(2)}</TableCell>
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
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleMonthlySummaryClick}>
            Monthly Summary
          </Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={exportToExcel}>
            Excel
          </Button>
        </Box>
      </Toolbar>

      <Dialog open={showMonthlySummary} onClose={handleCloseDialog} maxWidth={false}
        fullWidth
        sx={{
          '& .MuiDialog-container': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiPaper-root': {
            width: '90%',
            maxWidth: '1200px',
          },
        }}
      >
        <DialogTitle>Monthly Summary</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ marginRight: '8px' }}>
                  START DATE
                </Typography>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ marginRight: '8px' }}>
                  END DATE
                </Typography>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>

              <Button variant="contained" onClick={handleLoadSummary}>
                Load
              </Button>
            </div>
          </LocalizationProvider>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table aria-label="Monthly Summary Table" stickyHeader size="small" >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>MATERIAL CODE</TableCell>
                  <TableCell align="left" sx={{ backgroundColor: '#ECECEC' }}>MATERIAL DESCRIPTION</TableCell>
                  <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>MATERIAL SPECIFICATION</TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>UOM</TableCell>
                  <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>OPENING BALANCE</TableCell>
                  <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>RECEIVED QTY</TableCell>
                  <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>ISSUED QTY </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>BALANCE QTY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthlySummaryData.map((summary, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{summary.MatCode}</TableCell>
                    <TableCell align="left">{summary.MatDesc}</TableCell>
                    <TableCell align="right">{summary.MatSpec}</TableCell>
                    <TableCell align="center">{summary.MatUnit}</TableCell>
                    <TableCell align="right">{summary.OpBal}</TableCell>
                    <TableCell align="right">{summary.RecQty}</TableCell>
                    <TableCell align="right">{summary.IssuQty}</TableCell>
                    <TableCell align="right">{summary.BalQty}</TableCell>
                  </TableRow>
                ))}
                <TableRow className={classes.footer}>
                  <TableCell colSpan={4} align="right">
                    TOTAL
                  </TableCell>
                  <TableCell align="right">{monthlySummaryTotals.totalOpBal.toFixed(2)}</TableCell>
                  <TableCell align="right">{monthlySummaryTotals.totalRecQty.toFixed(2)}</TableCell>
                  <TableCell align="right">{monthlySummaryTotals.totalIssuQty.toFixed(2)}</TableCell>
                  <TableCell align="right">{monthlySummaryTotals.totalBalQty.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={exportMonthlySummaryToExcel}>
            Excel Export
          </Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default StockBalance;
