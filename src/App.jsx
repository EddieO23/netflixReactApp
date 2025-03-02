import React from "react";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider, useMovieContext } from "./context/MovieContext";
import { CardProvider, useCardContext } from "./context/CardContext";
import PopUpCard from "./components/PopUpCard";
import { UtilsProvider } from "./context/UtilsContext";
import Modal from "./components/Modal";

function App() {
  return (
    <MovieProvider>
      <CardProvider>
        <UtilsProvider>
          <Router>
            <MainContent />
          </Router>
        </UtilsProvider>
      </CardProvider>
    </MovieProvider>
  );
}

export default App;

const MainContent = () => {
  const { cardState } = useCardContext();
  const {selectedMovie} = useMovieContext()
  return (
    <>
      <Navbar />
      <PopUpCard
        isHovered={cardState.isHovered}
        x={cardState.position?.x || 0}
        y={cardState.position?.y || 0}
      />
      {selectedMovie && <Modal isOpen={true} onClose={()=>{}} movieData={selectedMovie}/>}
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
