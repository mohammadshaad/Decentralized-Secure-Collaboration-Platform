import Footer from "../@/components/Footer";
import Navbar from "../@/components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../@/components/theme-provider";
import { LightNodeProvider, ContentPairProvider } from "@waku/react";
import { Protocols } from "@waku/sdk";

const NODE_OPTIONS = { defaultBootstrap: true };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LightNodeProvider options={NODE_OPTIONS} protocols={[Protocols.Store, Protocols.Filter, Protocols.LightPush]}>
      <ContentPairProvider contentTopic={"/chat/" + 333}>
        <div className="w-full h-full">
          <ThemeProvider
            attribute="class"
            defaultTheme=""
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Component {...pageProps} />
            <Footer />

          </ThemeProvider>
        </div>
      </ContentPairProvider>
    </LightNodeProvider>
  )
}
