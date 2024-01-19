import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './pagesStyle/login.css';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        const userDataJSON = JSON.stringify(res.data);
        localStorage.setItem('userData', userDataJSON);
        navigate('/');
        window.location.reload();
      })

      .catch((err) => {
        toast.error(err.data);
      });

    reset();
  };

  return (
    <div className="longin__container">
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <img src="/logo.png" alt="" />
        <h2>Log in as administrator</h2>
        <div className="login__div">
          <label htmlFor="email">Email:</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            required
          />
        </div>
        <div className="login__div">
          <label htmlFor="password">Password:</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            required
          />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
