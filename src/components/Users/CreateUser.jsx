import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../pages/pagesStyle/crudStyle.css';
const CreateUser = ({ crud, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/signup`;

    axios
      .post(url, data)
      .then((res) => {
        toast.success('The user was created successfully');
        setCrud('');
      })
      .catch((err) => {
        console.log(err);
        toast.error('There was an error creating the user');
        setCrud('');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createUser' ? '' : 'closeCrud__container'
      }`}
    >
      <i onClick={() => setCrud('')} className="bx bxs-x-circle"></i>
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Created User</h3>
        <div className="crud__div">
          <label htmlFor="name">Name:</label>
          <input
            {...register('name')}
            id="name"
            type="text"
            required
          />
        </div>
        <div className="crud__div">
          <label htmlFor="email">Email:</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            required
          />
        </div>

        <div className="crud__div">
          <label htmlFor="password">Password:</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            required
          />
        </div>

        <button type="submit" className="crud__button">
          Created User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
