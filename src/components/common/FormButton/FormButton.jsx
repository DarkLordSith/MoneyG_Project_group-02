import clsx from 'clsx';
import styles from './FormButton.module.css';

const FormButton = ({
  type,
  text,
  handlerFunction,
  variant,
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handlerFunction}
      className={clsx(
        styles.formButton,
        variant === 'multiColorButtton' && styles.multiColorButtton,
        variant === 'whiteButtton' && styles.whiteButtton,
        variant === 'btn_delete' && [
          styles.multiColorButtton,
          styles.btn_delete,
        ]
      )}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default FormButton;
