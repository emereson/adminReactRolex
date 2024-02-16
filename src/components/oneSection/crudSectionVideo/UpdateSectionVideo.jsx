import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';
import ViewSelectImg from '../../../hooks/ViewSelectImg';

const UpdateSectionVideo = ({ crud, setCrud, video }) => {
  const {
    selectedImage,
    selectedFileImg,
    handleImageChange,
    handleOnClickImg,
    deleteSelectImgClick,
  } = ViewSelectImg({ idElementImg: `exampleImg${video.id}` });

  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/section-video/${
      video.id
    }`;
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('linkVideo', data.linkVideo);

    if (selectedFileImg) {
      formData.append('linkImg', selectedFileImg);
    }

    axios
      .patch(url, formData, config)
      .then((res) => {
        toast.success('changes were saved successfully');
        deleteSelectImgClick();

        setCrud('');
      })
      .catch((err) => {
        toast.error('There was an error saving changes');
        deleteSelectImgClick();
        setCrud('');
        console.log(err);
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === `updateExample${video?.id}`
          ? ''
          : 'closeCrud__container'
      }`}
    >
      <i
        onClick={() => {
          setCrud('');
          deleteSelectImgClick();
        }}
        className="bx bxs-x-circle"
      ></i>
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>EDIT {video?.title}</h3>
        <div className="crud__div">
          <label htmlFor="title">Title:</label>
          <input
            {...register('title')}
            id="title"
            type="text"
            defaultValue={video?.title}
          />
        </div>
        <div className="crud__div">
          <label htmlFor="linkVideo">Video Link:</label>
          <input
            {...register('linkVideo')}
            id="linkVideo"
            type="text"
            defaultValue={video?.linkVideo}
          />
        </div>

        <div className="crud__div">
          <label htmlFor={`exampleImg${video.id}`}>
            select image :
          </label>
          <div className="custom-file-input">
            <input
              id={`exampleImg${video.id}`}
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

export default UpdateSectionVideo;
