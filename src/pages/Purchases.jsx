import ProductDetailStyles from '../styles/productdetail.module.css';
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
    <div>
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
      {purchases.map((purchase) => (
        <li key={purchase.id}>
          <section>
            <section>
              <h1>{purchase?.createdAt}</h1>
            </section>
            <section>
              {purchase?.cart?.products.map((product) => (
                <p key={product.id}>{product.title}</p>
              ))}
            </section>
          </section>
        </li>
      ))}
    </div>
  );
};

export default Purchases;
