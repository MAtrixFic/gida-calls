import './styles/index.css';
import {Routes, Route} from 'react-router-dom';
import Entrance from './components/Entrance';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import CalendarDay from './components/CalendarDay';

function App() {
  return (
    <>
      <Routes>
        <Route path="entrance" element={<Entrance/>}/>
        <Route path="/" element={<Layout/>}>
          <Route path='calendar' element={<Calendar/>}/>
          <Route path='calendar/date/:day/:month/:year' element={<CalendarDay/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
