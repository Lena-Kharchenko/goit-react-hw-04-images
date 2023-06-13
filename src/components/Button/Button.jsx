import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onChange }) => {
  return (
    <button type="button" onClick={onChange} className={css.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onChange: PropTypes.func.isRequired,
};
