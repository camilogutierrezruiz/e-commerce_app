import './App.css'
import HeaderStyles from './styles/header.module.css'
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';
import {
  Home,
  Shop,
  ProductDetail,
  Purchases
} from './pages'
import {
  LoadingScreen
} from './components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonBase } from './components';
import { getProductsThunk } from './redux/actions';

function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);

  return (
    <section className="App">
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <header className={HeaderStyles.header}>
          <section className={HeaderStyles.logo__wrapper}>
            <Link
              onClick={() => dispatch(getProductsThunk())}
              to='/'
              className={HeaderStyles.header__link}
            >
              <h1 className={HeaderStyles.header__logo}>e-commerce</h1>
            </Link>
          </section>
          <nav className={HeaderStyles.header__navbar}>
            <section className={HeaderStyles.nav__button}>
              <ButtonBase
                ButtonClassName={HeaderStyles.button}
                ButtonText={<i className="fa-solid fa-user"></i>}
              />
            </section>
            <section className={HeaderStyles.nav__button}>
              <ButtonBase
                ButtonClassName={HeaderStyles.button}
                ButtonText={<i className="fa-solid fa-box-archive"></i>}
              />
            </section>
            <section className={HeaderStyles.nav__button}>
              <ButtonBase
                ButtonClassName={HeaderStyles.button}
                ButtonText={<i className="fa-solid fa-cart-shopping"></i>}
              />
            </section>
          </nav>
        </header>
        <section className='ecommerce__main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/productdetail' element={<ProductDetail />} />
            <Route path='/purchases' element={<Purchases />} />
          </Routes>
        </section>
      </HashRouter>
    </section>
  );
}

export default App;
