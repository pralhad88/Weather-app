import React from 'react';
import './App.css';
import Header from './component/Header';
import SearchBox from './component/searchBox';

function App() { // Parent Component 
  return (
    <div className="App" >
      <Header />
      <SearchBox />
    </div>
  );
}

export default App;
