import { createContext, useContext, useState } from "react";
import { useCardContext } from "./CardContext";

const UtilsContext = createContext(null);

export const UtilsProvider = ({ children }) => {
  const [movieList, setMovieList] = useState(
    JSON.parse(localStorage.getItem("movieList") || "[]"),
  );

  const { setCardState } = useCardContext();

  const addToFavoriteList = (movie) => {
    let list = localStorage.getItem("movieList");
    if (list) {
      try {
        const parsedList = JSON.parse(list);
        const exists = parsedList.some((item) => item.id === movie.id);
        if (exists) {
          const newMovieList = parsedList.filter(
            (item) => item.id !== movie.id,
          );
          setMovieList(newMovieList);
          localStorage.setItem("movieList", JSON.stringify(newMovieList));
        }
      } catch (error) {
        localStorage.removeItem("movieList");
        setMovieList([]);
      }
    }

    const newMovieList = [...movieList, movie];
    setMovieList(newMovieList);

    try {
      localStorage.setItem("movieList", JSON.stringify(newMovieList));
    } catch (error) {
      console.log("Error saving the movie to local storage", error);
    }
  };

  return (
    <UtilsContext.Provider value={{ addToFavoriteList, movieList }}>
      {children}
    </UtilsContext.Provider>
  );
};


export const useUtilsContext = () => {
  const context = useContext(UtilsContext)
  if(!context) {
    throw new Error('useUtilsContext must be used within a UtilsProvider')
  }
  return context
}