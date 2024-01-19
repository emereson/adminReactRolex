import React, { useEffect, useState } from 'react';
import CreateUser from '../components/Users/CreateUser';
import axios from 'axios';
import config from '../utils/getToken';
import TableUsers from '../components/Users/TableUsers';
import UpdateUser from '../components/Users/UpdateUser';
import DeleteUser from '../components/Users/DeleteUser';
import './pagesStyle/users.css';

const Users = () => {
  const [crud, setCrud] = useState('');
  const [allUsers, setallUsers] = useState();
  const [selectUser, setSelectUser] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user`;
    axios
      .get(url, config)
      .then((res) => {
        setallUsers(res.data.users);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);

  return (
    <div className="user__container">
      <article className=" user__titleCreate">
        <h2>Tus Usuarios</h2>
        <p onClick={() => setCrud('createUser')}>Crear Usuario</p>
      </article>
      <TableUsers
        allUsers={allUsers}
        setSelectUser={setSelectUser}
        setCrud={setCrud}
      />
      <CreateUser setCrud={setCrud} crud={crud} />

      <UpdateUser
        setCrud={setCrud}
        crud={crud}
        selectUser={selectUser}
      />
      <DeleteUser
        setCrud={setCrud}
        crud={crud}
        selectUser={selectUser}
      />
    </div>
  );
};

export default Users;
