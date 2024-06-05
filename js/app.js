/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// Navigation ul
const navList = document.getElementById('navbar__list');
// Sections
const sections = document.querySelectorAll('section');
// Scrolling variable
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Generate nav list item
function generateNavItem(item) {
  // Create nav list fragment
  const navListFragment = document.createDocumentFragment();

  // Create nav item / add class
  const navItem = document.createElement('li');
  
  // Create anchor tag / add href / add text
  const navAnchor = document.createElement('a');
  navAnchor.classList.add('menu__link')
  navAnchor.href = '#' + item.id;
  navAnchor.textContent = item.dataset.nav;
  
  // Append anchor to nav item
  navItem.appendChild(navAnchor);
  // Append  nav item to nav list fragment
  navListFragment.appendChild(navItem);

  // Append fragment to navbar list
  return navList.appendChild(navListFragment);
};

// Top of view
function isVisible(element) {
  const rect = element.getBoundingClientRect();
  //  Deconstruct object to get top and bottom values
  const { top, bottom } = rect;
  // Return wether or not element is in viewport
  return (top <= 150 && bottom >= 150);
};

// Smooth scroll
function smoothScroll(e) {
  // Prevent default behavior
  e.preventDefault();
  // Get section id
  const targetId = e.target.getAttribute('href').slice(1);
  // Scroll to section
  scrollToAnchorId(targetId);
}

// Hide / Show navigation bar
function showOnScroll() {
  // Get nav bar
  const navbar = document.querySelector('.navbar__menu');

  // Show navbar when scrolling
  navbar.style.display = 'block';

  // Clear scrolling timeout
  window.clearTimeout(isScrolling);

  // Hide navbar using timeout after two seconds
  isScrolling = setTimeout(() => {
    // Hide navbar
    navbar.style.display = 'none';
  }, 2000);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(arr) {
  // Loop through array and build out nav menu
  arr.forEach(item => {
    // Generate nav list item
    generateNavItem(item);
  });
};

// Add class 'active' to section when near top of viewport
function activeSection() {
  for(const section of sections) {
    // Current section in viewport
    const isActive = isVisible(section)
    // Add / remove active-section class to section in viewport
    isActive ? section.classList.add('active-section') : section.classList.remove('active-section');
  }
};

// Scroll to anchor ID using scrollTO event
function scrollToAnchorId(anchorId) {
  // Get target section
  const targetSection = document.getElementById(anchorId);
  // Check if target section
  if(targetSection) {
    // Scroll to section
    targetSection.scrollIntoView({behavior: 'smooth'});
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', () => {
  // Build menu 
  buildNav(sections);

  // Scroll to section on link click
  navList.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', (e) => {
      smoothScroll(e);
    })
  });

  // Set sections as active
  document.addEventListener('scroll', (e) => {
    // Prevent default behavior
    // e.preventDefault();
    activeSection();
    // Hide / Show naivgation bar if user is scrolling
    showOnScroll();
  });
});


