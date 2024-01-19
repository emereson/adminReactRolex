import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtecteRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import { useState } from 'react';
import Header from './pages/Header';
import Sections from './pages/Sections';
import Users from './pages/Users';
import OneSection from './pages/OneSection';

function App() {
  return (
    <div className="app_container">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Sections />} />
          <Route path="/users" element={<Users />} />
          <Route path="/section/:id" element={<OneSection />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
