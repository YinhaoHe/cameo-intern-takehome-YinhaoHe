import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import config from '../config';
import logo from './static/logo.svg';
import './style.css';

/*
This is a stubbed React functional component using React Effects and Hooks
https://reactjs.org/docs/hooks-effect.html
Feel free to use React class components and lifecycle hooks if that is more comfortable for you
*/
function App() {
  const [dataFromApi, setDataFromApi] = useState();

  useEffect(() => {
    async function fetchDataFromApi() {
      const apiResponse = await axios.get(config.API_URL);
      setDataFromApi(apiResponse.data);
    }
    fetchDataFromApi();
  }, []);

  return (
    <div id="app">
      <img src={logo} alt="logo" />
      <h1>Welcome to your interview!</h1>
      {dataFromApi}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('main'));
