import HomeStyles from '../styles/home.module.css';

const NoProductsFoundMessage = () => {
  return (
    <section className={HomeStyles.npf__wrapper}>
      <section className={HomeStyles.npf__icon}>
        <i className="fa-solid fa-barcode"></i>
      </section>
      <section className={HomeStyles.npf__text}>
        <h2>¡No product found!</h2>
      </section>
    </section>
  );
};

export default NoProductsFoundMessage;