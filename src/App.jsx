import React from 'react';
import Home from './pages/Home';
import Watch from './pages/Watch';
import MyList from './pages/MyList';
import Search from './pages/Search';
import NotFound from './pages/NotFound'

import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch' element={<Watch />} />
        <Route path='/myList' element={<MyList />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
