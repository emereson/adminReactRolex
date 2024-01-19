import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreateSectionDescription = ({ crud, setCrud, section }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/section-description/${section.id}`;

    axios
      .post(url, data, config)
      .then((res) => {
        toast.success('The text  was created successfully');
      })
      .catch((err) => {
        toast.error('There was an error creating the text ');
        console.log(err);
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createSectionDescription'
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
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Create Text</h3>
        <div className="crud__div">
          <label htmlFor="description">Text:</label>
          <textarea
            {...register('description')}
            id="description"
            type="text"
            rows="8" // Establece el número de filas
            cols="50"
            required
          />
        </div>
        <button type="submit" className="crud__button">
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateSectionDescription;
