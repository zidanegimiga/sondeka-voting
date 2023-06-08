//@ts-nocheck
import { FC } from "react";
import AuthProvider from "admin-auth-context";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "../styles/app.scss";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";
import Cursor from "shared/Cursor";
import { VoterContext, VoterProvider } from "global/VoterContext";
import Maintenance from "features/Home/Maintenance";
import Script from "next/script";

const App: FC = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const measurementID = "G-6FRNWVQCNN";
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6FRNWVQCNN"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6FRNWVQCNN');
        `}
      </Script>
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
    </>
  );
};
export default App;
