import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './pagesStyle/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const userDataJSON = localStorage.getItem('userData');
  const navigate = useNavigate();
  const userData = JSON.parse(userDataJSON);
  const location = useLocation();
  const [url, setUrl] = useState('/');

  useEffect(() => {
    setUrl(location.pathname);
  }, [location.pathname]);

  return (
    <header className="header__container">
      <img src="/logo.png" alt="" />
      <ul className="header__ul">
        <li>
          <Link
            to="/"
            style={
              url === '/' ? { color: 'var(--text-color-blue)' } : {}
            }
          >
            Your Sections
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            style={
              url === '/users'
                ? { color: 'var(--text-color-blue)' }
                : {}
            }
          >
            Your Users
          </Link>
        </li>
        <li
          onClick={() => {
            localStorage.clear();
            window.location.reload();
            navigate('/');
          }}
        >
          Sign Off
        </li>
      </ul>
    </header>
  );
};

export default Header;
