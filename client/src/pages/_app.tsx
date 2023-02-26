import { FC } from 'react';
import { AppProps } from 'next/app';
import '../styles/app.scss';

const App:FC = ({ Component, pageProps }:AppProps) => {
  return (
    <Component {...pageProps} />
  );
}

export default App;
