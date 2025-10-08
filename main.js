// const scene = document.querySelector('.gridContainer');
// let isDragging = false;
// let startX, startY, currentX = 0, currentY = 0;


// scene.parentElement.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   startX = e.clientX - currentX;
//   startY = e.clientY - currentY;
//   // scene.parentElement.style.cursor = 'grabbing';
// });

// window.addEventListener('mouseup', () => {
//   isDragging = false;
//   // scene.parentElement.style.cursor = 'grab';
// });

// window.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   currentX = e.clientX - startX;
//   currentY = e.clientY - startY;
//   scene.style.transform = `translate(${currentX}px, ${currentY}px)`;
// });

const scene = document.querySelector('.gridContainer');
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;

// Function to get boundary limits
function getBoundaries() {
  const containerRect = scene.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  return {
    minX: viewportWidth - containerRect.width,
    maxX: 0,
    minY: viewportHeight - containerRect.height,
    maxY: 0
  };
}

scene.parentElement.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'IMG') return; 

  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  let newX = e.clientX - startX;
  let newY = e.clientY - startY;
  
  // Apply boundary constraints
  const bounds = getBoundaries();
  currentX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
  currentY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));
  
  scene.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

// Recalculate boundaries on window resize
window.addEventListener('resize', () => {
  const bounds = getBoundaries();
  currentX = Math.max(bounds.minX, Math.min(bounds.maxX, currentX));
  currentY = Math.max(bounds.minY, Math.min(bounds.maxY, currentY));
  scene.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

// Center the grid on page load
function centerGrid() {
  const containerRect = scene.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate center position
  currentX = (viewportWidth - containerRect.width) / 2;
  currentY = (viewportHeight - containerRect.height) / 2;
  
  scene.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

// Call on page load
centerGrid();


// Make only images clickable
const images = document.querySelectorAll('.item img');
images.forEach((img, index) => {
  img.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent drag when clicking
    console.log(`Image ${index + 1} clicked!`);
    
    // Do whatever you want when image is clicked
    // img.style.border = '3px solid red';
  });
});