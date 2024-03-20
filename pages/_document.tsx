import { Html, Head, Main, NextScript } from "next/document";
import { ThemeProvider } from "../@/components/theme-provider";
import { LightNodeProvider } from "@waku/react";

const NODE_OPTIONS = { defaultBootstrap: true };

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme=""
          enableSystem
          disableTransitionOnChange
        >
          <Main />
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  );
}
