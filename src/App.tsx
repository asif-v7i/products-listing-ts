import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/products';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={ProductsPage} />
        </Routes>
    </Router>
  );
};

export default App;
