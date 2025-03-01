import React from "react";
import { useCardContext } from "../context/CardContext";

function Card({ item }) {
  const { cardState, setCardState } = useCardContext();
  const handleHover = (e) => {
    if (cardState.cardId == item.id && cardState.isHovered) {
      return;
    }
    const cardElement = e.currentTarget;
    const cardRect = cardElement.getBoundingClientRect();

    setCardState({
      item,
      isHovered: true,
      cardId: item.id,
      position: { x: cardRect.left + cardRect.width / 2, y: cardRect.top },
    });
  };

  return (
    <div
      className="pointer-events-auto relative w-36 cursor-pointer text-white opacity-100 sm:w-56"
      onMouseEnter={handleHover}
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
