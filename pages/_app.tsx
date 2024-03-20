import { useState, useEffect } from "react";
import Footer from "../@/components/Footer";
import Navbar from "../@/components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../@/components/theme-provider";
import { LightNodeProvider, ContentPairProvider } from "@waku/react";
import { Protocols } from "@waku/sdk";

const NODE_OPTIONS = { defaultBootstrap: true };

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
        setCurrentUser(accounts[0]);
      }).catch((error: any) => {
        console.error(error);
      });
    }
  }, []);

  // Function to handle wallet connection
  const connectWallet = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
        setCurrentUser(accounts[0]);
      }).catch((error: any) => {
        console.error(error);
      });
    }
  };

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
            <Navbar currentUser={currentUser} connectWallet={connectWallet} disconnectWallet={() => { }} />                        <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </div>
      </ContentPairProvider>
    </LightNodeProvider>
  );
}
