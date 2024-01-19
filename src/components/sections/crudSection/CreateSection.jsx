import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';
import ViewSelectImg from '../../../hooks/ViewSelectImg';
import ViewSelectVideo from '../../../hooks/ViewSelectVideo';

const CreateSection = ({ crud, setCrud }) => {
  // Para las imágenes
  const {
    selectedImage,
    selectedFileImg,
    handleImageChange,
    handleOnClickImg,
    deleteSelectImgClick,
  } = ViewSelectImg({ idElementImg: 'sectionImg' });

  // Para los videos
  const {
    selectedVideo,
    selectedFileVideo,
    handleVideoChange,
    handleOnClickVideo,
    deleteSelectVideoClick,
  } = ViewSelectVideo({ idElementVideo: 'sectionVideo' });

  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/section/`;
    const formData = new FormData();
    formData.append('title', data.title);

    if (selectedFileImg) {
      formData.append('sectionImg', selectedFileImg);
    }

    if (selectedFileVideo) {
      formData.append('video', selectedFileVideo);
    }

    axios
      .post(url, formData, config)
      .then((res) => {
        toast.success('The section was created successfully');
        deleteSelectImgClick();
        deleteSelectVideoClick();
      })
      .catch((err) => {
        toast.error('There was an error creating the section');
        console.log(err);
        deleteSelectImgClick();
        deleteSelectVideoClick();
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createSection' ? '' : 'closeCrud__container'
      }`}
    >
      <i
        onClick={() => {
          setCrud('');
          deleteSelectImgClick();
          deleteSelectVideoClick();
        }}
        className="bx bxs-x-circle"
      ></i>
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Create Section</h3>
        <div className="crud__div">
          <label htmlFor="title">Ttile:</label>
          <input
            {...register('title')}
            id="title"
            type="text"
            required
          />
        </div>
        <div className="crud__div">
          <label htmlFor="sectionVideo">Select Video:</label>
          <div className="custom-file-input">
            <input
              id="sectionVideo"
              type="file"
              onChange={handleVideoChange}
              required
              style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
            />
            <i
              className="bx bxs-video-plus"
              onClick={handleOnClickVideo}
            ></i>
          </div>
          <div className="video__preview">
            {selectedVideo && (
              <video controls className="crud__formVideo">
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className="crud__div">
          <label htmlFor="sectionImg">select image :</label>
          <div className="custom-file-input">
            <input
              id="sectionImg"
              type="file"
              onChange={handleImageChange}
              required
              style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
            />
            <i
              className="bx bxs-image-add"
              onClick={handleOnClickImg}
            ></i>
          </div>
          <div className="image__preview">
            {selectedImage && (
              <img src={selectedImage} alt="Preview" />
            )}
          </div>
        </div>
        <button type="submit" className="crud__button">
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateSection;
