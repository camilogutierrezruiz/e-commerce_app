import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delCartProductThunk, getCartProductsThunk } from "../redux/actions";
import LoginForm from "../styles/userlogin.module.css";
import ButtonBase from "./ButtonBase";

const CartModal = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);

  useEffect(() => {
    dispatch(getCartProductsThunk());
  }, [dispatch]);

  return (
    <section className={LoginForm.cart__modal}>
      <h2>Cart</h2>
      {cartProducts.map((cartProduct) => (
        <li
          className={LoginForm.product__card}
          key={cartProduct.id}
        >
          <section>
            <Link to={`/productDetail/${cartProduct.id}`}>
              <h1>{cartProduct.title}</h1>
            </Link>
            <p>{cartProduct.brand}</p>
            <p>{`$${cartProduct.price}`}</p>
            <p>{cartProduct.quantity}</p>
          </section>
          <ButtonBase
            ButtonOnClick={() => {
              dispatch(delCartProductThunk(cartProduct.id));
              dispatch(getCartProductsThunk());
            }}
            ButtonText={<i className="fa-solid fa-trash-can"></i>}
          />
        </li>
      ))}
    </section>
  );
};

export default CartModal;
