import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import apiTable from '../componentes/ApiTable';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByName, setfilterByName] = useState('');

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
    setFilterData(filterNome);
  }, [filterByName]);

  const contextValue = {
    data,
    filterByName,
    handleName,
    filterData,
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
