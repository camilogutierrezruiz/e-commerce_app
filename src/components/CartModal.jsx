import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../redux/actions';
import LoginForm from '../styles/userlogin.module.css';

const CartModal = () => {

  const dispatch = useDispatch();
  const productsCart = useSelector(state => state.cart);
  console.log(productsCart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  return (
    <section className={LoginForm.cart__modal}>
      <h2>cart</h2>

    </section>
  );
};

export default CartModal;