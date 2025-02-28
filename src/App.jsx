import React from "react";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
import { CardProvider } from "./context/CardContext";
import PopUpCard from "./components/PopUpCard";

function App() {
  return (
    <MovieProvider>
      <CardProvider>
        <Router>
          <MainContent />
        </Router>
      </CardProvider>
    </MovieProvider>
  );
}

export default App;

const MainContent = () => {
  return (
    <>
      <Navbar />
      <PopUpCard isHovered={true} x={200} y={0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/myList" element={<MyList />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
