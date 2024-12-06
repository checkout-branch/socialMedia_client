import { GoogleOAuthProvider } from '@react-oauth/google';

type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId='602810078809-pdagfosf7j1spjjj7a8kaj2alucou8gv.apps.googleusercontent.com'>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default MyApp;
