/* eslint-disable prettier/prettier */

import Footer from "@/src/components/modules/Shared/Footer";
import { Navbar } from "@/src/components/UI/Navbar/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
