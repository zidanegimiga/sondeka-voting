import { FC } from "react";
import AuthProvider from "admin-auth-context";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "../styles/app.scss";

const App: FC = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    //@ts-ignore
    <AuthProvider>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
