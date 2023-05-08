//@ts-nocheck
import { FC } from "react";
import AuthProvider from "admin-auth-context";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "../styles/app.scss";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import Cursor from "shared/Cursor";

const App: FC = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <SessionProvider session={session}>
        <AuthProvider>
          <Component {...pageProps} />
          <Analytics />
        </AuthProvider>
      </SessionProvider>
    </>
  );
};

export default App;
