import React, { useEffect, useRef } from 'react';
import './styles/Home.css';
import { gsap } from 'gsap';

function Home() {

  let newsRef = useRef(null);
  let trackerRef = useRef(null);
  let vaccineRef = useRef(null);
  let sliderRef = useRef(null);
  let introRef = useRef(null);

  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  useEffect(() => {
    tl.to(newsRef, { y: "0%", duration: 1, stagger: 0.25 });
    tl.to(trackerRef, { y: "0%", duration: 1, stagger: 0.25 });
    tl.to(vaccineRef, { y: "0%", duration: 1, stagger: 0.25 });
    tl.to(sliderRef, { y: "-100%", duration: 1.5, delay: 0.3});
    tl.to(introRef, { y: "-100%", duration: 1}, "-=1");
  });


  return (
    <div className="home">
      <div className="landing">
        <div ref={element => { introRef = element; }} className="intro">
          <div className="intro-text">
            <h1 className="hide-text">
              <span ref={element => { newsRef = element; }} className="text">News</span>
            </h1>
            <h1 className="hide-text">
              <span ref={element => { trackerRef = element; }} className="text">Tracker</span>
            </h1>
            <h1 className="hide-text">
              <span ref={element => { vaccineRef = element; }} className="text">Vaccine</span>
            </h1>
          </div>
        </div>
        <div ref={element => { sliderRef = element; }} className="slider"></div>

      </div>
    </div>

  )
}

export default Home;

