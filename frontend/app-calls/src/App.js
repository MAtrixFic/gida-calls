import React from 'react';
import './styles/index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Entrance from './components/Entrance';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import CalendarDay from './components/CalendarDay';
import Voting from './components/Voting';
import CalendarMenu from './components/CalendarMenu';
import LessonsManager from './components/LessonsManager';

function App() {
  return (
    <Routes>
      <Route path='/auth/log' element={<Entrance />} />
      <Route path="/main" element={<Layout />}>
        <Route path='calendar' element={<Calendar />} />
        <Route path='voting' element={<Voting />} />
        <Route path='calendar/menu/:day/:month/:year' element={<CalendarMenu />} />
        <Route path='/main/calendar/bells/dynamic/:day/:month/:year' element={<CalendarDay />} />
        <Route path='/main/calendar/lessons/static/:day/:month/:year' element={<LessonsManager />} />
      </Route>
      <Route path='*' element={<Navigate to='/main/calendar' replace={true} />} />
    </Routes>
  );
}

export default App;
