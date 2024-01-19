import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './pagesStyle/oneSection.css';
import OneSectionFrontPage from '../components/oneSection/OneSectionFrontPage';
import CardSectionVideo from '../components/oneSection/CardSectionVideo';
import CreateSectionVideo from '../components/oneSection/crudSectionVideo/CreateSectionVideo';
import CreatePhotoAlbum from '../components/oneSection/crudPhotoAlbum/CreatePhotoAlbum';
import DeletePhotoAlbum from '../components/oneSection/crudPhotoAlbum/DeletePhotoAlbum';
import OnseSectionPhotoAlbum from '../components/oneSection/OnseSectionPhotoAlbum';

const OneSection = () => {
  const { id } = useParams();
  const videoBlurRef = useRef(null);
  const videoRef = useRef(null);
  const [crud, setCrud] = useState('');
  const [section, setSection] = useState();
  const [videos, setVideos] = useState(true);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section/${id}`;

    axios
      .get(url)
      .then((res) => setSection(res.data.section))
      .catch((err) => console.log(err));
  }, [crud]);

  useEffect(() => {
    if (section && videoBlurRef.current && videoRef.current) {
      const playVideos = () => {
        videoBlurRef.current.play();
        videoRef.current.play();
      };

      setTimeout(playVideos, 100); // Ajusta el tiempo según sea necesario

      return () => {
        videoBlurRef.current.removeEventListener(
          'loadeddata',
          playVideos
        );
        videoRef.current.removeEventListener(
          'loadeddata',
          playVideos
        );
      };
    }
  }, [section, id]);

  return (
    <div className="oneSection__container">
      {section ? (
        <OneSectionFrontPage
          section={section}
          crud={crud}
          setCrud={setCrud}
        />
      ) : (
        ''
      )}
      <section className="oneSection__exampleContianer">
        <article>
          <h2
            style={videos ? { color: 'red' } : { color: 'white' }}
            onClick={() => setVideos(true)}
          >
            Videos
          </h2>
          <h2
            style={videos ? { color: 'white' } : { color: 'red' }}
            onClick={() => setVideos(false)}
          >
            Photo Album
          </h2>
        </article>
        {videos ? (
          <p onClick={() => setCrud('createExample')}>Create Video</p>
        ) : (
          <p onClick={() => setCrud('createPhotoAlbum')}>
            Create Album
          </p>
        )}
      </section>

      <section className="oneSection__videosPhotosContainer">
        {videos ? (
          <div className="oneSection__videosContainer">
            {section?.sectionVideos
              .sort((a, b) => new Date(a.id) - new Date(b.id))
              .map((video) => (
                <CardSectionVideo
                  key={video.id}
                  video={video}
                  crud={crud}
                  setCrud={setCrud}
                />
              ))}
          </div>
        ) : (
          <OnseSectionPhotoAlbum
            section={section}
            crud={crud}
            setCrud={setCrud}
          />
        )}
      </section>
      <CreateSectionVideo
        section={section}
        crud={crud}
        setCrud={setCrud}
      />
      <CreatePhotoAlbum
        section={section}
        crud={crud}
        setCrud={setCrud}
      />
      <DeletePhotoAlbum
        section={section}
        crud={crud}
        setCrud={setCrud}
      />
    </div>
  );
};

export default OneSection;
