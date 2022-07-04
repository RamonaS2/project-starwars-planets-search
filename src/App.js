import React from 'react';
import './App.css';
import Table from './componentes/Table';
import MyProvider from './Context/MyProvider';

function App() {
  return (
    <div>
      <span>Hello, App!!</span>
      <MyProvider>
        <Table />
      </MyProvider>
    </div>
  );
}

export default App;
