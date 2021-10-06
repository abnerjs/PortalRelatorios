import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import StoreConfig from './store/StoreConfig';
import { ThemeProvider } from '@mui/material';
import theme from './basic/Styles/theme';

const store = StoreConfig();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
