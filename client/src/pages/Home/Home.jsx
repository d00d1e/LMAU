import React from "react";
import {
  Announcement,
  Footer,
  Header,
  Navbar,
  Products,
  Slider,
} from "../../components";
import "./home.css";

export default function Home() {
  return (
    <div className="grid-container">
      <Announcement />
      <Header />
      <Navbar />
      <main>
        <Slider />
        <Products />
      </main>
      <Footer />
    </div>
  );
}
