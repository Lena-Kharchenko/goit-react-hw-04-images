import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    valueInput: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { valueInput } = this.state;

    if (valueInput.trim() === '') {
      alert('Ви нічого не ввели');
      return;
    }

    this.props.valueData(valueInput);
    e.target.reset();
  };

  hundleChange = e => {
    this.setState({ valueInput: e.target.value });
  };

  render() {
    const { handleSubmit, hundleChange } = this;
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
            onChange={hundleChange}
            value={this.state.valueInput}
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
}

Searchbar.propTypes = {
  valueData: PropTypes.func.isRequired,
};
