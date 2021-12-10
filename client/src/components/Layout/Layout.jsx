import React from "react";
import { Announcement, Footer, Header, Navbar } from "..";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="grid-container">
      <Announcement />
      <Header />
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
