import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateSection from './crudSection/UpdateSection';
import DeleteSection from './crudSection/DeleteSection';
import ReactPlayer from 'react-player';

const CardSection = ({ section, setCrud, crud }) => {
  const [viewTitle, setViewTitle] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  const videoRef = useRef(null);
  const videoBlurRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (viewTitle) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    if (videoBlurRef.current) {
      if (viewTitle) {
        videoBlurRef.current.play();
      } else {
        videoBlurRef.current.pause();
      }
    }
  }, [viewTitle]);

  const toggleVideoPlay = () => {
    setViewTitle(true);
    setPlayVideo(true);
  };

  const toggleVideoPause = () => {
    setViewTitle(false);
    setPlayVideo(false);
  };

  return (
    <div
      className="cardSection__container"
      onMouseOver={toggleVideoPlay}
      onMouseOut={toggleVideoPause}
    >
      <img
        src={`${import.meta.env.VITE_URL_Img}${section.sectionImg}`}
        alt={section.title}
        style={playVideo ? { opacity: '0' } : { opacity: '1' }}
      />

      <ReactPlayer
        playing={playVideo}
        volume={0}
        url={section.linkVideo}
        controls={false}
        loop={true}
        width="100%"
        responsive={true}
      />

      <Link
        to={`/section/${section.id}`}
        className="cardSection__link"
      >
        {section.title}
      </Link>
      <div className="cardSection__updateDelete">
        <p
          onClick={() => {
            setCrud(`updateSection${section.id}`);
          }}
        >
          Edit
        </p>

        <p
          onClick={() => {
            setCrud(`deleteSection${section.id}`);
          }}
        >
          Delete
        </p>
      </div>
      <UpdateSection
        section={section}
        setCrud={setCrud}
        crud={crud}
      />
      <DeleteSection
        section={section}
        setCrud={setCrud}
        crud={crud}
      />
    </div>
  );
};

export default CardSection;
