import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


//canvas
const canvas = document.querySelector('canvas.webgl');  

//scene
const scene = new THREE.Scene(); 
// scene.background = new THREE.Color('#0xffffff'); 

//init gsap 
gsap.registerPlugin(ScrollTrigger);



//size 
const size = { 
    width: window.innerWidth, 
    height: window.innerHeight
}


//hdri environment 
const hdrLoader = new HDRLoader(); 
hdrLoader.load('./environmentMaps/Cyclorama Hard Light 2K.hdr', (environmentMap)=> {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping; 
    scene.environment = environmentMap; 
})



//camera 
const camera = new THREE.PerspectiveCamera(35, size.width / size.height); 
camera.position.z = 5; 

scene.add(camera); 

//orbit controls 
const controls = new OrbitControls(camera,canvas)
controls.enableZoom = false; 

//load model 
const loader = new GLTFLoader(); 
let model = null; 

loader.load('./models/test.glb', (glb)=> { 
     model = glb.scene;    
     model.position.set(0,-1.5,0); 
     model.scale.set(0.5, 0.5, 0.5); 
    scene.add(model); 

    //gsap timeline
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".canvasSection",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    
    //   tl.to(camera.position, { x: 5, z: 0, y: 2 });      
    //   tl.to(camera.position, { x: 0, z: 5, y: 1 });     
      tl.to(camera.position, { x: -5, z: 2, y: 1 });     
      tl.to(camera.position, { x: -5, z: 0, y: 1 });    
      tl.to(camera.position, { x: 0, z: 3, y: -0.5 }); 
      tl.to(camera.position, { x: 5, z: 3, y: -0.5 }); 
    //   tl.to(camera.position, { x: 0, z: 5, y: 0.5 }); 
   
})



// let scrollProgress = 0; 

// window.addEventListener('scroll', () => { 
//     const scrollTop = window.scrollY; 
//     const docHeight = document.body.scrollHeight - window.innerHeight; 
    
//     scrollProgress = scrollTop / docHeight;  
// }); 


//renderer 
const renderer = new THREE.WebGLRenderer({canvas:canvas, alpha:true})
renderer.setSize(size.width, size.height); 
renderer.render(scene, camera)




//clock 
const clock = new THREE.Clock(); 

//animation loop 
const tick = () => { 
    const deltaTime = clock.getDelta(); 
    controls.update(); 

    // if (model) { 
    //     model.rotation.y = scrollProgress * Math.PI * 2; 
    // }

    renderer.render(scene,camera); 
    window.requestAnimationFrame(tick); 
}
tick(); 


