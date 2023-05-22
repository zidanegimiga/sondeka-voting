//@ts-nocheck
import { FC } from "react";
import AuthProvider from "admin-auth-context";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "../styles/app.scss";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import Cursor from "shared/Cursor";
import { VoterContext, VoterProvider } from "global/VoterContext";

const App: FC = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <VoterProvider>
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
    </VoterProvider>
  );
};

export default App;
