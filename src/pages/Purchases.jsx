import ProductDetailStyles from '../styles/productdetail.module.css';
import PurchasesStyles from '../styles/purchases.module.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../redux/actions";
import { Link } from 'react-router-dom';

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  return (
    <section className={PurchasesStyles.page__wrapper}>
      <section className={ProductDetailStyles.header}>
        <Link
          className={ProductDetailStyles.header__homeroute}
          to='/'
        >
          <h1>Home</h1>
        </Link>
        <div className={ProductDetailStyles.header__separator}>
          <i className="fas fa-chevron-down"></i>
        </div>
        <h1 className={ProductDetailStyles.header__productname}>Purchases</h1>
      </section>
      <main className={PurchasesStyles.purchases__main}>
        {purchases.map((purchase) => (
          <section
            className={PurchasesStyles.purchase__wrapper}
            key={purchase.id}
          >
            <section className={PurchasesStyles.purchase__info}>
              <section className={PurchasesStyles.purchase__date}>
                <h1>{purchase?.createdAt}</h1>
              </section>
              <div className={PurchasesStyles.purchase__separator}></div>
              <section className={PurchasesStyles.purchase__product}>
                {purchase?.cart?.products.map((product) => (
                  <section
                    className={PurchasesStyles.product__info}
                    key={product.id}
                  >
                    <div className={`${PurchasesStyles.product} ${PurchasesStyles.product__title}`}>
                      <Link
                        className={PurchasesStyles.link__title}
                        to={`/productdetail/${product.id}`}
                      >
                        <p>
                          {product.title}
                        </p>
                      </Link>
                    </div>
                    <div className={`${PurchasesStyles.product} ${PurchasesStyles.product__quantity}`}>
                      <p>
                        {product.productsInCart.quantity}
                      </p>
                    </div>
                    <div className={`${PurchasesStyles.product} ${PurchasesStyles.product__price}`}>
                      <p>
                        {`$${product.price}`}
                      </p>
                    </div>
                  </section>
                ))}
              </section>
            </section>
          </section>
        ))}
      </main>
    </section>
  );
};

export default Purchases;
