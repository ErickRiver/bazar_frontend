import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Productos from './pages/productos';
import Producto from './pages/producto';
import Sales from './pages/sales';
import './pages/styles.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Productos/>} />
        <Route path="/item/:id" element={<Producto />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
