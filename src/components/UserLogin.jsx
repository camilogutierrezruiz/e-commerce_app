import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk, setIsLoading } from '../redux/actions';
import LoginForm from '../styles/userlogin.module.css';
import ButtonBase from './ButtonBase';

const UserLogin = ({ ShowUserLogin }) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        localStorage.setItem('userName', `${response.data.data.user.firstName} ${response.data.data.user.lastName}`);
        setEmail('');
        setPassword('');
        ShowUserLogin(false);
        setError('');
      })
      .catch(error => {
        setError('Invalid value. Please try again.');
      })
  };

  return (
    <section className={LoginForm.login__wrapper}>
      {
        localStorage.getItem('token') ? (
          <section className={LoginForm.logout__view}>
            <div className={LoginForm.logout__userinfo}>
              <div className={LoginForm.logout__iconimg}><i className="fa-solid fa-circle-user"></i></div>
              <div className={LoginForm.logout__username}><h3>{localStorage.getItem('userName')}</h3></div>
            </div>
            <ButtonBase
              ButtonWrapperClassName={LoginForm.logout__buttonwrapper}
              ButtonClassName={LoginForm.logout__logoutbutton}
              ButtonType='button'
              ButtonOnClick={() => {
                dispatch(setIsLoading(true));
                setTimeout(() => {
                  localStorage.setItem('token', '');
                  localStorage.setItem('userName', '');
                  ShowUserLogin(false);
                  dispatch(setIsLoading(false));
                }, 300);
              }}
              ButtonText={'Log Out'}
            />
          </section>
        ) : (
          <section className={LoginForm.logout__view}>
            <section className={LoginForm.info__login}>
              <p>john@gmail.com</p>
              <p>john1234</p>
            </section>
            <form onSubmit={submit} className={LoginForm.form__wrapper}>
              <section className={LoginForm.input__wrapper}>
                <input
                  className={LoginForm.input}
                  placeholder='email'
                  type="email"
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
              </section>
              <section className={LoginForm.input__wrapper}>
                <input
                  className={LoginForm.input}
                  placeholder='password'
                  type="password"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </section>
              <section className={LoginForm.error__message}>
                <p>{error}</p>
              </section>
              <ButtonBase
                ButtonWrapperClassName={LoginForm.logout__buttonwrapper}
                ButtonClassName={LoginForm.logout__logoutbutton}
                ButtonType={'submit'}
                ButtonText={'Sign in'}
              />
            </form>
          </section>
        )
      }
    </section>
  );
};

export default UserLogin;
