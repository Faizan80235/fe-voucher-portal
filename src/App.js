import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routes/Routing';

export default function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}
