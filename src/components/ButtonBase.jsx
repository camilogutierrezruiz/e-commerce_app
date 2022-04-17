const ButtonBase = ({ ButtonType, ButtonClassName, ButtonOnClick, ButtonText, ButtonWrapperClassName }) => {
  return (
    <div className={ButtonWrapperClassName}>
      <button
        type={ButtonType}
        className={ButtonClassName}
        onClick={ButtonOnClick}
      >{ButtonText}</button>
    </div>
  );
};

export default ButtonBase;