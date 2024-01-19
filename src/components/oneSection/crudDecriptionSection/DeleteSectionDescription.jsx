import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeleteSectionDescription = ({ description, crud, setCrud }) => {
  const handleSubmit = () => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/section-description/${description.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        toast.success('The text was successfully deleted');
        setCrud('');
      })
      .catch((err) => {
        console.log(err);
        toast.error('There was an error deleting the text');
        setCrud(''); // Mensaje de error
      });
  };

  return (
    <div
      className={`crud__container  ${
        crud === `deleteSectionDescription${description.id}`
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
        <h3>
          Are you sure you want to delete the text:{' '}
          {description?.description} ?
        </h3>

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

export default DeleteSectionDescription;
