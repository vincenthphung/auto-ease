import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerCreateForm from './Inventory/ManufacturerForm';
import VehicleModelsList from "./Inventory/VehicleModelsList";
import ManufacturersList from './Inventory/ManufacturersList';
import MakeCar from './Inventory/MakeCar';
import AutomobileList from './Inventory/AutomobileList';
import AutomobileForm from './Inventory/AutomobileForm';

import AddPotentialCustomerForm from './Sales/PotentialCustomerForm';
import CreateSaleRecordForm from './Sales/SaleHistoryForm';
import ListSalesPage from './Sales/SalesListPage';
import AddSalesPersonForm from './Sales/SalesPersonForm';
import ListSalesHistoryPage from './Sales/SalesPersonHistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/new" element={<ManufacturerCreateForm />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/createmodels" element={<MakeCar />} />
          <Route path="/vehiclemodels" element={<VehicleModelsList />} />
          <Route path="/automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="/potentialcustomer/new" element={<AddPotentialCustomerForm />} />
          <Route path="/sales/new" element={<CreateSaleRecordForm />} />
          <Route path="/sales/list" element={<ListSalesPage />} />
          <Route path="/salesperson/new" element={<AddSalesPersonForm />} />
          <Route path="/saleshistory" element={<ListSalesHistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
