import { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import '../styles/app.scss';

const App:FC = ({ Component, pageProps }:AppProps) => {
  return (
    <>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}/>
      <Component {...pageProps} />;
    </>
  );
}

export default App;
