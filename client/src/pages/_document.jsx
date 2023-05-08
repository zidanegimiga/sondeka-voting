import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <style>{`
            :root {
              --d: 0.25s;
            }
          `}</style>
          <meta property="og:type" content="website" key="og-type" />
          <meta property="og:url" content="vote.sondeka.org" key="og-url" />
          <meta property="og:title" content="Voting Sondeka" key="og-title" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="icon" type="image/x-icon" href="/favicon1.ico"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
            rel="stylesheet"
          ></link>
          <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
