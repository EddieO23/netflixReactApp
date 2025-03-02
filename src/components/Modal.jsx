import { Check, Play, Plus, ThumbsUp, Volume2, VolumeOff, X } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useUtilsContext } from '../context/UtilsContext'
import VideoPlayer from './VideoPlayer'

function Modal({isOpen, onClose, movieData}) {
  const {addToFavoriteList} = useUtilsContext()
  const [muted, setMuted] = useState(true)
  const [videoId, setVideoId] = useState("sVIUkLhSDuM")
  const [addedToFavorite, setAddedToFavorite] = useState(false)

  if(!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className="h-[90vh] overflow-x-hidden w-[85%] md:w-[80%] lg:w-[50%] bg-[#141414] text-white rounded-lg relative" onClick={()=>{}}>
<button className='absolute z-50 top-4 right-6 text-white bg-black px-3 rounded-full' onClick={onClose}>
  <X size={20}/>
</button>

{videoId ? (
  <div className="relative h-96">
    <div className="absolute inset-0 z-20 bottom-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
    <div className="absolute z-50 left-6 md:left-12 bottom-2 w-[90%]">
      <p className='text-4xl font-bold mb-4'>{movieData.title}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">

<button className='flex text-2xl items-center gap-2 bg-white text-black p-2 px-4 md:px-12 py-2 rounded-md hove:bg-gray-200 transition-all' onClick={()=>{}}>
  <Play size={20}/>
  <span className='font-semibold lg:block hidden'>Play</span>
</button>
<button className='rounded-full p-2 md:p-4 border-2 border-gray-700 hover:border-white transition' onClick={() => {
  addToFavoriteList(movieData);
  setAddedToFavorite(!addedToFavorite);
}}>

{
  addedToFavorite ? (
    <Check className='text-white h-6 w-6 '/>
  ) : (
    <Plus className='text-white h-6 w-6'/> 
  )
}
</button>

<button className='rounded-full p-2 md:p-4 border-2 border-gray-700 hover:border-white transition'>
  <ThumbsUp className='text-white h-6 w-6'/>
</button>

        </div>

        <div className="pr-2">
          <button onClick={()=>{setMuted(!muted)}} className='rounded-full p-2 md:p-4 border-2 border-gray-700 hover:border-white transition'>
            {muted ? <VolumeOff /> : <Volume2/>}
          </button>
        </div>

      </div>


    </div>
<div className="pointer-events-auto overflow-hidden">
<VideoPlayer videoId={videoId} isMuted={muted } />
</div>
  </div>
): (
  <div className="p-6 md:p-12 relative">
    <p>Video Not Available...</p>
  </div>
)}
<div className="p-6 md:p-12 relative">
   <div className='absolute inset-0 h-[20px] bottom-0 bg-gradient-to-t from-[#141414] to-transparent'>
   </div>

   <div className="flex flex-col md:flex-row">
    <div className="w-[100%] md:w-[60%] pr-8">
      <div className="flex items-center gap-4 mb-4">
        <span className='text-green-400'>{movieData.vote_average ? ${(movieData.vote_average * 10)}}</span>
      </div>
    </div>
   </div>
</div>
      </div>
    </div>
  )
}

export default Modal
