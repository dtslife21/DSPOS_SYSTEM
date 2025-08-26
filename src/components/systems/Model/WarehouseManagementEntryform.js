import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetWarehouseInfo, SaveWHDetails } from 'src/store/systems/warehouse/WarehouseManagementDetailsSlice';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

const statusOptions = [
  { value: "A", label: 'ACTIVE' },
  { value: "I", label: 'INACTIVE' },
];

const WarehouseEntryForm = ({ initialData, handleCloseEntryForm }) => {
  const dispatch = useDispatch();
  const { warehouses, loading, error } = useSelector(state => state.warehouseManagementDetails);

  useEffect(() => {
    dispatch(GetWarehouseInfo());
  }, [dispatch]);

  const validationSchema = yup.object({
    WarehouseCode: yup.string().matches(/^[A-Z]{3}$/, 'Warehouse Code must be exactly 3 capital letters').required('Warehouse Code is required'),
    WarehouseName: yup.string().required('Warehouse Name is required'),
    Status: yup.string().required('Status is required'),
    EntryStartDate: yup.date().nullable(),
    EntryEndDate: yup.date().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      WarehouseCode: initialData?.WarehouseCode || '' ,
      WarehouseName: initialData?.WarehouseName || '',
      Status: initialData?.Status || '',
      EntryStartDate: initialData?.EntryStartDate || '',
      EntryEndDate: initialData?.EntryEndDate || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          LocCode: values.WarehouseCode,
          LocName: values.WarehouseName,
          Status: values.Status,
          EntrySDate: values.EntryStartDate || null,
          EntryEDate: values.EntryEndDate || null,
        };

        await dispatch(SaveWHDetails(payload));
        dispatch(GetWarehouseInfo());
        handleCloseEntryForm();
        formik.resetForm({
          values: {
            WarehouseCode: '' ,
            WarehouseName: '',
            Status: '',
            EntryStartDate: '',
            EntryEndDate: '',
          },
        });
      } catch (error) {
        console.error('Failed to save warehouse details', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    },
  });

  const handleClear = () => {
    formik.resetForm({
      values: {
        WarehouseCode: '' ,
        WarehouseName: '',
        Status: '',
        EntryStartDate: '',
        EntryEndDate: '',
      },
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="WarehouseCode" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Warehouse Code</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="WarehouseCode"
                name="WarehouseCode"
                placeholder="Warehouse Code"
                fullWidth
                value={formik.values.WarehouseCode}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (/^[A-Z]{0,3}$/.test(value)) {
                    formik.setFieldValue('WarehouseCode', value);
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.WarehouseCode && Boolean(formik.errors.WarehouseCode)}
                InputProps={{ readOnly: initialData ? true : false }}
              />
              {formik.touched.WarehouseCode && formik.errors.WarehouseCode && (
                <Typography color="error">{formik.errors.WarehouseCode}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="WarehouseName" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Warehouse Name</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="WarehouseName"
                name="WarehouseName"
                placeholder="Warehouse Name"
                fullWidth
                value={formik.values.WarehouseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.WarehouseName && Boolean(formik.errors.WarehouseName)}
              />
              {formik.touched.WarehouseName && formik.errors.WarehouseName && (
                <Typography color="error">{formik.errors.WarehouseName}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Status" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Status</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Select
                id="Status"
                name="Status"
                value={formik.values.Status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Status && Boolean(formik.errors.Status)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select Status</MenuItem>
                {statusOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              {formik.touched.Status && formik.errors.Status && (
                <Typography color="error">{formik.errors.Status}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="EntryStartDate" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Entry Start Date</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="EntryStartDate"
                name="EntryStartDate"
                type="date"
                fullWidth
                value={formik.values.EntryStartDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.EntryStartDate && Boolean(formik.errors.EntryStartDate)}
                InputLabelProps={{ shrink: true }}
              />
              {formik.touched.EntryStartDate && formik.errors.EntryStartDate && (
                <Typography color="error">{formik.errors.EntryStartDate}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="EntryEndDate" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Entry End Date</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="EntryEndDate"
                name="EntryEndDate"
                type="date"
                fullWidth
                value={formik.values.EntryEndDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.EntryEndDate && Boolean(formik.errors.EntryEndDate)}
                InputLabelProps={{ shrink: true }}
              />
              {formik.touched.EntryEndDate && formik.errors.EntryEndDate && (
                <Typography color="error">{formik.errors.EntryEndDate}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="right" sx={{ mt: 3 }}>
        <Button variant="contained" color="error" startIcon={<ClearAllSharpIcon />} onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit" variant="contained" color="primary" startIcon={<SaveAsIcon />}>
          {initialData ? 'Update' : 'Save'}
        </Button>
      </Stack>
    </form>
  );
};

export default WarehouseEntryForm;
