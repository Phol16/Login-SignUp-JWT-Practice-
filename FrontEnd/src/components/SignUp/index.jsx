import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';
import style from './style.module.css';
import { Link } from 'react-router-dom';

const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const REGISTER_URL = '/users';

const SignUp = ({ setSuccess }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = user_regex.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = password_regex.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${REGISTER_URL}/signUp`, JSON.stringify({ username: user, password }), {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      setSuccess(true); // setting the value of the function as true so that parent compnent will get the value
    } catch (error) {
      console.log(error)
      setErrMsg(`${error.response.data.message}`);
    }
  };

  return (
    <section className={style.signUpContainer}>
      {errMsg && <p>{errMsg}</p>}
      <form className={style.signUpForm} onSubmit={handleSubmit}>
        <label htmlFor='username' className={style.signUpLabel}>
          Username:
          <span className={validName ? style.valid : style.hide}>
            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
          </span>
          <span className={validName || !user ? style.hide : style.invalid}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
          </span>
        </label>
        <input
          className={style.signUpInput}
          type='text'
          id='username'
          ref={userRef}
          required
          autoComplete='off'
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onChange={(e) => {
            setUser(e.target.value);
          }}
          onFocus={() => {
            setUserFocus(true);
          }}
          onBlur={() => {
            setUserFocus(false);
          }}
        />
        <p id='uidnote' className={userFocus && user && !validName ? style.instruction : style.offscreen}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '2px' }} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hypens allowed.
        </p>
        <label htmlFor='password' className={style.signUpLabel}>
          Password:
          <span className={validPassword ? style.valid : style.hide}>
            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
          </span>
          <span className={validPassword || !password ? style.hide : style.invalid}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
          </span>
        </label>
        <input
          className={style.signUpInput}
          type='password'
          id='password'
          ref={userRef}
          required
          autoComplete='off'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onFocus={() => {
            setPasswordFocus(true);
          }}
          onBlur={() => {
            setPasswordFocus(false);
          }}
        />
        <p className={passwordFocus && password && !validPassword ? style.instruction : style.offscreen}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '2px' }} />
          9 to 25 characters. <br />
          Must have an uppercase and lowercase letters, and a number and a special character. <br />
          Allowed special character ! @ # $ % ..
        </p>
        <label htmlFor='confirmPassword' className={style.signUpLabel}>
          Confirm Password:
          <span className={validMatch && matchPassword ? style.valid : style.hide}>
            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
          </span>
          <span className={validMatch || !matchPassword ? style.hide : style.invalid}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
          </span>
        </label>
        <input
          className={style.signUpInput}
          type='password'
          id='confirmPassword'
          ref={userRef}
          required
          autoComplete='off'
          onChange={(e) => {
            setMatchPassword(e.target.value);
          }}
          onFocus={() => {
            setMatchFocus(true);
          }}
          onBlur={() => {
            setMatchFocus(false);
          }}
        />
        <p className={matchFocus && matchPassword && !validMatch ? style.instruction : style.offscreen}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '2px' }} />
          Must be the same with password
        </p>
        <button className={style.signUpButton} disabled={!validName || !validPassword || !validMatch ? true : false}> Sign Up</button>
      </form>
      <section className={style.signInContainer}>
        <p>Already registered?</p>
        <Link to={'/logIn'} className={style.signInButton}>Sign In</Link>
      </section>
    </section>
  );
};

export default SignUp;
