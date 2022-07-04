import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import apiTable from '../componentes/ApiTable';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByName, setfilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [order, setOrder] = useState({
    column: '',
    sort: '',
  });

  useEffect(() => {
    const getResults = async () => {
      const api = await apiTable();

      const newApi = api.results.sort((a, b) => {
        const num = -1;
        if (a.name < b.name) {
          return num;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      setData(newApi);
      setFilterData(newApi);
    };
    getResults();
  }, []);

  const handleName = ({ target }) => {
    setfilterByName(target.value.toLowerCase());
  };

  useEffect(() => {
    const filterNome = data.filter((planeta) => planeta.name.toLowerCase()
      .includes(filterByName));

    const newList = filterByNumericValues
      .reduce((acc, filtrados) => acc.filter((plan) => {
        switch (filtrados.comparison) {
        case 'maior que':
          return Number(plan[filtrados.column]) > Number(filtrados.value);
        case 'menor que':
          return Number(plan[filtrados.column]) < Number(filtrados.value);
        case 'igual a':
          return Number(plan[filtrados.column]) === Number(filtrados.value);
        default:
          return plan;
        }
      }), filterNome);

    setFilterData(newList);
  }, [filterByName, filterByNumericValues]);

  const filterColum = ({ target }) => {
    setColumn(target.value);
  };

  const filterComparison = ({ target }) => {
    setComparison(target.value);
  };

  const filterValue = ({ target }) => {
    setValue(target.value);
  };

  const handleClick = () => {
    const todoFilter = {
      column,
      comparison,
      value,
    };
    setFilterByNumericValues([...filterByNumericValues, todoFilter]);
    const umFilter = document.getElementById(column);
    umFilter.remove();
  };

  const handleExclui = (name) => {
    const newFilterEx = filterByNumericValues.filter((_fil, i) => (
      i !== name
    ));
    setFilterByNumericValues(newFilterEx);
  };

  const handleChangeSort = ({ target }) => {
    setOrder({
      ...order,
      column: target.value,
    });
  };

  const handleClickInput = ({ target }) => {
    setOrder(() => ({
      ...order,
      sort: target.value,
    }));
  };

  const handleClickSort = () => {
    const { sort, column: columnSort } = order;
    const filterWithoutUnknow = filterData
      .filter((dataColumn) => dataColumn[columnSort] !== 'unknown');
    const filterUnknow = filterData
      .filter((dataColumn) => dataColumn[columnSort] === 'unknown');
    const orderColumn = filterWithoutUnknow.sort((a, b) => {
      let sortUm;
      if (sort === 'ASC') {
        sortUm = Number(a[columnSort]) - Number(b[columnSort]);
      }
      if (sort === 'DESC') {
        sortUm = Number(b[columnSort]) - Number(a[columnSort]);
      }
      return sortUm;
    });
    setFilterData([...orderColumn, ...filterUnknow]);
  };

  const contextValue = {
    data,
    filterByName,
    handleName,
    filterData,
    filterColum,
    filterComparison,
    filterValue,
    handleClick,
    filterByNumericValues,
    handleExclui,
    setFilterByNumericValues,
    handleClickInput,
    options,
    handleChangeSort,
    handleClickSort,
    setOptions,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
