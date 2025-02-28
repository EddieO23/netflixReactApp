import { Check, Play, Plus, Volume2, VolumeOff } from "lucide-react";
import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { Link } from "react-router-dom";

function PopUpCard({ isHovered, x, y }) {
  const [title, setTitle] = useState("Movie Title");
  const [muted, setIsMuted] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [addedToFavorite, setAddedToFavorite] = useState(false);

  const styles = {
    popupCard: {
      backgroundColor: "rgb(20,20,20)",
      boxShadow:
        "rgba(0,0,0,0.2) opx 2px 1px 1px, rgba(0,0,0, 0.14) 0px 1px 1px 0px, rgba(0,0,0,0.12) 0px 1px 3px 0px",
      backgroundImage: "linear-gradient(rgba(255,255,255,0.05))",
      borderRadius: "8px",
      transformOrigin: "center",
      position: "fixed",
      width: "350px",
      zIndex: "1000",
      overflow: "hidden",
    },
    popupScaleDown: {
      transform: "translate(-50%, -100%) scale(0))",
      opacity: 1,
    },
    popupScaleUp: {
      transform: "translate(-50%, -100%) scale(1))",
      opacity: 1,
    },
    transitionAll: {
      transition: "transform 0.3s ease 0.1s, opacity 0.3s ease",
    },
  };
  return (
    <div
      className="z-40 flex flex-col text-white"
      style={{
        ...styles.popupCard,
        top: `${y + 270}px`,
        left: `${
          x < 200 ? x + 60 : window.innerWidth - x < 200 ? x - 60 : x
        }px`,
        ...(isHovered ? styles.popupScaleUp : styles.popupScaleDown),
        ...styles.transitionAll,
      }}
      onMouseLeave={() => {}}
    >
      <div
        className="relative h-[198px] w-full"
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      >
        <div className="flex items-center">
          <p className="absolute top-36 left-2 text-xl font-semibold text-ellipsis">
            {title.length > 25 ? title.slice(0, 25) + "..." : title}
          </p>
          <span
            onClick={() => {}}
            className="absolute top-36 right-4 z-50 cursor-pointer rounded-full border-2 border-t-gray-700 p-3 transition-colors duration-200 hover:border-white"
          >
            {muted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
          </span>
        </div>
        {trailerUrl && showTrailer ? (
          <div className="pointer-events-none h-full w-full border-gray-700">
            <VideoPlayer pip={true} isMuted={muted} videoId={trailerUrl} />
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            className="h-full w-full object-cover"
            alt="poster"
          />
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center bg-gray-500">
            <span className="text-sm text-white">No Image Available</span>
          </div>
        )}
      </div>

      <div className="jusity-between flex items-center">
        <div className="flex space-x-2">
          <Link
            to={`/watch/${trailerUrl}`}
            className="rounded-full border-2 border-gray-700 p-3 transition-colors duration-200 hover:border-white"
          >
            <Play size={20} className="h-6 w-6" />
          </Link>

          <button className="rounded-full border-2 border-gray-700 p-3 transition-colors duration-200 hover:border-white" onClick={()=>{}}>
{addedToFavorite ? (
  <Check size={20} className="h-6 w-f6"/>
) : (
  <Plus size={20} className="h-6 w-6"/>
)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpCard;
