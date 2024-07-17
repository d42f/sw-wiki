import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import { wrapper } from '@/store';
import '@/styles/globals.css';

const { publicRuntimeConfig } = getConfig();

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{publicRuntimeConfig.appName}</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(App);
