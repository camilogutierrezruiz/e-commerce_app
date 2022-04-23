import HomeStyles from '../styles/home.module.css';
import ProductDetailStyles from '../styles/productdetail.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ButtonBase, ProductCard } from '../components';
import { getProductsThunk, setCartProductsThunk } from '../redux/actions';

const ProductDetail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [productImg, setproductImg] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (quantity < 1) {
    setQuantity(1);
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const productDetail = products.find(productItem => productItem.id === Number(id));

  useEffect(() => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productDetail?.category?.id}`)
      .then(response => {
        setProductsFiltered(response.data.data.products);
        setproductImg(productDetail?.productImgs[0]);
      })
  }, [productDetail?.category?.id, productDetail?.productImgs]);

  const similarProducts = productsFiltered.filter(products => products.id !== productDetail.id);

  const addProductToCart = () => {
    const productToCart = {
      id,
      quantity
    };
    dispatch(setCartProductsThunk(productToCart));
  };

  return (
    <div className={ProductDetailStyles.wrapper}>

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
        <h1 className={ProductDetailStyles.header__productname}>{productDetail?.title}</h1>
      </section>

      <section className={ProductDetailStyles.product__wrapper}>
        <section className={ProductDetailStyles.product__imgs}>
          <div className={ProductDetailStyles.main__img}>
            <img src={productImg} alt="" />
          </div>
          <div className={ProductDetailStyles.productImgs__others}>
            {productDetail?.productImgs.map(img => (
              <li
                onClick={() => setproductImg(img)}
                className={ProductDetailStyles.img__list}
                key={img}
              >
                {
                  <img className={ProductDetailStyles.imgs__others} src={img} alt="" />
                }
              </li>
            ))}
          </div>
        </section>
        <div className={ProductDetailStyles.product__description}>
          <div className={ProductDetailStyles.description}>
            <h1 className={ProductDetailStyles.description__productname}>{productDetail?.title}</h1>
            <p className={ProductDetailStyles.paragraph}>{productDetail?.description}</p>
          </div>
          <h2 className={ProductDetailStyles.price}>{`$${productDetail?.price}`}</h2>
          <section>
            <ButtonBase
              ButtonOnClick={() => {
                setQuantity(quantity - 1);
              }}
              ButtonText={'-'}
            />
            <div><p>{quantity}</p></div>
            <ButtonBase
              ButtonOnClick={() => {
                setQuantity(quantity + 1);
              }}
              ButtonText={'+'}
            />
          </section>
          <ButtonBase
            ButtonOnClick={() => {
              addProductToCart();
              setQuantity(1);
            }}
            ButtonWrapperClassName={ProductDetailStyles.description__cta_wrapper}
            ButtonClassName={ProductDetailStyles.description__cta}
            ButtonText={'Add to cart'}
          />
        </div>
      </section>

      <section className={ProductDetailStyles.similarproducts__title}>
        <h2>Similar products</h2>
      </section>

      <section>
        <ul className={ProductDetailStyles.similar__section}>
          {
            similarProducts.map(product => (
              <Link
                to={`/productDetail/${product.id}`}
                key={product.id}
                className={HomeStyles.product__card}
              >
                <ProductCard Product={product} />
              </Link>
            ))
          }
        </ul>
      </section>
    </div>
  );
};

export default ProductDetail;