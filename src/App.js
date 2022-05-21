import { Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login'


export default function App() {

  return (
    <div className='App'>
      {/* 
      <Link to="/">New Page</Link>
       */}
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </div>
  );
}
