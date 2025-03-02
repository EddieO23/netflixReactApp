import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const get = async (url, config) => {
  try {
    const response = await axiosInstance.get(url, config);
    return { data: response.data };
  } catch (error) {
    const status = error?.response?.status;
    const details = error?.response?.data;
    // Uncomment the toast notification for user feedback
    // toast.error("Something went wrong!!! Try again later", { id: "toast" });
    return {
      error: {
        message: `Failed to get the data from ${url}`,
        status,
        details,
        name: "TMDB_API_ERROR",
      },
    };
  }
};

// actual API's

export const tmdbApi = {
  fetchPopularMovies: (page = 1) => {
    if (page < 1) {
      throw new Error("Page must be a positive integer.");
    }
    return get(`/movie/popular`, { params: { page } });
  },

  fetchTrendingMovies: (timeWindow = "week") => get(`/trending/movie/${timeWindow}`),

  fetchTopRatedMovies: (page) => get(`/movie/top_rated`, {params: {page}}),

  getGenres: () => get(`/genre/movie/list`),

  getMoviesByGenre: (genreId, page = 1) =>
    get(`/discover/movie`, {
      params: { with_genres: genreId, page },
    }),

  getMovieTrailer: (movieId) =>
    get(`/movie/${movieId}/videos`),

  getMovieDetails: (movieId) => get(`/movie/${movieId}`),

  getSimilarMovies: (movieId) =>
    get(`/movie/${movieId}/similar`, {
      params: { page: 1 },
    }),

  // searchMovies: (keyword, page = 1) =>
  //   get(`/search/movie`, {
  //     params: { query: keyword, page },
  //   }),

};
