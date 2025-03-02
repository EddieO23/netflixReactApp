import React, { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { InfoIcon, PlayIcon, Volume2Icon, VolumeOff } from "lucide-react";
import { tmdbApi } from "../tmdbApi";
import VideoPlayer from "./VideoPlayer";

function Hero() {
  const { selectedMovie, trailerUrl, setTrailerUrl, setModalOpen } = useMovieContext();
  const [isMuted, setIsMuted] = useState(true); // State to manage mute/unmute
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true); // Set loading to true when fetching
      if (selectedMovie) {
        const trailerResponse = await tmdbApi.getMovieTrailer(selectedMovie.id);
        if (trailerResponse.error) {
          setTrailerUrl("");
        } else if (trailerResponse.data) {
          setTrailerUrl(trailerResponse.data.results[0].key);
        }
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchTrailer();
  }, [selectedMovie]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev); // Toggle mute state
  };

  return (
    <main className="bg-custom-dark relative overflow-hidden">
      {/* Video player */}
      {loading ? (
        <p className="text-white">Loading...</p> // Loading message
      ) : (
        trailerUrl && <VideoPlayer videoId={trailerUrl} isMuted={isMuted} />
      )}
      {selectedMovie && (
        <img
          src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
          alt="movie poster"
        />
      )}
      {/* Gradient div */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

      {selectedMovie && (
        // Movie details
        <div className="absolute top-[38%] z-10 w-full pl-12">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-6xl">
            {selectedMovie.title?.length > 30 && window.innerWidth < 768
              ? selectedMovie.title?.substring(0, 30) + "..."
              : selectedMovie.title}
          </h1>
          <p className="mb-6 hidden max-w-lg text-sm text-gray-300 md:block md:text-lg">
            {selectedMovie.overview?.substring(0, 150) + "..."}
          </p>

          <div className="flex flex-wrap items-center">
            <div className="xs:flex-col flex gap-4">
              <button
                onClick={() => { /* Implement play functionality here */ }}
                className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-black transition-all hover:bg-gray-200"
              >
                <PlayIcon size={20} />
                <span className="font-semibold">Play</span>
              </button>
              <button onClick={()=>{setModalOpen(true)}} className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-white transition-all hover:bg-gray-600">
                <InfoIcon size={20} />
                <span className="hidden font-semibold md:block">Info</span>
              </button>
            </div>

            <div className="absolute right-0 flex items-center gap-4">
              <button onClick={toggleMute} className="flex items-center rounded-full border-2 p-2 text-white transition-all">
                {isMuted ? <VolumeOff size={20}/> : <Volume2Icon size={20} />}
              </button>
              <div className="bg-opacity-600 border-l-2 bg-gray-600 px-3 py-2 text-white">
                <span>18+</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Hero;
