import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import AuthGuard from "../helpers/AuthGuard";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ChakraProvider>
        <Provider session={pageProps.session}>
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
          <style jsx global>
            {`
              body {
                background-color: #0b0e11 !important;
                color: #fff !important;
                font-family: "Montserrat", "Nanum Gotchic", sans-serif !important;
              }
            `}
          </style>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
