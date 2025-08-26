import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReorderLevelDetails } from 'src/store/systems/Report/recorderLevelSlice';
import EditToolbar from 'src/views/systems/report/EditToolbar';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  categoryRow: {
    backgroundColor: '#f5f5f5',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  header: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caption: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
});

// Fake data for reorder levels
const fakeReorderLevels = [
  {
    category: 'CONSTRUCTION MATERIALS',
    warehouse: 'Main Warehouse',
    materialCode: 'MAT-001',
    materialDescription: 'Steel Beams',
    uom: 'PCS',
    avgRate: 500,
    reorderLevel: 20,
    balanceQuantity: 15,
    balanceValue: 7500
  },
  {
    category: 'CONSTRUCTION MATERIALS',
    warehouse: 'Main Warehouse',
    materialCode: 'MAT-002',
    materialDescription: 'Concrete Blocks',
    uom: 'PCS',
    avgRate: 50,
    reorderLevel: 100,
    balanceQuantity: 85,
    balanceValue: 4250
  },
  {
    category: 'CONSTRUCTION MATERIALS',
    warehouse: 'East Warehouse',
    materialCode: 'MAT-003',
    materialDescription: 'Cement Bags',
    uom: 'BAG',
    avgRate: 60,
    reorderLevel: 50,
    balanceQuantity: 45,
    balanceValue: 2700
  },
  {
    category: 'ELECTRICAL',
    warehouse: 'Main Warehouse',
    materialCode: 'ELEC-001',
    materialDescription: 'Electrical Wiring',
    uom: 'M',
    avgRate: 15,
    reorderLevel: 200,
    balanceQuantity: 180,
    balanceValue: 2700
  },
  {
    category: 'ELECTRICAL',
    warehouse: 'Main Warehouse',
    materialCode: 'ELEC-002',
    materialDescription: 'Circuit Breakers',
    uom: 'PCS',
    avgRate: 250,
    reorderLevel: 10,
    balanceQuantity: 8,
    balanceValue: 2000
  },
  {
    category: 'ELECTRICAL',
    warehouse: 'West Warehouse',
    materialCode: 'ELEC-003',
    materialDescription: 'Switches & Sockets',
    uom: 'PCS',
    avgRate: 80,
    reorderLevel: 25,
    balanceQuantity: 22,
    balanceValue: 1760
  },
  {
    category: 'PLUMBING',
    warehouse: 'Main Warehouse',
    materialCode: 'PLUM-001',
    materialDescription: 'PVC Pipes',
    uom: 'M',
    avgRate: 30,
    reorderLevel: 100,
    balanceQuantity: 95,
    balanceValue: 2850
  },
  {
    category: 'PLUMBING',
    warehouse: 'North Warehouse',
    materialCode: 'PLUM-002',
    materialDescription: 'Water Taps',
    uom: 'PCS',
    avgRate: 120,
    reorderLevel: 15,
    balanceQuantity: 12,
    balanceValue: 1440
  },
  {
    category: 'PLUMBING',
    warehouse: 'Main Warehouse',
    materialCode: 'PLUM-003',
    materialDescription: 'Valves',
    uom: 'PCS',
    avgRate: 85,
    reorderLevel: 20,
    balanceQuantity: 18,
    balanceValue: 1530
  },
  {
    category: 'SAFETY EQUIPMENT',
    warehouse: 'Main Warehouse',
    materialCode: 'SAFE-001',
    materialDescription: 'Safety Helmets',
    uom: 'PCS',
    avgRate: 50,
    reorderLevel: 30,
    balanceQuantity: 25,
    balanceValue: 1250
  },
  {
    category: 'SAFETY EQUIPMENT',
    warehouse: 'South Warehouse',
    materialCode: 'SAFE-002',
    materialDescription: 'Safety Gloves',
    uom: 'PCS',
    avgRate: 15,
    reorderLevel: 50,
    balanceQuantity: 40,
    balanceValue: 600
  },
  {
    category: 'SAFETY EQUIPMENT',
    warehouse: 'Main Warehouse',
    materialCode: 'SAFE-003',
    materialDescription: 'Safety Goggles',
    uom: 'PCS',
    avgRate: 25,
    reorderLevel: 20,
    balanceQuantity: 15,
    balanceValue: 375
  },
  {
    category: 'OFFICE SUPPLIES',
    warehouse: 'Main Warehouse',
    materialCode: 'OFF-001',
    materialDescription: 'Office Chairs',
    uom: 'PCS',
    avgRate: 300,
    reorderLevel: 5,
    balanceQuantity: 3,
    balanceValue: 900
  },
  {
    category: 'OFFICE SUPPLIES',
    warehouse: 'Main Warehouse',
    materialCode: 'OFF-002',
    materialDescription: 'Desks',
    uom: 'PCS',
    avgRate: 500,
    reorderLevel: 3,
    balanceQuantity: 2,
    balanceValue: 1000
  },
  {
    category: 'OFFICE SUPPLIES',
    warehouse: 'East Warehouse',
    materialCode: 'OFF-003',
    materialDescription: 'Filing Cabinets',
    uom: 'PCS',
    avgRate: 400,
    reorderLevel: 4,
    balanceQuantity: 3,
    balanceValue: 1200
  }
];

function generateInitialRows(reorderLevels, searchTerm) {
  return reorderLevels
    .filter((level) =>
      Object.values(level).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((level, index) => ({
      id: `${level.materialCode}-${index}`,
      category: level.category,
      warehouse: level.warehouse,
      materialCode: level.materialCode,
      materialDescription: level.materialDescription,
      uom: level.uom,
      avgRate: level.avgRate,
      reorderLevel: level.reorderLevel,
      balanceQuantity: level.balanceQuantity,
      balanceValue: level.balanceValue,
    }));
}

function groupRowsByCategory(rows) {
  const groupedRows = {};
  rows.forEach(row => {
    if (!groupedRows[row.category]) {
      groupedRows[row.category] = [];
    }
    groupedRows[row.category].push(row);
  });
  return groupedRows;
}

function RecorderLevelTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { reorderLevels } = useSelector((state) => state.reorderLevel);
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Use fake data instead of API call for demonstration
    // dispatch(GetReorderLevelDetails());
  }, [dispatch]);

  useEffect(() => {
    // Use fake data instead of Redux store data
    const initialRows = generateInitialRows(fakeReorderLevels, searchTerm);
    setRows(initialRows);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const groupedRows = groupRowsByCategory(rows);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div className={classes.header}>
        <Typography className={classes.caption} variant="h4" component="div">Reorder Level Reach Details</Typography>
        <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      </div>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table aria-label="collapsible table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>CATEGORY</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>WAREHOUSE</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>MATERIAL CODE</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>MATERIAL DESCRIPTION</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>UOM</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>AVG RATE</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>REORDER LEVEL</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>BALANCE QUANTITY</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>BALANCE VALUE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedRows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
              <React.Fragment key={index}>
                <TableRow className={classes.categoryRow}>
                  <TableCell colSpan={9} align="left">
                    {category}
                  </TableCell>
                </TableRow>
                {groupedRows[category].map((row, rowIndex) => (
                  <TableRow key={rowIndex} className={classes.root} hover>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.warehouse}</TableCell>
                    <TableCell align="center">{row.materialCode}</TableCell>
                    <TableCell align="center">{row.materialDescription}</TableCell>
                    <TableCell align="center">{row.uom}</TableCell>
                    <TableCell align="right">{row.avgRate.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.reorderLevel}</TableCell>
                    <TableCell align="right">{row.balanceQuantity}</TableCell>
                    <TableCell align="right">{row.balanceValue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={Object.keys(groupedRows).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default RecorderLevelTable;