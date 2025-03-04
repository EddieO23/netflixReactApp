import React, { useEffect } from 'react'
import {useUtilsContext} from '../context/UtilsContext'
import Card from '../components/Card'

function MyList() {
  const {movieList} = useUtilsContext() 

  useEffect(()=>{

  }, [movieList])
  return (
    <div className='absolute top-36 flex flex-wrap px-12 justify-around gap-4'>
      {movieList.length > 0 ? (
        movieList.map((movie, index) => (
          <Card item={movie} key={index} />
        ))
      ) : (
        <p className='text-white text-xl'>No movies found in your list...</p>
      )}
    </div>
  )
}

export default MyList
