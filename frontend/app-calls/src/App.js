import React, { useState, useEffect } from 'react';
import './styles/index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Entrance from './components/Entrance';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import CalendarDay from './components/CalendarDay';

function App() {
  return (
    <Routes>
      <Route path='/auth/log' element={<Entrance />} />
      <Route path="/calendar" element={<Layout />}>
        <Route index element={<Calendar />} />
        <Route path='date/:day/:month/:year' element={<CalendarDay />} />
      </Route>
      <Route path='*' element={<Navigate to='/calendar' replace={true} />} />
    </Routes>
  );
}

export default App;
