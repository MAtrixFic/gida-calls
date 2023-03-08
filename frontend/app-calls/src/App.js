import React from 'react';
import './styles/index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Entrance from './components/Entrance';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import CalendarDay from './components/CalendarDay';
import Voting from './components/Voting';
import ThemeMenu from './components/ThemeMenu';
import LessonsManager from './components/LessonsManager';
import WeekDaysList from './components/WeekDaysList';

function App() {
  return (
    <Routes>
      <Route path='/auth/log' element={<Entrance />} />
      <Route path="/main" element={<Layout />}>
        <Route path='menu' element={<ThemeMenu />} />
        <Route path=':theme/dynamic/calendar' element={<Calendar />} />
        <Route path=':theme/static/days' element={<WeekDaysList />} />
        <Route path='bells/:type/date/:day/:month/:year' element={<CalendarDay />} />
        <Route path='bells/:type/:weekday' element={<CalendarDay />} />
        <Route path='lessons/:type/date/:day/:month/:year' element={<LessonsManager />} />
        <Route path='lessons/:type/:weekday' element={<LessonsManager />} />
      </Route>
      <Route path='*' element={<Navigate to='/main/menu' replace={true} />} />
    </Routes>
  );
}

export default App;
