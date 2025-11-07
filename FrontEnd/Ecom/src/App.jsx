import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Cart from './Component/Cart';
import Products from './Component/Products';


function App() {


  return (
    <BrowserRouter>
    
       <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Products/>}
        />

        <Route
          path="/Items/qty/total"
          element= {<Cart/>}
        />

       
        <Route
          path="/Products"
          element={<Products/>}
        />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
