import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/MainComponent';
import { store } from './store/store';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Provider store={ store }>
        <MainComponent />
      </Provider>
    </div>
  );
}

export default App;
