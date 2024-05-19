import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Home from './components/Home';
import Navbar from './components/Navbar';
import GoalPage from './components/GoalPage';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const authToken = cookie.authToken;

  return (
    <>
      {authToken && <Navbar />}
      
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/goals/:id' element={<GoalPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
