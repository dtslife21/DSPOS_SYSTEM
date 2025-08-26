import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WarehouseManagementDetailsService from 'src/store/service/WarehouseManagementDetailsService';
import { setMessage } from '../../apps/message';

const initialState = {
  warehouses: [],
  warehouseSave: '',
  error: '',
  loading: false,
};

export const GetWarehouseInfo = createAsyncThunk(
  'warehouseManagementDetails/GetWarehouseInfo',
  async (_, thunkAPI) => {
    try {
      const response = await WarehouseManagementDetailsService.GetWarehouseInfo(); 
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const SaveWHDetails = createAsyncThunk(
  'warehouseManagementDetails/SaveWHDetails',
  async (payload, thunkAPI) => {
    try {
      const response = await WarehouseManagementDetailsService.SaveWHDetails(payload);
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.statusCode + ' ' + response.result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }

      
      const isUpdate = !!payload.id;

      thunkAPI.dispatch(GetWarehouseInfo());

      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: isUpdate ? 'Warehouse Management Details Added Successfully' : 'Warehouse Management Details Updated Successfully',
          alertType: 'success',
        }),
      );
      
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

const WarehouseManagementDetailsSlice = createSlice({
  name: 'warehouseManagementDetails',
  initialState,
  reducers: {
    saveWarehouse(state, action) {
      state.warehouseSave = action.payload;
    },
  },
  extraReducers: {
    [GetWarehouseInfo.fulfilled]: (state, action) => {
      state.warehouses = action.payload;
    },
    [GetWarehouseInfo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [SaveWHDetails.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [SaveWHDetails.fulfilled]: (state, action) => {
      state.warehouseSave = action.payload;
      state.loading = false;
    },
    [SaveWHDetails.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { saveWarehouse } = WarehouseManagementDetailsSlice.actions;

export default WarehouseManagementDetailsSlice.reducer;
