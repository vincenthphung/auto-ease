import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerCreateForm from "./inventory/ManufacturerForm.js"
import VehicleModelsList from "./inventory/VehicleModelsList.js";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
            <Route path="/inventory" element={<ManufacturerCreateForm />} />
              <Route path="/" element={<VehicleModelsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
