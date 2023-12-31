import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { queryClientConfig } from "../src/utils/services/config";
import Navbar from "../src/components/Navbar";
import ToastProvider from "../src/utils/ToastProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(new QueryClient(queryClientConfig));
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Navbar />
        <Component {...pageProps} />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
