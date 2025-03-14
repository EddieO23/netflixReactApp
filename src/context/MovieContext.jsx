// Summary of this component in app
// In summary, this code sets up a React context for managing movie data, providing a way for components to access and update the selected movie and lists of popular, top-rated, and trending movies without prop drilling. The custom hook useMovieContext makes it easy to utilize this context in any component.

import React, { createContext, useState, useContext } from 'react';

// Create the context
const MovieContext = createContext();

// Provider component
export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trailerUrl,setTrailerUrl] = useState("")
  const [isMuted, setIsMuted] = useState(true); // State to manage mute/unmute
  const [loading, setLoading] = useState(true); // State to manage loading
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <MovieContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        popularMovies,
        setPopularMovies,
        topRatedMovies,
        setTopRatedMovies,
        trendingMovies,
        setTrendingMovies,
        trailerUrl,
        setTrailerUrl,
        modalOpen,
        setModalOpen
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the MovieContext
export const useMovieContext = () => {
  const context = useContext(MovieContext)

  if(!context) {
    throw new Error('useMovieContext must be used within a MovieProvider')
  }
  return context
};

