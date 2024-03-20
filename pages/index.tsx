import Image from "next/image";

import { Inter } from "next/font/google";
import Hero from "../@/components/Hero";
import WhyUs from "../@/components/WhyUs";
import { LightNodeProvider } from "@waku/react";

const NODE_OPTIONS = { defaultBootstrap: true };

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:p-24 ${inter.className}`}
    >
      <Hero />
      <WhyUs />
    </main>
  );
}
