import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../pages/pagesStyle/crudStyle.css';
import config from '../../utils/getToken';

const UpdateUser = ({ crud, setCrud, selectUser }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/${
      selectUser?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        toast.success('The user was edited successfully.');
        setCrud('');
      })
      .catch((err) => {
        console.log(err);
        toast.error('There was an error editing the user.');
        setCrud('');
      });
    reset();
  };
  return (
    <div
      className={`crud__container  ${
        crud === 'updateUser' ? '' : 'closeCrud__container'
      }`}
    >
      <i onClick={() => setCrud('')} className="bx bxs-x-circle"></i>
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Edit User</h3>
        <div className="crud__div">
          <label htmlFor="updateName">Name:</label>
          <input
            {...register('name')}
            id="updateName"
            type="text"
            defaultValue={selectUser?.name}
            required
          />
        </div>

        <button type="submit" className="crud__button">
          Edit
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
