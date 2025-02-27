import React, { useContext, useEffect, useState } from "react";
import { tmdbApi } from "../tmdbApi";
import { useMovieContext } from "../context/MovieContext";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";

function Home() {
  const {
    selectedMovie,
    setSelectedMovie,
    popularMovies,
    setPopularMovies,
    topRatedMovies,
    setTopRatedMovies,
    trendingMovies,
    setTrendingMovies,
  } = useMovieContext();

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
          }),
        );
        setGenresWithMovies(allGenreWithMovies);
      }

      if (popularMoviesResult.error) {
        setPopularMovies([]);
      } else if (popularMoviesResult.data) {
        const randomIndex = Math.floor(
          Math.random() * popularMoviesResult.data?.results.length,
        );

        const randomMovie = popularMoviesResult.data?.results[randomIndex];

        setSelectedMovie(randomMovie);
        console.log("Selected Movie", selectedMovie);
        setPopularMovies(popularMoviesResult.data.results);
      }
      if (topRatedMoviesResult.error) {
        setTopRatedMovies([]);
      } else if (topRatedMoviesResult.data) {
        setTopRatedMovies(topRatedMoviesResult.data.results);
      }
      if (trendingMoviesResult.error) {
        setTrendingMovies([]);
      } else if (trendingMoviesResult.data) {
        setTrendingMovies(trendingMoviesResult.data.results);
      }
    };

    loadMovies();
  }, [
    setSelectedMovie,
    setPopularMovies,
    setTopRatedMovies,
    setTrendingMovies,
  ]);

  return (
    <div>
      <Hero />
      <Carousel items={popularMovies} title="Popular"/>
    </div>
  );
}

export default Home;
