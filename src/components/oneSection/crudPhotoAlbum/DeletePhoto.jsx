import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeletePhoto = ({ selectImg, crud, setCrud }) => {
  const handleSubmit = () => {
    const url = `${import.meta.env.VITE_URL_API}/photo-album/${
      selectImg?.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        toast.success('The Image was successfully deleted');
        setCrud('');
      })
      .catch((err) => {
        console.log(err);
        toast.error('There was an error deleting the Image');
        setCrud(''); // Mensaje de error
      });
  };
  console.log(crud);

  return (
    <div
      className={`crud__container  ${
        crud === `deletePhoto${selectImg?.id}`
          ? ''
          : 'closeCrud__container'
      }`}
    >
      <i
        onClick={() => {
          setCrud('');
        }}
        className="bx bxs-x-circle"
      ></i>
      <form className="crud__form">
        <h3>Are you sure you want to delete the Image</h3>

        <section className="crudForm__deleteButtons">
          <button
            type="submit"
            className="crud__button"
            onClick={handleSubmit}
          >
            Delete
          </button>
          <button
            type="submit"
            className=" crud__button crudForm__cancelDelete"
            onClick={() => setCrud('')}
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
};

export default DeletePhoto;
