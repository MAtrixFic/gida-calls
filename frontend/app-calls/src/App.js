import React from 'react';
import './styles/index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Entrance from './components/Entrance';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import CalendarDay from './components/CalendarDay';
import Voting from './components/Voting';

function App() {
  return (
    <Routes>
      <Route path='/auth/log' element={<Entrance />} />
      <Route path="/main" element={<Layout />}>
        <Route path='calendar' element={<Calendar />} />
        <Route path='voting' element={<Voting />} />
        <Route path='calendar/date/:day/:month/:year' element={<CalendarDay />} />
      </Route>
      <Route path='*' element={<Navigate to='/main/calendar' replace={true} />} />
    </Routes>
  );
}

export default App;
