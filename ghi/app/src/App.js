import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerCreateForm from './Inventory/ManufacturerForm';
import VehicleModelsList from "./Inventory/VehicleModelsList";
import ManufacturersList from './Inventory/ManufacturersList';
import MakeCar from './Inventory/MakeCar';
import AutomobileList from './Inventory/AutomobileList';
import AutomobileForm from './Inventory/AutomobileForm';

import TechnicianCreate from './Services/TechnicianCreate';
import TechnicianList from './Services/TechnicianList';
import ServiceList from './Services/ServiceList';
import ServiceCreate from './Services/ServiceCreate';
import SearchHistory from './Services/SearchHistory';

import AddPotentialCustomerForm from './Sales/PotentialCustomerForm';
import CreateSaleRecordForm from './Sales/SaleHistoryForm';
import ListSalesPage from './Sales/SalesListPage';
import AddSalesPersonForm from './Sales/SalesPersonForm';
import ListSalesHistoryPage from './Sales/SalesPersonHistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/new" element={<TechnicianCreate />} />
          <Route path="technicians/" element={<TechnicianList />} />

          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="new/" element={<ManufacturerCreateForm />} />
          </Route>

          <Route path="models">
            <Route path="" element={<VehicleModelsList />} />
            <Route path="new/" element={<MakeCar />} />
          </Route>

          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="new/" element={<AutomobileForm />} />
          </Route>

          <Route path="appointments">
            <Route path='' element={<ServiceList />} />
            <Route path="new/" element={<ServiceCreate />} />
            <Route path="history/" element={<SearchHistory />} />
          </Route>


          <Route
            path="/customers/new"
            element={<AddPotentialCustomerForm />}
          />
          <Route path="/sales/new" element={<CreateSaleRecordForm />} />
          <Route path="/sales/list" element={<ListSalesPage />} />
          <Route path="/salesperson/new" element={<AddSalesPersonForm />} />
          <Route path="/sales/history" element={<ListSalesHistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
