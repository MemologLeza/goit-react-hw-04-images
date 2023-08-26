import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from './Searchbar.module.css';
import React from 'react';

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(value);
    setValue('');
  };
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };
  return (
    <header className={styled.searchbar}>
      <form className={styled.SearchForm} role="search" onSubmit={handleSubmit}>
        <button type="submit" className={styled.SearchFormButton}>
          <span className={styled.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={value}
          className={styled.input}
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
export default Searchbar;
