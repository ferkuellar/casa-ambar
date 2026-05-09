import type { ReactNode } from "react";

import { CartDrawer } from "../cart/CartDrawer";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";


type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-amber-ivory font-body text-amber-black">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
