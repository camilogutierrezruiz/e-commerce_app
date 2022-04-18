import axios from 'axios';
import { useState } from 'react';
import LoginForm from '../styles/userlogin.module.css';
import ButtonBase from './ButtonBase';

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  localStorage.setItem('Number', '10')

  const submit = (event) => {
    event.preventDefault();
    const credentials = {
      email,
      password
    };
    axios
      .post(`https://ecommerce-api-react.herokuapp.com/api/v1/users/login`, credentials)
      .then(response => {
        console.log(response.data.data.token);
      })
  };

  return (
    <section className={LoginForm.modal__wrapper}>
      <section>
        <p>john@gmail.com</p>
        <p>john1234</p>
      </section>
      <form onSubmit={submit}>
        <input
          placeholder='email'
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
        <input
          placeholder='password'
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
        <ButtonBase
          ButtonType={'submit'}
          ButtonText={'Sign in'}
        />
      </form>
    </section>
  );
};

export default UserLogin;
