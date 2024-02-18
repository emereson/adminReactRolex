import React, { useState } from 'react';
import './oneSectionStyle/cardExample.css';
import DeleteSectionVideo from './crudSectionVideo/DeleteSectionVideo';
import UpdateSectionVideo from './crudSectionVideo/UpdateSectionVideo';

const CardSectionVideo = ({ video, setCrud, crud }) => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <article className="cardSectionVideo__container">
      <h2>{video.title} </h2>
      <div
        className={`cardSectionVideo__videoContainer ${
          !openVideo ? 'cardSectionVideo__closeVideo' : ''
        }`}
      >
        <i
          className="bx bx-x"
          onClick={() => setOpenVideo(!openVideo)}
        ></i>
        <iframe
          title={video.title}
          src={`${video.linkVideo}${openVideo ? '?autoplay=1' : ''}`}
          width="100%"
          height="100%"
          frameborder="0"
          autoPlay={openVideo}
          allowfullscreen
        ></iframe>
      </div>
      <div
        className="cardSectionVideo__imgContainer"
        onClick={() => setOpenVideo(!openVideo)}
      >
        <img
          src={`${import.meta.env.VITE_URL_IMG}${video.linkImg}`}
          alt=""
        />
        <div className="cardSectionVideo__imgPlayVideo">
          <p>PLAY FILM</p>
          <i className="bx bx-play"></i>
        </div>
      </div>
      <div className="cardSectionVideo__divButtons">
        <p onClick={() => setCrud(`updateExample${video.id}`)}>
          Edit
        </p>
        <p onClick={() => setCrud(`deleteExample${video.id}`)}>
          Delete
        </p>
      </div>
      <UpdateSectionVideo
        video={video}
        setCrud={setCrud}
        crud={crud}
      />
      <DeleteSectionVideo
        video={video}
        setCrud={setCrud}
        crud={crud}
      />
    </article>
  );
};

export default CardSectionVideo;
