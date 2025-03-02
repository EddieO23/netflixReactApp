import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMovieContext } from '../context/MovieContext'

function SimilarMoviesCard({id, title, description, imageUrl, duration}) {
  const {setModalOpen} =  useMovieContext()
  const navigate = useNavigate()
  const[imageSrc ] = useState(imageUrl)

  return (
    <div className='bg-[#181818] text-white rounded-lg shadow-md sm:w-40 w-32'>
        <div className="relative">
          <img src={imageSrc} alt='img ' className='rounde-t-lg w-full h-40 object-cover'/>

          <div className="absolute top-2 right-2 bg-[#000000b3] text-white px-2 py-0.5 rounded-md text-sm font-semibold">
            {duration}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
          <h3 className='absolute bottom-0 left-2 font-semibold text-base mb-1.5'>
            {title}
          </h3>
        </div>

    <div className="p-3 ">
      <div className='flex flex-col text-sm mb-1'>
        <div className="flex justify-between">
          <div className="flex flex-col justify-between items-center ">
            <div className="text-[#46d369]">
              <span>67% Match</span>
            </div>
            <div className="text-[#b3b3b3]">
              <span className='px-1 mr-2 border-[#b3b3b3]'>5+</span>
              <span>2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default SimilarMoviesCard
