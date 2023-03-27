import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux';

import { store } from '@/store';

import { auth } from '@/lib/firebase';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <meta
          name='description'
          content='A small demo app for displaying and manipulating todos.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        <ParallaxProvider>
          <Component {...pageProps} user={user} />
        </ParallaxProvider>
      </Provider>
    </>
  );
}
