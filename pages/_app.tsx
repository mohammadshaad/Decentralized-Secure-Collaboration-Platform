import Footer from "../@/components/Footer";
import Navbar from "../@/components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../@/components/theme-provider";
import { LightNodeProvider } from "@waku/react";

const NODE_OPTIONS = { defaultBootstrap: true };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full h-full">
      <ThemeProvider
        attribute="class"
        defaultTheme=""
        enableSystem
        disableTransitionOnChange
      >
        <LightNodeProvider options={NODE_OPTIONS}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </LightNodeProvider>

      </ThemeProvider>
    </div>
  )
}
