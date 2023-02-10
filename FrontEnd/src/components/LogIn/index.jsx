import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import style from './style.module.css';

const REGISTER_URL = '/users';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log('login');
    try {
      const response = await axios.post(`${REGISTER_URL}/logIn`, JSON.stringify({ username, password }), { headers: { 'Content-Type': 'application/json' } });
      console.log(response);
    } catch (error) {
      console.log(error)
      setErrMsg(`${error.response.data.message}`);
    }
  };

  return (
    <div className={style.logInContainer}>
      {errMsg && <p>{errMsg}</p>}
      <form className={style.logInForm} onSubmit={handleLogIn}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          className={style.logInInput}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrMsg('');
          }}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          className={style.logInInput}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrMsg('')
          }}
        />
        <section className={style.buttonContainer}>
          <Link to='/signUp'>
            <button type='button' className={style.signUpButton}>
              Sign Up
            </button>
          </Link>
          <button type='submit'>Log In</button>
        </section>
      </form>
    </div>
  );
};

export default Login;
