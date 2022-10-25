import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Inventory from './Inventory'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Inventory" element={<Inventory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
