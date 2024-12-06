// src/pages/_app.tsx

import '../styles/global.css'; // Import the global CSS file

const MyApp = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

export default MyApp;
