import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Filter() {
  const { handleName, filterColum, filterComparison,
    filterValue, handleClick, filterByNumericValues,
    handleExclui, setFilterByNumericValues, handleClickInput,
    options, handleChangeSort, handleClickSort } = useContext(MyContext);

  return (
    <div>
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

      {filterByNumericValues.map((item, i) => (
        <div
          key={ `${item.colunm}-${item.value}` }
          data-testid="filter"
        >
          <p>{ item.colunm }</p>
          <p>{ item.comparison }</p>
          <p>{ item.value }</p>
          <button
            type="button"
            onClick={ () => handleExclui(i) }
          >
            x

          </button>
        </div>
      ))}

      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleChangeSort }
      >
        {
          options.map((option) => (
            <option key={ option }>{option}</option>
          ))
        }
      </select>

      <input
        name="sort"
        data-testid="column-sort-input-asc"
        type="radio"
        value="ASC"
        onClick={ handleClickInput }
      />

      <input
        name="sort"
        data-testid="column-sort-input-desc"
        type="radio"
        value="DESC"
        onClick={ handleClickInput }
      />

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClickSort }
      >
        ORDENAR
      </button>

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => setFilterByNumericValues([]) }
      >
        excluir
      </button>
    </div>
  );
}

export default Filter;
