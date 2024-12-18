// src/pages/_app.tsx
import { useRouter } from "next/router";
import Head from "next/head"; // Import Head for global metadata

import "../styles/global.css"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

import { Provider } from "react-redux";
import store from "@/store/store";

const MyApp = ({ Component, pageProps:{ session, ...pageProps }  }: AppProps) => {
  const router = useRouter();
  

  // Define the list of routes that should exclude the Sidebar and Navbar
  const authPages = ["/auth/registration", "/auth/login", "/auth/otp"];
  const isAuthPage = authPages.includes(router.pathname);

  return (
    <Provider store={store}>
    <SessionProvider session={session}>
      
    <>
      {/* Global Head metadata */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>GameSphere</title>
        <meta name="description" content="Your App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen">
        {/* Sidebar: Displayed on all non-authentication pages */}
        {!isAuthPage && <Sidebar />}

        {/* Main content area */}
        <div className="flex flex-col flex-1">
          {/* Navbar: Displayed on all non-authentication pages */}
          {!isAuthPage && <Navbar />}

          {/* Page-specific content */}
          <main className={` ${!isAuthPage ? "ml-48 mt-20 " : "mt-0"}`}>
            <Component {...pageProps} />
          </main>

          {/* Toast notifications */}
          <ToastContainer />
        </div>
      </div>
    </>
    </SessionProvider>
    </Provider>
  );
};

export default MyApp;
