import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const SocketContext = createContext()
// deploy server
const host = 'https://serverchatandgame.herokuapp.com/client';

// locall host
//const host = 'http://localhost:3050/client';

const SocketIO = socketIOClient.connect(host, { path: '/socket' })

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={SocketIO}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
