import { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import '../styles/app.scss';

const App:FC = ({ Component, pageProps }:AppProps) => {
  return (
    <Component {...pageProps} />
  );
}

export default App;
