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
import CreateGallery from '../components/oneSection/crudGallery/CreateGallery';
import DeleteGallery from '../components/oneSection/crudGallery/DeleteGallery';
import DeletePhotoGallery from '../components/oneSection/crudGallery/DeletePhotoGallery';
import OnseSectionGallery from '../components/oneSection/OnseSectionGallery';

const OneSection = () => {
  const { id } = useParams();
  const videoBlurRef = useRef(null);
  const videoRef = useRef(null);
  const [crud, setCrud] = useState('');
  const [section, setSection] = useState();
  const [select, setSelect] = useState('videos');

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
  console.log(select);

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
            style={
              select === 'videos'
                ? { color: 'red' }
                : { color: 'white' }
            }
            onClick={() => setSelect('videos')}
          >
            Videos
          </h2>
          <h2
            style={
              select === 'album'
                ? { color: 'red' }
                : { color: 'white' }
            }
            onClick={() => setSelect('album')}
          >
            Photo Album
          </h2>
          <h2
            style={
              select === 'gallery'
                ? { color: 'red' }
                : { color: 'white' }
            }
            onClick={() => setSelect('gallery')}
          >
            Gallery
          </h2>
        </article>
        {select === 'videos' ? (
          <p onClick={() => setCrud('createExample')}>Create Video</p>
        ) : select === 'album' ? (
          <p onClick={() => setCrud('createPhotoAlbum')}>
            Create Album
          </p>
        ) : (
          <p onClick={() => setCrud('CreateGallery')}>
            Create Gallery
          </p>
        )}
      </section>

      <section className="oneSection__videosPhotosContainer">
        {select === 'videos' ? (
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
        ) : select === 'album' ? (
          <OnseSectionPhotoAlbum
            section={section}
            crud={crud}
            setCrud={setCrud}
          />
        ) : (
          <OnseSectionGallery
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
      <CreateGallery
        section={section}
        crud={crud}
        setCrud={setCrud}
      />
      <DeleteGallery
        section={section}
        crud={crud}
        setCrud={setCrud}
      />
      <DeletePhotoGallery
        section={section}
        crud={crud}
        setCrud={setCrud}
      />
    </div>
  );
};

export default OneSection;
