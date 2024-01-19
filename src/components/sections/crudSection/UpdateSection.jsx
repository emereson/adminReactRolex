import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';
import ViewSelectImg from '../../../hooks/ViewSelectImg';
import ViewSelectVideo from '../../../hooks/ViewSelectVideo';

const UpdateSection = ({ crud, setCrud, section }) => {
  const {
    selectedImage,
    selectedFileImg,
    handleImageChange,
    handleOnClickImg,
    deleteSelectImgClick,
  } = ViewSelectImg({ idElementImg: `sectionImg${section.id}` });

  // Para los videos
  const {
    selectedVideo,
    selectedFileVideo,
    handleVideoChange,
    handleOnClickVideo,
    deleteSelectVideoClick,
  } = ViewSelectVideo({
    idElementVideo: `sectionVideo${section.id}`,
  });

  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/section/${
      section.id
    }`;
    const formData = new FormData();
    formData.append('title', data.title);
    if (selectedFileImg) {
      formData.append('sectionImg', selectedFileImg);
    }

    if (selectedFileVideo) {
      formData.append('video', selectedFileVideo);
    }

    axios
      .patch(url, formData, config)
      .then((res) => {
        toast.success('changes were saved successfully');
        deleteSelectImgClick();
        deleteSelectVideoClick();
        setCrud('');
      })
      .catch((err) => {
        toast.error('There was an error saving changes');
        deleteSelectImgClick();
        deleteSelectVideoClick();
        setCrud('');
        console.log(err);
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === `updateSection${section?.id}`
          ? ''
          : 'closeCrud__container'
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
        <h3>EDIT {section?.title}</h3>
        <div className="crud__div">
          <label htmlFor="title">Title:</label>
          <input
            {...register('title')}
            id="title"
            type="text"
            defaultValue={section?.title}
            required
          />
        </div>

        <div className="crud__div">
          <label htmlFor={`sectionVideo${section.id}`}>
            Select Video:
          </label>
          <div className="custom-file-input">
            <input
              id={`sectionVideo${section.id}`}
              type="file"
              onChange={handleVideoChange}
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
          <label htmlFor={`sectionImg${section.id}`}>
            select image :
          </label>
          <div className="custom-file-input">
            <input
              id={`sectionImg${section.id}`}
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <i
              className="bx bxs-image-add"
              onClick={handleOnClickImg}
            ></i>
          </div>
        </div>
        <div className="image__preview">
          {selectedImage && <img src={selectedImage} alt="Preview" />}
        </div>
        <button type="submit" className="crud__button">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default UpdateSection;
