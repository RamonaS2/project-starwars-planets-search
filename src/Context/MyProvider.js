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

  useEffect(() => {
    const getResults = async () => {
      const api = await apiTable();
      setData(api.results);
      setFilterData(api.results);
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
