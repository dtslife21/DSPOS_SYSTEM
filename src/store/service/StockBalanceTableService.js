
import axios from 'axios';

const GetStockBalanceDetails = async () => {
  try {
    const response = await axios.get(`/Admin/StockBlanceDetails/GetStockBalanceDetails`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};
const GetMonthlySummaryDetails = async (sdate, edate) => {
  try {
    const response = await axios.get(`/Admin/StockBlanceDetails/GetStkBalSubGridDetails`, {
      params: { sdate, edate },
    });
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};
const StockBalanceTableService = {
  GetStockBalanceDetails,
  GetMonthlySummaryDetails,
};


export default StockBalanceTableService;