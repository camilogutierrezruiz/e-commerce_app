import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../redux/actions';

const ProductDetail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const productDetail = products.find(productItem => productItem.id === Number(id));

  useEffect(() => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productDetail.category.id}`)
      .then(response => {
        setProductsFiltered(response.data.data.products);
      })
  }, [productDetail.category.id]);

  const similarProducts = productsFiltered.filter(products => products.id !== productDetail.id)
  console.log(similarProducts);

  return (
    <div>
      <h1>{productDetail.title}</h1>
      <img src={productDetail.productImgs[0]} alt="" />
      <p>{productDetail.description}</p>
      <section>
        <ul>
          {
            similarProducts.map(product => (
              <Link to={`/productDetail/${product.id}`}
                key={product.id}
              >
                {product.title}
              </Link>
            ))
          }
        </ul>
      </section>
    </div>
  );
};

export default ProductDetail;