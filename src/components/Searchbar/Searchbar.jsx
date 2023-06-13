import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ valueData }) {
  const [valueInput, setValueInput] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (valueInput.trim() === '') {
      alert('Ви ще нічого не ввели');
      return;
    }

    valueData(valueInput);
    event.target.reset();
  };

  const handleChange = event => {
    setValueInput(event.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          name="button"
          type="submit"
          className={css['SearchForm-button']}
        >
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={valueInput}
          name="input"
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  valueData: PropTypes.func.isRequired,
};
