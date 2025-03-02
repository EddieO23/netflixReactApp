import React, { useEffect } from "react";
import { useState } from "react";
import { useUtilsContext } from "../context/UtilsContext";
import VideoPlayer from "./VideoPlayer";
import { tmdbApi } from "../tmdbApi";
import SimilarMoviesCard from "./SimilarMoviesCard";
import {Check,Play,Plus,ThumbsUp,Volume2,VolumeOff,X,} from "lucide-react";
import { useNavigate } from "react-router-dom";


function Modal({ isOpen, onClose, movieData }) {
  const { addToFavoriteList, randomDuration } = useUtilsContext();
  const [muted, setMuted] = useState(true);
  const [videoId, setVideoId] = useState("");
  const [addedToFavorite, setAddedToFavorite] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loadingSimilarMovies, setLoadingSimilarMovies] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setLoadingSimilarMovies(true);
    let list = JSON.parse(localStorage.getItem("movieList") || "[]");

    setAddedToFavorite(list.some((item) => item.id === movieData.id));

    const fetchData = async () => {
      const [trailerResponse, movieDetailsResponse, similarMovieResponse] =
        await Promise.all([
          tmdbApi.getMovieTrailer(movieData.id),
          tmdbApi.getMovieDetails(movieData.id),
          tmdbApi.getSimilarMovies(movieData.id),
        ]);
      setLoadingSimilarMovies(false);

      if (trailerResponse.error) {
        setVideoId("");
      } else if (trailerResponse.data) {
        setVideoId(trailerResponse.data.results[0].key);
      }

      if (movieDetailsResponse.error) {
        setMovieDetails(null);
      } else if (movieDetailsResponse.data) {
        setMovieDetails(movieDetailsResponse.data);
      }

      if (similarMovieResponse.error) {
        setSimilarMovies([]);
      } else if (similarMovieResponse.data) {
        setSimilarMovies(similarMovieResponse.data.results);
        console.log(similarMovieResponse.data.results);
      }
    };

    fetchData();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        className="relative h-[90vh] w-[85%] overflow-x-hidden rounded-lg bg-[#141414] text-white md:w-[80%] lg:w-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-6 z-50 rounded-full bg-black px-3 text-white hover:cursor-pointer"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {videoId ? (
          <div className="relative h-96">
            <div className="absolute inset-0 bottom-0 z-20 bg-gradient-to-t from-[#141414] to-transparent"></div>
            <div className="absolute bottom-2 left-6 z-50 w-[90%] md:left-12">
              <p className="mb-4 text-4xl font-bold">{movieData.title}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    className="hove:bg-gray-200 flex items-center gap-2 rounded-md bg-white p-2 px-4 py-2 text-2xl text-black transition-all md:px-12"
                    onClick={() => {
navigate(`/watch/${movieData.id}`)
onClose()
                    }}
                  >
                    <Play size={20} />
                    <span className="hidden font-semibold lg:block">Play</span>
                  </button>
                  <button
                    className="rounded-full border-2 border-gray-700 p-2 transition hover:border-white md:p-4"
                    onClick={() => {
                      addToFavoriteList(movieData);
                      setAddedToFavorite(!addedToFavorite);
                    }}
                  >
                    {addedToFavorite ? (
                      <Check className="h-6 w-6 text-white" />
                    ) : (
                      <Plus className="h-6 w-6 text-white" />
                    )}
                  </button>

                  <button className="rounded-full border-2 border-gray-700 p-2 transition hover:border-white md:p-4">
                    <ThumbsUp className="h-6 w-6 text-white" />
                  </button>
                </div>

                <div className="pr-2">
                  <button
                    onClick={() => {
                      setMuted(!muted);
                    }}
                    className="rounded-full border-2 border-gray-700 p-2 transition hover:border-white md:p-4"
                  >
                    {muted ? <VolumeOff /> : <Volume2 />}
                  </button>
                </div>
              </div>
            </div>
            <div className="pointer-events-auto overflow-hidden">
              <VideoPlayer videoId={videoId} isMuted={muted} />
            </div>
          </div>
        ) : (
          <div className="relative p-6 md:p-12">
            <p>Video Not Available...</p>
          </div>
        )}
        <div className="relative p-6 md:p-12">
          <div className="absolute inset-0 bottom-0 h-[20px] bg-gradient-to-t from-[#141414] to-transparent"></div>

          <div className="flex flex-col md:flex-row">
            <div className="w-[100%] pr-8 md:w-[60%]">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-green-400">
                  {movieDetails?.vote_average
                    ? `${(movieDetails?.vote_average * 10).toFixed(0)}% Match`
                    : "N/A"}
                </span>
                <span className="rounded-sm border border-gray-600 px-2">
                  {movieDetails?.adult ? "18+" : "13+"}
                </span>
                <span className="font-bold">
                  {movieDetails?.runtime
                    ? `${movieDetails?.runtime} min`
                    : "2hrs 14min"}
                </span>
                <span className="rounded-sm border border-gray-600 px-2">
                  4K
                </span>
              </div>
              <p>{movieDetails?.overview || "No overview is available"}</p>
            </div>
            <div className="mt-4 flex flex-1 flex-col">
              <p>
                <strong>Genres: &nbsp;</strong>
                {movieDetails?.genres?.map((genre) => genre.name).join(",") ||
                  "N/A"}
              </p>
              <p>
                <strong>Languages &nbsp;</strong>
                {movieDetails?.spoken_languages
                  ?.map((lang) => lang.name)
                  .join(", ") || "N/A"}
              </p>
            </div>
          </div>
          {loadingSimilarMovies && (<p className="mt-4 text-center">Loading Similiar Movies...</p>)}
          {
            similarMovies.length == 0 && !loadingSimilarMovies && (<p className="mt-4 text-center">Couldn't find similar movies :(</p>) 
          }
          {
            similarMovies.length> 0 && !loadingSimilarMovies && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-4">More like this:</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 ">
{similarMovies.filter(item => item.backdrop_path).slice(0,12).map((movie) => (
  <SimilarMoviesCard key={movie.id} id={movie.id} duration={randomDuration()} title={movie.title} description={movie.overview} imageUrl={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
))}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
