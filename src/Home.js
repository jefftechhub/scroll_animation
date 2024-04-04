import React, { useEffect, useRef } from "react";
import "./Home.css";

const Home = () => {
  const heading = useRef(null);
  const listings = useRef(null);
  const btnTop = useRef(null);
  const nav = useRef(null);

  useEffect(() => {
    const items = [heading.current, listings.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const number = items.indexOf(entry.target);
          if (entry.isIntersecting) {
            if (number === 0) {
              items[0].style.background = "red";
            } else if (number === 1) {
              items[1].style.transform = "scale(1)";
            }
          }
        });
      },

      {
        threshold: 1,
      }
    );

    items.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  useEffect(() => {
    const getHeight = () => {
      if (window.scrollY >= 400) {
        btnTop.current.style.transform = "scale(1)";
        nav.current.style.position = "fixed";
      } else {
        btnTop.current.style.transform = "scale(0)";
        nav.current.style.position = "static";
      }
    };

    window.addEventListener("scroll", getHeight);

    return () => {
      window.removeEventListener("scroll", getHeight);
    };
  });

  return (
    <article>
      <div>
        <h1 ref={nav}>Home Page</h1>
        <button
          onClick={() => {
            heading.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          products
        </button>
      </div>
      <h2 ref={heading}>products</h2>
      <h3 ref={listings}>listings</h3>
      <button
        id="btnScroll"
        ref={btnTop}
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        top
      </button>
    </article>
  );
};

export default Home;
