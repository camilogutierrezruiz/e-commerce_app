import '../App.css';

const Footer = () => {
  return (
    <footer className='footer__wrapper'>
      <div className='footer__title'>
        <i className="fa-regular fa-copyright"></i>
        <h2>
          e-commerce
        </h2>
      </div>
      <section className='footer__icons'>
        <div><i className="fa-brands fa-instagram"></i></div>
        <div><i className="fa-brands fa-linkedin-in"></i></div>
        <div><i className="fa-brands fa-youtube"></i></div>
      </section>
    </footer>
  );
};

export default Footer;