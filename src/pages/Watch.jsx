import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

function Watch() {
  const { id } = useParams();

  if (!id) {
    return <div>No movie selected</div>;
  }

  if (id === '404 Not Found') {
    return <div>404 Not Found</div>;
  }

  return (
    <div className='relative overflow-hidden' style={{ height: '100vh' }}> {/* Set height here */}
      <VideoPlayer videoId={id} isMuted={true} />
    </div>
  );
}

export default Watch;

