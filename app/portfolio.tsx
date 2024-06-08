"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Circle from "./Circle";
gsap.registerPlugin(ScrollTrigger);


export default function Portfolio() {
  const ref = useRef<any>();
  useEffect(() => {
    setTextAnimation();
    if (window.innerWidth >= 500) {
      animateText()
    }
  }, [])

  const setTextAnimation = () => {
    if (!ref.current) { return; }
    const children = Array.from(ref.current.children) as HTMLElement[];
    children.forEach((e, i) => {
      setTimeout(() => {
        if (e.id == 'helloWorldContainer') {
          Array.from(e.children).forEach((e) => e.classList.add('animate'))
        } else {
          e.classList.add('animate')
        }
       
      }, i * 100);
    })
  }
  const scrollInto = () => {
    const parent = document.getElementById('websiteContainer');
    if (!parent) return;
    parent.scrollIntoView({ behavior: "smooth" });
    Array.from(parent.children).forEach((e) => {
      e.classList.add('animate')
    })

  }
  const animateText = () => {
    const el = document.getElementById('helloWorld');
    const secondEl = document.getElementById('helloWorld2');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map((e) => e.toLowerCase());
    const originalString = el?.textContent ?? '';
    
    if (!el || !originalString || originalString !== 'Hello World' || !secondEl) {
      return;
    }

    let interval = 0;
    const generate = setInterval(() => {
      if (interval >= originalString.length) {
        clearInterval(generate);
      }
      let s = originalString
        .split("")
        .splice(Math.floor(interval))
        .map((e, i) => e === " " ? e : letters[Math.floor(Math.random() * letters.length)])
        .join("");
      s = originalString.split("").splice(0, Math.floor(interval)).join("") + s;
      el.textContent = s;
      secondEl.textContent = s;
      interval += 0.3;
    }, 5);
  };

  
  return (
    <div className="z-50 w-full flex flex-col pt-24 justify-center items-center">
      <img
          className="h-28 w-28 md:w-32 md:h-32 mb-12 profilePicture z-50 rounded-full"
          src="/picture.jpeg" />
    
   
      <div ref={ref} className="flex items-center pt-8 space-y-6 text-center justify-center flex-col relative">
        <div onMouseEnter={() => setTextAnimation()} id='helloWorldContainer' className="relative">
          <p id='helloWorld' className="p-2 bg-[rgba(137,137,137,0.1)] w-full h-full  backdrop-blur-[1.5px] rounded-3xl xl:text-8xl text-4xl md:text-5xl helloWorld introText font-bold text-white ">Hello World</p>
          <p id='helloWorld2' className="absolute top-0  left-0   p-2 bg-[rgba(137,137,137,0.1)] w-full h-full   rounded-3xl xl:text-8xl text-4xl md:text-5xl helloWorld2 introText font-bold text-white ">Hello World</p>
        </div>
        <p id="name" className="p-2 bg-[rgba(137,137,137,0.1)] backdrop-blur-[1.5px] p-x4 rounded-3xl xl:text-4xl text-xl md:text-2xl introText font-bold text-white">I'm Jacob</p>
        <p className="p-2 bg-[rgba(137,137,137,0.1)] backdrop-blur-[1.5px] p-x4 rounded-3xl xl:text-4xl text-xl md:text-2xl introText font-bold text-white">
          A CS Student interested in Web Development and AI
        </p>
      </div>
      <button onClickCapture={() => scrollInto()} className="py-12">
        <ExploreMoreButton />
      </button>
    </div>
  );

}
function ExploreMoreButton() {
  return (
    <svg viewBox="0 0 200 200" width="100" className="bg-black rounded-full buttonBackdrop" height="100" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" x2="100" y1="25" y2="150" stroke="white" strokeWidth={4} />
      <line x1="50" x2="100" y1="100" y2="150" stroke="white" strokeWidth={4} />
      <line x1="150" x2="100" y1="100" y2="150" stroke="white" strokeWidth={4} />
    </svg>
  );
}
