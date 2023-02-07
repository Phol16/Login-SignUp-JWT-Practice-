import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'

const SignUpSuccess = () => {
  return (
    <section className={style.signUpSuccessContainer}>
    <h1>Success</h1>
    <p>
      <Link to={'/logIn'}>Sign In</Link>
    </p>
  </section>
  )
}

export default SignUpSuccess