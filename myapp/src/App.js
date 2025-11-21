import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './login';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  
  );
}

export default App;