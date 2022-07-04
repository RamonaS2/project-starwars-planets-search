import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Filter() {
  const { handleName, filterColum, filterComparison,
    filterValue, handleClick } = useContext(MyContext);

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

      <select
        data-testid="column-filter"
        onChange={ filterColum }
      >
        <option id="population">population</option>
        <option id="orbital_period">orbital_period</option>
        <option id="diameter">diameter</option>
        <option id="rotation_period">rotation_period</option>
        <option id="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ filterComparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        defaultValue="0"
        onChange={ filterValue }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filter;
