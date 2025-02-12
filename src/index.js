/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import { store } from './components/redux/store'
import { Toaster } from 'react-hot-toast';


const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={
    <main className='h-screen flex flex-col justify-center items-center'>
      <HashLoader  className="mx-auto"   color="#1857d2" />
    </main>
  }>
    <React.StrictMode>  
      <Provider store={store}> 
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
