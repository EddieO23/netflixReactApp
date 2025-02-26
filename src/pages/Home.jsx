// import React, { useEffect, useState } from "react";
// import { tmdbApi } from "../tmdbApi";

// function Home() {
//   const [genresWithMovies, setgenresWithMovies] = useState(null);

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
//         setgenresWithMovies([]);
//       } else if(allGenres.data) {
//         const allGenreWithMovies = await Promise.all(
//           allGenres.data.genres.map(async (genre) => {
//             const movies = await tmdbApi.getMoviesByGenre(genre.id
//               return {
//                 id: genre.id,
//                 name:genre.name,
//                 movies: movies.data.results
//               })
//           })
//         )
//       }
//     };

//     loadMovies();
//   }, []);

//   return <div>HOME</div>;
// }

// export default Home;


import React, { useEffect, useState } from "react"; // Added useState import
import { tmdbApi } from "../tmdbApi";

function Home() {
  const [genresWithMovies, setGenresWithMovies] = useState(null); // Corrected variable name to camelCase

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
        setGenresWithMovies([]); // Corrected variable name to camelCase
      } else if (allGenres.data) {
        const allGenreWithMovies = await Promise.all(
          allGenres.data.genres.map(async (genre) => {
            const movies = await tmdbApi.getMoviesByGenre(genre.id); // Added missing closing parenthesis
            return {
              id: genre.id,
              name: genre.name,
              movies: movies.data.results,
            };
          })
        );
        setGenresWithMovies(allGenreWithMovies)
      }

      if(popularMoviesResult.error){
        // set the popular movies to an empty array
        
      }
    };

    loadMovies();
  }, []);

  return <div>HOME</div>;
}

export default Home;
