import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import Orders from './pages/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import ListFood from './pages/ListFoods/ListFood';
 import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [sidebarVisable, setSidebarVisable]=useState(true);

  const toggleSidebar =()=>{
    setSidebarVisable(!sidebarVisable);
  }
  return (
    <div className="d-flex" id="wrapper">
           
           <Sidebar sidebarVisable={sidebarVisable}/>
           
            <div id="page-content-wrapper">

              <Menubar toggleSidebar={toggleSidebar}/>
              <ToastContainer/>
               
                <div className="container-fluid">
                    <Routes>
                      <Route path='/add' element={<AddFood />} />
                      <Route path='/list' element={<ListFood />} />
                      <Route path='/orders' element={<Orders />} />
                      <Route path='/' element={<ListFood />} />
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App;
