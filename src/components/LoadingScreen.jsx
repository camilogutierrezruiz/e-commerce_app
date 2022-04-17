import '../styles/Loader.css'

const LoadingScreen = () => {
  return (
    <div className='loader__wrapper'>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;