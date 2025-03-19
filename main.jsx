import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { First } from './First.jsx';
import { Second } from './Second.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/Second" element={<Second />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);