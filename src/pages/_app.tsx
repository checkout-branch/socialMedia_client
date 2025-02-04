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
import { useState, useEffect } from "react";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const router = useRouter();

  // Define routes for different visibility logic
  const authRoutes = ["/auth/registration", "/auth/login", "/auth/otp"];
  const isAuthPage = authRoutes.includes(router.pathname);

  const navbarOnlyHiddenRoutes = ["/about"];
  const shouldHideNavbarOnly = navbarOnlyHiddenRoutes.includes(router.pathname);

  // Create a QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // Prevent QueryClientProvider from being rendered without a client instance
    if (!queryClient) {
      console.error("QueryClient is not available!");
    }
  }, [queryClient]);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {/* QueryClientProvider wrapping the entire app */}
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
                {/* Navbar: Hidden on both authentication and specific routes */}
                {!(isAuthPage || shouldHideNavbarOnly) && <Navbar />}

                {/* Page content */}
                <main
                  className={`flex-1 ${isAuthPage ? "mt-0 ml-0" : shouldHideNavbarOnly ? "mt-0 ml-48" : "mt-20 ml-48"}`}
                >
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
