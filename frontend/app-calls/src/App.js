import './styles/index.css';
import {Routes, Route} from 'react-router-dom';
import Entrance from './components/Entrance';
import Layout from './components/Layout';
import Calendar from './components/Calendar';

function App() {
  return (
    <>
      <Routes>
        <Route path="entrance" element={<Entrance/>}/>
        <Route path="main" element={<Layout/>}>
          <Route path='calendar' element={<Calendar/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
