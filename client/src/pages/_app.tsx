import { FC } from "react";
import { SessionProvider } from "next-auth/react"
// import AuthProvider from "admin-auth-context";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "../styles/app.scss";

const App: FC = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    //@ts-ignore
    // <AuthProvider>
      <SessionProvider session={session}>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />;
      </SessionProvider>
    // </AuthProvider>
  );
};

export default App;
