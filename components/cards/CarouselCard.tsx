import React, { useState } from "react";
import styles from "./CarouselCard.module.css";
interface Props {
  children: React.ReactNode;
}
const CarouselCard = ({ children }: Props) => {
  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        {children}
        {/* <div id="slide-1">1</div>
        <div id="slide-2">2</div>
        <div id="slide-3">3</div>
        <div id="slide-4">4</div>
        <div id="slide-5">5</div> */}
      </div>
      <div className={styles.navigation}>
        <a href="#slide-1"></a>
        <a href="#slide-2"></a>
        <a href="#slide-3"></a>
        <a href="#slide-4"></a>
        <a href="#slide-5"></a>
      </div>
    </div>
  );
};

export default CarouselCard;
