import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

const VideoPlayer = ({ videoId, isMuted }) => {
  const location = useLocation();
  const playerRef = useRef(null);
  const [volume, setVolume] = useState(0.8);

  // Debugging output
  console.log("Video ID:", videoId);

  useEffect(() => {
    setVolume(isMuted ? 0 : 0.8); // Use isMuted prop directly
  }, [isMuted]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}> {/* Ensure height is set */}
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${videoId}`}
        controls={location.pathname.startsWith("/watch") ? true : false}
        muted={isMuted}
        playing={true}
        volume={volume}
        loop={true}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
              disablekb: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
