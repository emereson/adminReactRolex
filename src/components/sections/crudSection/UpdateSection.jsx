import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';
import ViewSelectImg from '../../../hooks/ViewSelectImg';

const UpdateSection = ({ crud, setCrud, section }) => {
  const {
    selectedImage,
    selectedFileImg,
    handleImageChange,
    handleOnClickImg,
    deleteSelectImgClick,
  } = ViewSelectImg({ idElementImg: `sectionImg${section.id}` });

  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/section/${
      section.id
    }`;
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('linkVideo', data.linkVideo);
    if (selectedFileImg) {
      formData.append('sectionImg', selectedFileImg);
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
        crud === `updateSection${section?.id}`
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
          <label htmlFor="linkVideo">Video Link :</label>
          <input
            {...register('linkVideo')}
            id="linkVideo"
            type="text"
            required
          />
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
