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

  let totalByProduct = [];
  let totalArray = 0;

  const getTotalProducts = () => {
    for (let i = 0; i < cartProducts.length; i++) {
      totalByProduct[i] = cartProducts[i]?.price * cartProducts[i]?.productsInCart.quantity;
    }

    for (let i = 0; i < totalByProduct.length; i++) {
      totalArray += totalByProduct[i];
    };

    return setTotal(totalArray)
  };

  console.log(total);


  useEffect(() => {
    dispatch(getCartProductsThunk());
    getTotalProducts();
  }, [dispatch, total]);

  return (
    <section className={LoginForm.cart__modal}>
      <h2>Cart</h2>
      <section>
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
      <section>
        <div>
          <div>
            <h2>
              Total
            </h2>
          </div>
          <div>
            <h2>
              {`$${total}`}
            </h2>
          </div>
        </div>
        <ButtonBase
          ButtonText={'Checkout'}
        />
      </section>
    </section>
  );
};

export default CartModal;
