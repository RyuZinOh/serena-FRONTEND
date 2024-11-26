import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main style={{ minHeight: "80vh" }} className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
