import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/actions';
import LoginForm from '../styles/userlogin.module.css';
import ButtonBase from './ButtonBase';

const UserLogin = ({ ShowUserLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  console.log(userFirstName);

  const submit = (event) => {
    event.preventDefault();
    const credentials = {
      email,
      password
    };
    dispatch(loginThunk(credentials))
      .then(response => {
        // console.log(response.data.data.user);
        localStorage.setItem('token', response.data.data.token);
        setUserFirstName(response.data.data.user.firstName);
        setEmail('');
        setPassword('');
        ShowUserLogin(false);
        setError('');
      })
      .catch(error => {
        setError(error.response.data.message);
      })
  };

  return (
    <section className={LoginForm.modal__wrapper}>
      {
        localStorage.getItem('token')
          ? <section>
            <div>
              <div><i className="fa-solid fa-circle-user"></i></div>
              <div>{userFirstName}</div>
            </div>
            <ButtonBase
              ButtonOnClick={() => {
                localStorage.setItem('token', '');
                ShowUserLogin(false);
              }}
              ButtonText={'Log Out'}
            />
          </section>
          : (
            <>
              <section>
                <p>john@gmail.com</p>
                <p>john1234</p>
              </section>
              <form onSubmit={submit}>
                <section>
                  <input
                    placeholder='email'
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                  />
                </section>
                <section>
                  <input
                    placeholder='password'
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                  />
                </section>
                <ButtonBase
                  ButtonType={'submit'}
                  ButtonText={'Sign in'}
                />
                <section>
                  <p>{error}</p>
                </section>
              </form>
            </>
          )
      }
    </section>
  );
};

export default UserLogin;
