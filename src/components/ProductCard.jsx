import ProductCardStyles from "../styles/productcard.module.css";
import ButtonBase from "./ButtonBase";

const ProductCard = ({ Product }) => {
  return (
    <section className={ProductCardStyles.product__wrapper}>
      <div className={ProductCardStyles.img__wrapper}>
        <img
          className={ProductCardStyles.product__img}
          src={Product.productImgs}
          alt={`${Product.title}`}
        />
      </div>
      <div className={ProductCardStyles.separator}></div>
      <div className={ProductCardStyles.product__info}>
        <section className={ProductCardStyles.title__wrapper}>
          <h1
            className={ProductCardStyles.product__title}
          >{Product.title}</h1>
        </section>
        <section className={ProductCardStyles.price__wrapper}>
          <div className={ProductCardStyles.product__price}>
            <h2>{`$${Product.price}`}</h2>
          </div>
          <div className={ProductCardStyles.button__wrapper}>
            <ButtonBase
              ButtonClassName={ProductCardStyles.product__cta}
              ButtonText={<i className="fa-solid fa-bag-shopping"></i>}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProductCard;
