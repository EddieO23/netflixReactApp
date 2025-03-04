import React, { useContext, useEffect, useState } from "react";
import { tmdbApi } from "../tmdbApi";
import { useMovieContext } from "../context/MovieContext";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";

function Home() {
  const {
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
    let isMounted = true; // Track if the component is mounted

    const loadMovies = async () => {
      try {
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
          if (isMounted) setGenresWithMovies([]);
        } else if (allGenres.data && allGenres.data.genres) {
          const allGenreWithMovies = await Promise.all(
            allGenres.data.genres.map(async (genre) => {
              const movies = await tmdbApi.getMoviesByGenre(genre.id);
              console.log(`Fetched movies for genre ${genre.name}:`, movies);
              if (movies.error || !movies.data) {
                console.log(`Error fetching movies for genre ${genre.name}:`, movies.error);
                return { id: genre.id, name: genre.name, movies: [] };
              }
              return {
                id: genre.id,
                name: genre.name,
                movies: movies.data.results,
              };
            })
          );
          if (isMounted) setGenresWithMovies(allGenreWithMovies);
        } else {
          if (isMounted) setGenresWithMovies([]); // Handle case where genres are not available
        }

        // Handle other movie results...
        if (popularMoviesResult.error) {
          if (isMounted) setPopularMovies([]);
        } else if (popularMoviesResult.data) {
          const randomIndex = Math.floor(Math.random() * popularMoviesResult.data.results.length);
          const randomMovie = popularMoviesResult.data.results[randomIndex];
          if (isMounted) {
            setSelectedMovie(randomMovie);
            setPopularMovies(popularMoviesResult.data.results);
          }
        }
        if (topRatedMoviesResult.error) {
          if (isMounted) setTopRatedMovies([]);
        } else if (topRatedMoviesResult.data) {
          if (isMounted) setTopRatedMovies(topRatedMoviesResult.data.results);
        }
        if (trendingMoviesResult.error) {
          if (isMounted) setTrendingMovies([]);
        } else if (trendingMoviesResult.data) {
          if (isMounted) setTrendingMovies(trendingMoviesResult.data.results);
        }
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, []);

  return (
    <div>
      <Hero />
      <div className="absolute w-full top-[31vh] md:top-[65vh] lg:top-[85vh] pl-10 flex flex-col space-y-4">
        {popularMovies && <Carousel title="Popular Movies" items={popularMovies} />}
        {trendingMovies && <Carousel title="Trending Movies" items={trendingMovies} />}
        {topRatedMovies && <Carousel title="Top-Rated Movies" items={topRatedMovies} />}
        {genresWithMovies && genresWithMovies.map((movieList) => (
          <Carousel key={movieList.id} title={`${movieList.name} Movies`} items={movieList.movies}/>
        ))}
      </div>
    </div>
  );
}

export default Home;
