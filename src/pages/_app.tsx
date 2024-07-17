import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '@/store';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>SW Wiki</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(App);
