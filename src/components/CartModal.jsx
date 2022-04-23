import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delCartProductThunk, getCartProductsThunk } from "../redux/actions";
import LoginForm from "../styles/userlogin.module.css";
import ButtonBase from "./ButtonBase";

const CartModal = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(getCartProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    let totalByProduct = [];
    let totalArray = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      totalByProduct[i] = cartProducts[i]?.price * cartProducts[i]?.productsInCart.quantity;
    }

    for (let i = 0; i < totalByProduct.length; i++) {
      totalArray += totalByProduct[i];
    };

    setTotal(totalArray);
  }, [cartProducts]);

  return (
    <section className={LoginForm.cart__modal}>
      <div className={LoginForm.title__wrapper}>
        <h2 className={LoginForm.cart__title}>Cart</h2>
      </div>
      <section className={LoginForm.products__wrapper}>
        <div className={LoginForm.cart__wrapper}>
          {cartProducts.map((cartProduct) => (
            <li
              className={LoginForm.product__card}
              key={cartProduct.id}
            >
              <section className={LoginForm.product__info}>
                <div className={LoginForm.product__brand}><p>{cartProduct.brand}</p></div>
                <Link
                  className={LoginForm.card__title}
                  to={`/productDetail/${cartProduct.id}`}>
                  <h1>{cartProduct.title}</h1>
                </Link>
                <section className={LoginForm.card__info}>
                  <section className={LoginForm.card__price}>
                    <p className={LoginForm.card__price_title}>Price</p>
                    <p className={LoginForm.card__price_price}>{`$${cartProduct.price}`}</p>
                  </section>
                  <section className={LoginForm.card__quantity}>
                    <p className={LoginForm.card__quantity__title}>Quantity</p>
                    <p className={LoginForm.card__quantity__quantity}>{cartProduct.productsInCart.quantity}</p>
                  </section>
                </section>
              </section>
              <ButtonBase
                ButtonWrapperClassName={LoginForm.cardbutton__wrapper}
                ButtonClassName={LoginForm.cardbutton__button}
                ButtonOnClick={() => {
                  dispatch(delCartProductThunk(cartProduct.id));
                  dispatch(getCartProductsThunk());
                }}
                ButtonText={<i className="fa-solid fa-trash"></i>}
              />
            </li>
          ))}
        </div>
      </section>
      <section className={LoginForm.purchase__wrapper}>
        <div className={LoginForm.total}>
          <div className={LoginForm.total__title}>
            <h2>
              Total:
            </h2>
          </div>
          <div className={LoginForm.total__price}>
            <h2>
              {`$${total}`}
            </h2>
          </div>
        </div>
        <ButtonBase
          ButtonWrapperClassName={LoginForm.total__buttonwrapper}
          ButtonClassName={LoginForm.total__button}
          ButtonText={'Checkout'}
        />
      </section>
    </section>
  );
};

export default CartModal;
