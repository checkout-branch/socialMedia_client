import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/global.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

import { Provider } from "react-redux";
import store from "@/store/store";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const router = useRouter();

  // List of routes where Navbar and Sidebar should be hidden
  const authPages = ["/auth/registration", "/auth/login", "/auth/otp"];
  const isAuthPage = authPages.includes(router.pathname);

  // Create a QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <>
            {/* Global metadata */}
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta charSet="UTF-8" />
              <title>GameSphere</title>
              <meta name="description" content="Your App Description" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-screen">
              {/* Sidebar: Hidden on authentication pages */}
              {!isAuthPage && <Sidebar />}

              {/* Main content area */}
              <div className="flex flex-col flex-1">
                {/* Navbar: Hidden on authentication pages */}
                {!isAuthPage && <Navbar />}

                {/* Page content */}
                <main className={`flex-1 ${!isAuthPage ? "ml-48 mt-20" : "mt-0"}`}>
                  <Component {...pageProps} />
                </main>

                {/* Toast notifications */}
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
              </div>
            </div>
          </>
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
