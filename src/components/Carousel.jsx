import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";

function Carousel({ items, title }) {
  const carouselContainer = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 320;

console.log(items)

  const handleScroll = () => {
    if(carouselContainer.current) {
      setScrollPosition(carouselContainer.current.scrollLeft)
    }
  }

  const scrollLeft = () => {
    if (carouselContainer.current) {
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      setScrollPosition(newPosition);
      carouselContainer.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselContainer.current) {
      const maxScroll = carouselContainer.current.scrollWidth - carouselContainer.current.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
      setScrollPosition(newPosition);
      carouselContainer.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <h1 className="mt-4 mb-2 text-2xl font-semibold text-white">{title}</h1>

      <div className="no-scrollbar relative">
        <button className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-4 cursor-pointer z-10 transition-colors duration-300 ease-in-out hover:opacity-80 h-full left-0" onClick={scrollLeft}>
          <ChevronLeft />
        </button>

        <button className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-4 cursor-pointer z-10 transition-colors duration-300 ease-in-out hover:opacity-80 h-full right-0" onClick={scrollRight}>
          <ChevronRight />
        </button>
        <div className="scroll-snap-mandatory no-scrollbar flex overflow-x-auto" ref={carouselContainer} onScroll={handleScroll}>
         {items.map((item) => (
         <div className="h-20 border-2 bg-gray-500 text-slate-950">
          {item.title}
          </div> 
         ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
