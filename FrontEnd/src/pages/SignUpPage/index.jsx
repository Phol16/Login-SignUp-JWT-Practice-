import React, { useState } from 'react';
import style from './style.module.css'
import SignUp from '../../components/SignUp';
import SignUpSuccess from '../../components/SignUpSuccess';

const SignUpPage = () => {
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  
  //creating a function to be pass in child component 
  const success = (e)=>{
    setSignUpSuccess(e)
  }
  console.log(signUpSuccess)
  return (
  <div className={style.container}>
  {signUpSuccess ? <SignUpSuccess /> : <SignUp setSuccess={success} />}
  </div>
  )
};

export default SignUpPage;
