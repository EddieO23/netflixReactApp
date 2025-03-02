import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { Play } from "lucide-react";
import { tmdbApi } from "../tmdbApi";

function SimilarMoviesCard({ id, title, description, imageUrl, duration }) {
  const { setModalOpen } = useMovieContext();
  const navigate = useNavigate();
  const [imageSrc] = useState(imageUrl);
  const handlePlay = async () => {
    const trailerRes = await tmdbApi.getMovieTrailer(parseInt(id));
    if (trailerRes.error) {
      navigate(`/watch/404-not-found`);
      setModalOpen(false);
    } else if (trailerRes.data) {
      navigate(`/watch/${trailerRes.data.results[0].key}`);
      setModalOpen(false);
    }
  };

  return (
    <div className="w-32 rounded-lg bg-[#181818] text-white shadow-md sm:w-40">
      <div className="relative">
        <img
          src={imageSrc}
          alt="img "
          className="rounde-t-lg h-40 w-full object-cover"
        />

        <div className="absolute top-2 right-2 rounded-md bg-[#000000b3] px-2 py-0.5 text-sm font-semibold text-white">
          {duration}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
        <h3 className="absolute bottom-0 left-2 mb-1.5 text-base font-semibold">
        {title.length > 20
            ? title.slice(0, 20) + "..."
            : title}
        </h3>
      </div>

      <div className="p-3">
        <div className="mb-1 flex flex-col text-sm">
          <div className="flex justify-between">
            <div className="flex flex-col items-center justify-between">
              <div className="text-[#46d369]">
                <span>67% Match</span>
              </div>
              <div className="text-[#b3b3b3]">
                <span className="mr-2 border-[#b3b3b3] border px-1">5+</span>
                <span>2024</span>
              </div>
            </div>
            <div onClick={handlePlay}>
              <button className="rounded-full border-2 border-gray-700 p-3 transition-colors duration-200 hover:border-white">
                <Play className="h-4 w-4 text-white md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </div>
        <p className="mb-3 text-xs leading-tight text-[#b3b3b3]">
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>
      </div>
    </div>
  );
}

export default SimilarMoviesCard;
