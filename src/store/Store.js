import { configureStore } from '@reduxjs/toolkit';
import reorderLevelReducer from 'src/store/systems/Report/recorderLevelSlice';
import messageReducer from './apps/message';
import AuthReducer from './auth/AuthSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import EmployeeReducer from './systems/emplopyee/EmployeeSlice';
import { default as MaterialCatalogueReducer, default as materialCatalogueReducer } from './systems/materialCatalogue/MaterialCatalogueSlice';
import MaterialDetailsReducer from './systems/materialCatalogue/MaterialDetailsSlice';
import ProjectMaterialCostReducer from './systems/materialManagement/ProjectMatCostSlice';
import BinCardReducer from './systems/materialManagement/binCardSlice';
import ProjectManagerReducer from './systems/projectManagement/ProjectManagerSlice';
import ProjectReducer from './systems/projectManagement/ProjectSlice';
import SupplierReducer from './systems/supplier/SupplierSlice';
import EcommerceReducer from './systems/warehouse/EcommerceSlice';

import StockBalanceTableReducer from './systems/materialManagement/StockBalanceTableSlice';
import StoresTransactionReducer from './systems/storesTransaction/StoresTransactionSlice';
import WarehouseManagementDetailsReducer from './systems/warehouse/WarehouseManagementDetailsSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    ecommerceReducer: EcommerceReducer,
    employeeReducer: EmployeeReducer,
    supplierReducer: SupplierReducer,
    projectReducer: ProjectReducer,
    materialCatalogueReducer: MaterialCatalogueReducer,
    materialDetailsReducer: MaterialDetailsReducer,
    projectManagerReducer: ProjectManagerReducer,
    projectMaterialCostReducer: ProjectMaterialCostReducer,
    binCardReducer: BinCardReducer,
    reorderLevel: reorderLevelReducer,
    materialCatalogue: materialCatalogueReducer,
    stockBalance: StockBalanceTableReducer,
    warehouseManagementDetails: WarehouseManagementDetailsReducer,
    storesTransactionReducer:StoresTransactionReducer,
    auth: AuthReducer,
    message: messageReducer,
  },
});

export default store;
