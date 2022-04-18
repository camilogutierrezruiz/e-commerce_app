import HomeStyles from '../styles/home.module.css';
import { ButtonBase } from '../components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterCategoryByIdThunk,
  filterCategoryByQueryThunk,
  getProductsThunk,
  setCategoriesThunk
} from '../redux/actions';
import {
  ProductCard,
  NoProductsFoundMessage
} from '../components';
import { Link } from 'react-router-dom';

const Home = () => {

  const [headLine, setHeadLine] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(setCategoriesThunk());
  }, [dispatch]);

  const submitByQuery = (event) => {
    event.preventDefault();
    dispatch(filterCategoryByQueryThunk(headLine[0].toUpperCase() + headLine.slice(1)));
    setHeadLine('');
  };

  return (
    <section className={HomeStyles.home_page}>

      <aside className={HomeStyles.home__aside}>
        <section className={HomeStyles.home__categories}>
          <div className={HomeStyles.categories__title}>
            <h2>Categories</h2>
          </div>
          <ul className={HomeStyles.categories__list}>
            <ButtonBase
              ButtonWrapperClassName={HomeStyles.aside__buttonwrapper}
              ButtonClassName={HomeStyles.aside__button}
              ButtonOnClick={() => dispatch(getProductsThunk())}
              ButtonText={'All products'}
            />
            {
              categories.map(categorie => (
                <ButtonBase
                  ButtonWrapperClassName={HomeStyles.aside__buttonwrapper}
                  ButtonClassName={HomeStyles.aside__button}
                  key={categorie.id}
                  ButtonOnClick={() => dispatch(filterCategoryByIdThunk(categorie.id))}
                  ButtonText={categorie.name}
                />
              ))
            }
          </ul>
        </section>
      </aside>

      <main className={HomeStyles.home__main}>

        <section className={HomeStyles.searchform__wrapper}>
          <form
            onSubmit={submitByQuery}
            className={HomeStyles.home__form}
          >
            <input
              type="text"
              placeholder='Search product'
              className={HomeStyles.home__forminput}
              onChange={(event) => setHeadLine(event.target.value)}
              value={headLine}
            />
            <ButtonBase
              ButtonWrapperClassName={HomeStyles.formbutton__wrapper}
              ButtonClassName={HomeStyles.home__formbutton}
              ButtonType={'submit'}
              ButtonText={<i className="fa-solid fa-magnifying-glass"></i>}
            />
          </form>
        </section>

        <ul className={HomeStyles.products__wrapper}>
          {
            products.length > 0 ? (
              products.map(product => (
                <Link to={`/productDetail/${product.id}`}
                  key={product.id}
                  className={HomeStyles.product__card}
                >
                  <ProductCard Product={product} />
                </Link>
              ))
            ) : (
              <NoProductsFoundMessage />
            )
          }
        </ul>
      </main>
    </section>
  );
};

export default Home;