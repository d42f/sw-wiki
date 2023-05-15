import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

interface DocumentAdditionalProps {
  languageDirection: string;
  language: string;
  appName: string;
  author: string;
}

type DocumentProps = DocumentInitialProps & DocumentAdditionalProps;

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    const originalRenderPage = context.renderPage;

    // Run the React rendering logic synchronously
    context.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: App => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: Component => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(context);

    const additionalProps = {
      languageDirection: 'ltr',
      language: 'en',
      appName: 'SW Wiki',
      author: 'dmitri.frolof@gmail.com',
    };

    return { ...initialProps, ...additionalProps };
  }

  render() {
    const { appName, author,language, languageDirection } = this.props;

    return (
      <Html lang={language} dir={languageDirection}>
        <Head>
          <meta name="description" content={appName} />
          <meta name="author" content={author} />
          <link rel="icon" href="/favicon.ico" />
          <script async src="//l.getsitecontrol.com/s/94myx8o4.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
