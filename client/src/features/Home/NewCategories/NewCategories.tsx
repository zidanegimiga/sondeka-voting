import styles from "./NewCategories.module.scss";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

const NewCategories = ({ items }) => {
  let progress = 50;
  let startX = 0;
  let active = 0;
  let isDown = false;

  const cursorRef = useRef([]);
  const itemRefs = useRef([]);

  const handleItemClick = (index) => {
    console.log(`Item ${index} clicked`);
  };

  const speedWheel = 0.02;
  const speedDrag = -0.1;

  const getZindex = (array, index: number) => {
    array.map((_, i) => {
      index === i ? array.length : array.length - Math.abs(index - i);
    });
  };

  const displayItems = (item, index, active) => {
    const zIndex = getZindex([...items], active)[index];
    // @ts-ignore
    itemRefs.current.style.setProperty("--zIndex", zIndex);
    // @ts-ignore
    itemRefs.current.style.setProperty(
      "--active",
      (index - active) / items.length
    );
  };

  const animate = () => {
    progress = Math.max(0, Math.min(progress, 100));
    active = Math.floor((progress / 100) * (items.length - 1));
    // @ts-ignore
    itemRefs.current.forEach((item, index) =>
      displayItems(item, index, active)
    );
  };

  const handleClick = (index, length) => {
    progress = (index / length) * 100 + 10;
    animate();
  };

  const handleWheel = (e) => {
    const wheelProgress = e.deltaY * speedWheel;
    progress = progress + wheelProgress;
    animate();
  };

  const handleMouseMove = (e) => {
    if (e.type === "mousemove") {
      cursorRef.current.forEach((cursor) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
  };

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  useEffect(() => {
    animate()
    document.addEventListener("mousewheel", handleWheel);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
  }, []);

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.carousel}>
        {items.map((item, index) => {
          <div
            className={styles.carouselItem}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={(e) => handleClick(index, items.length)}
          >
            <div className={styles.carouselBox}>
              <div className={styles.title}>{item.name}</div>
              <div className={styles.num}>{index + 1}</div>
              <img
                alt={"item"}
                src="https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g="
              />
            </div>
          </div>;
        })}
      </div>
      <div
        className={styles.cursor}
        ref={(el) => (cursorRef.current[0] = el)}
      ></div>
      <div
        className={styles.cursor + " " + styles.cursor2}
        ref={(el) => (cursorRef.current[1] = el)}
      ></div>
    </div>
  );
};

export default NewCategories;
