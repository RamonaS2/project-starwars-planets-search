import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Filter() {
  const { handleName } = useContext(MyContext);

  return (
    <form>
      <label htmlFor="filterName">
        Filter Name
        <input
          id="filterName"
          data-testid="name-filter"
          name="filter-name"
          type="text"
          onChange={ handleName }
        />
      </label>
    </form>
  );
}

export default Filter;
