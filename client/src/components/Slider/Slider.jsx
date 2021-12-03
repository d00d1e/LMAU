import React from "react";
import "./slider.css";

export default function Slider() {
  return (
    <div className="slider">
      <div className="slider__heading">
        <h3>Life is a pawty. Dress like it.</h3>
      </div>
      <img src={require("../../assets/img/slider1.jpg")} alt="slider1" />
    </div>
  );
}
