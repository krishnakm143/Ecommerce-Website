import React from 'react';
import ReactDOM from 'react-dom'; // Ensure you have only one import for ReactDOM
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store'; // Ensure the correct relative path

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
