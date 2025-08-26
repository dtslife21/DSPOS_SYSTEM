import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StockBalanceTableService from 'src/store/service/StockBalanceTableService';


 const initialState = {
  stockBalances: [],
  status: 'idle',
  monthlySummaryData: [],
  error: null
};

export const GetStockBalanceDetails = createAsyncThunk(
  '/Admin/StockBlanceDetails/GetStockBalanceDetails',
  async ( _, { rejectWithValue }) => {
    try {
      const data = await StockBalanceTableService.GetStockBalanceDetails();
      return data;
    } catch (error) {
      console.error("Failed to fetch stock balance details:", error);
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

export const GetMonthlySummaryDetails = createAsyncThunk(
  '/Admin/StockBlanceDetails/GetStkBalSubGridDetails',
  async ({ sdate, edate }, { rejectWithValue }) => {
    try {
      const data = await StockBalanceTableService.GetMonthlySummaryDetails(sdate, edate);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);



const stockBalanceTableSlice = createSlice({
  name: 'stockBalance',
  initialState,
 
  extraReducers: {
    [GetStockBalanceDetails.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [GetStockBalanceDetails.fulfilled]: (state, action) => {
      state.stockBalances = action.payload;
    },
    [GetStockBalanceDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [GetMonthlySummaryDetails.fulfilled]: (state, action) => {
      state.monthlySummaryData = action.payload;
    },
    [GetMonthlySummaryDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },

  }
})
export default stockBalanceTableSlice.reducer;
