import React, { useEffect, useState } from 'react';

const TableUsers = ({ allUsers, setSelectUser, setCrud }) => {
  return (
    <table className="tableUsers__container">
      <thead>
        <tr>
          <th>Name </th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {allUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>

            <td>
              <p
                onClick={() => {
                  setSelectUser(user);
                  setCrud('updateUser');
                }}
              >
                edit
              </p>
            </td>
            <td>
              <p
                onClick={() => {
                  setSelectUser(user);
                  setCrud('deleteUser');
                }}
              >
                delete
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUsers;
