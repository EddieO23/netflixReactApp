// import React, { useContext, useEffect, useState } from "react"; // Added useState import
// import { tmdbApi } from "../tmdbApi";
// import { useMovieContext } from "../context/MovieContext";

// function Home() {
//   const {selectedMovie,
//     setSelectedMovie,
//     popularMovies,
//     setPopularMovies,
//     topRatedMovies,
//     setTopRatedMovies,
//     trendingMovies,
//     setTrendingMovies} = useMovieContext()
  
//   const [genresWithMovies, setGenresWithMovies] = useState(null); // Corrected variable name to camelCase

//   useEffect(() => {
//     const loadMovies = async () => {
//       const [
//         popularMoviesResult,
//         topRatedMoviesResult,
//         trendingMoviesResult,
//         allGenres,
//       ] = await Promise.all([
//         tmdbApi.fetchPopularMovies(),
//         tmdbApi.fetchTopRatedMovies(),
//         tmdbApi.fetchTrendingMovies(),
//         tmdbApi.getGenres(),
//       ]);

//       if (allGenres.error) {
//         console.log(allGenres.error);
//         setGenresWithMovies([]); // Corrected variable name to camelCase
//       } else if (allGenres.data) {
//         const allGenreWithMovies = await Promise.all(
//           allGenres.data.genres.map(async (genre) => {
//             const movies = await tmdbApi.getMoviesByGenre(genre.id); // Added missing closing parenthesis
//             return {
//               id: genre.id,
//               name: genre.name,
//               movies: movies.data.results,
//             };
//           })
//         );
//         setGenresWithMovies(allGenreWithMovies)
//       }

//       if(popularMoviesResult.error){
//         // set the popular movies to an empty array
//         setPopularMovies([])
//       } else {
//         setPopularMovies(popularMovies.data.results)
//       } 
//       if (topRatedMovies.error) {
//         setTopRatedMovies([])
//       } else {
//         setTopRatedMovies(topRatedMovies.data.results)
//       }
//       if (trendingMovies.error) {
//         setTrendingMovies([])
//       } else {
//         setTrendingMovies(setTrendingMovies.data.results)
//       }

//       const randomIndex = Math.floor(Math.random() * popularMoviesResult.data?.results.length ) 

//       const randomMovie = popularMoviesResult.data?.results(randomIndex)

//       setSelectedMovie(randomMovie)

//       console.log("random movie",randomMovie)
//     };

//     loadMovies();
//   }, []);

//   return <div>HOME</div>;
// }

// export default Home;


import React, { useContext, useEffect, useState } from "react"; 
import { tmdbApi } from "../tmdbApi";
import { useMovieContext } from "../context/MovieContext";

function Home() {
  const { selectedMovie,
    setSelectedMovie,
    popularMovies,
    setPopularMovies,
    topRatedMovies,
    setTopRatedMovies,
    trendingMovies,
    setTrendingMovies } = useMovieContext();
  
  const [genresWithMovies, setGenresWithMovies] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const [
        popularMoviesResult,
        topRatedMoviesResult,
        trendingMoviesResult,
        allGenres,
      ] = await Promise.all([
        tmdbApi.fetchPopularMovies(),
        tmdbApi.fetchTopRatedMovies(),
        tmdbApi.fetchTrendingMovies(),
        tmdbApi.getGenres(),
      ]);

      if (allGenres.error) {
        console.log(allGenres.error);
        setGenresWithMovies([]);
      } else if (allGenres.data) {
        const allGenreWithMovies = await Promise.all(
          allGenres.data.genres.map(async (genre) => {
            const movies = await tmdbApi.getMoviesByGenre(genre.id);
            return {
              id: genre.id,
              name: genre.name,
              movies: movies.data.results,
            };
          })
        );
        setGenresWithMovies(allGenreWithMovies);
      }

      if (popularMoviesResult.error) {
        setPopularMovies([]);
      } else {
        setPopularMovies(popularMoviesResult.data.results);
      } 
      if (topRatedMoviesResult.error) {
        setTopRatedMovies([]);
      } else {
        setTopRatedMovies(topRatedMoviesResult.data.results);
      }
      if (trendingMoviesResult.error) {
        setTrendingMovies([]);
      } else {
        setTrendingMovies(trendingMoviesResult.data.results);
      }

      const randomIndex = Math.floor(Math.random() * popularMoviesResult.data?.results.length);

      const randomMovie = popularMoviesResult.data?.results[randomIndex];

      setSelectedMovie(randomMovie);

      console.log("random movie", randomMovie);
    };

    loadMovies();
  }, [setSelectedMovie, setPopularMovies, setTopRatedMovies, setTrendingMovies]);

  return <div>HOME</div>;
}

export default Home;
