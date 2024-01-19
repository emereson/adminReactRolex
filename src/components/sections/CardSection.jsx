import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateSection from './crudSection/UpdateSection';
import DeleteSection from './crudSection/DeleteSection';

const CardSection = ({ section, setCrud, crud }) => {
  const [viewTitle, setViewTitle] = useState(false);
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

  return (
    <div
      className={`cardSection__container ${
        viewTitle ? 'cardSection__viewTitle' : ''
      } `}
      onMouseOver={() => setViewTitle(true)}
      onMouseOut={() => setViewTitle(false)}
    >
      <img src={section.sectionImg} alt={section.title} />
      <video
        ref={videoBlurRef}
        muted
        loop
        className={`cardSection__blurVideo ${
          !viewTitle ? 'close__blurVideo' : ''
        }`}
      >
        <source src={section.linkVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoRef}
        muted
        loop
        className={`cardSection__video  ${
          !viewTitle ? 'close__video' : ''
        }`}
      >
        <source src={section.linkVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
