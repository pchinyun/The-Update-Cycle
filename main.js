//  website script

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

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
