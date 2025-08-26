import axios from 'axios';

const GetWarehouseInfo = async () => {
  try {
    const response = await axios.get(`/Admin/Warehouse/GetWarehouseInfo`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const SaveWHDetails = async (entryData) => {
  try {
    const response = await axios.post('/Admin/MaterialCatalogue/SaveWHDetails', entryData); 
    return response.data; 
  } catch (error) {
    throw error;
  }
};



const WarehouseManagementDetailsService = {
  GetWarehouseInfo,
  SaveWHDetails
};

export default WarehouseManagementDetailsService;