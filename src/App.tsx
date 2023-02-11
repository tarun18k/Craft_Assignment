import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import MainComponent from './components/MainComponent';
import { store } from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <MainComponent />
      </Provider>
    </div>
  );
}

export default App;
