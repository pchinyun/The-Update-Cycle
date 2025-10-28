//  website script

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

gsap.to(".titleAnimation span", {
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    markers: true,
  },
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  stagger: {
    each: 0.2,
  },
  ease: "power2.out",

});



