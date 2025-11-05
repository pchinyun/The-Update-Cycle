//  website script

import gsap from "./node_modules/gsap";
import ScrollTrigger from "./node_modules/gsap/ScrollTrigger.js";
import Lenis from "./node_modules/lenis";
import "./node_modules/lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".titleAnimation span", {
  scrollTrigger: {
    trigger: ".intro",
    start: "50% 80%",
    end: "50% 45%",
    scrub: true,
    markers: false,
  },
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  stagger: {
    each: 0.2,
  },
  ease: "power2.out",
});

// Init Lenis
const lenis = new Lenis({
  autoRaf: true,
});

lenis.on("scroll", (e) => {});
