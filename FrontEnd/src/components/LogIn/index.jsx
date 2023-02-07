import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'

const Login = () => {
  const [errMsg, setErrMsg]= useState('')
  return (
    <div className={style.logInContainer}>
      {errMsg && <p>{errMsg}</p>}
      <form className={style.logInForm}>
        <label htmlFor="username">Username:</label>
        <input type="text" id='username' className={style.logInInput}/>
        <label htmlFor="password">Password:</label>
        <input type="password" id='password' className={style.logInInput}/>
        <section className={style.buttonContainer}>
        <Link to='/signUp'><button type='button' className={style.signUpButton}>Sign Up</button></Link>
        <Link><button type='submit'>Log In</button></Link>
        </section>
      </form>
    </div>
  )
}

export default Login