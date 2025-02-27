import React from "react";

function Card({ item }) {
  return (
    <div
      className="pointer-events-auto relative w-36 cursor-pointer text-white opacity-100 sm:w-56"
      onMouseEnter={() => {}}
      role="presentation"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}
        alt={item.title}
        className="block h-auto w-full"
      />
    </div>
  );
}

export default Card;
