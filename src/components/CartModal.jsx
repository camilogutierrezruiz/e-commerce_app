import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartProductsThunk } from "../redux/actions";
import LoginForm from "../styles/userlogin.module.css";

const CartModal = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);

  console.log(cartProducts);

  useEffect(() => {
    dispatch(getCartProductsThunk());
  }, [dispatch]);

  return (
    <section className={LoginForm.cart__modal}>
      <ul>
        {cartProducts.map((cartProduct) => (
          <li key={cartProduct.id}>
            <section>
              <Link to={`/productDetail/${cartProduct.id}`}>
                <h1>{cartProduct.title}</h1>
              </Link>
              <p>{cartProduct.brand}</p>
              <p>{`$${cartProduct.price}`}</p>
              <p>{cartProduct.quantity}</p>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CartModal;
