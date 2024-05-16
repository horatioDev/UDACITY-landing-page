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
const navList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');


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
function isTopViewport(element) {
 const rect = element.getBoundingClientRect();
 if(rect.top == 0 && rect.bottom <= rect.height) return rect;
};

// Scrolling
function isScrolling(element) {
  const rect = element.getBoundingClientRect();
  if(rect.top >= 0 && rect.bottom >= rect.height) return rect;
};

// Smooth scroll
function smoothScroll(e) {
  // Prevent default behavior
  e.preventDefault();
  // Get section id
  const targetId = e.target.getAttribute('href').slice(1);
  // Get target section
  const targetSection = document.getElementById(targetId);
  // Scroll to section
  targetSection.scrollIntoView({behavior: 'smooth'});
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(arr) {
  arr.forEach(item => {
    generateNavItem(item);
  });
};

// Add class 'active' to section when near top of viewport
function activeSection() {
  for(const section of sections) {
    const activeSection = isTopViewport(section);
    if(activeSection) {
      section.classList.add('active-section');
    } else {
      section.classList.remove('active-section');
    }
  }
};

// Scroll to anchor ID using scrollTO event
function scrollToAnchorId() {
  // Loop through sections to get top section in view
  sections.forEach((section, idx) =>{
    const rect = section.getBoundingClientRect();

    // Calculate section top relative to viewport
    const relativeSectionTop = rect.top;

    // Check if section is visible
    const isVisible = relativeSectionTop >= 0 && relativeSectionTop < window.innerHeight;

    // Check if it's the last section or there's no other section below it
    const isLastSection = idx === sections.length - 1;
    const isNextSectionBelow = idx < sections.length - 1 && sections[idx + 1].getBoundingClientRect().top > window.innerHeight;

    // If the section is partially visible or fully visible and it's the last section or there's no other section below it, scroll to the next section
    if ((isVisible || (relativeSectionTop < 0 && rect.bottom > 0)) && (isLastSection || !isNextSectionBelow)) {
      sections[idx].scrollIntoView({ behavior: 'smooth' });
    }
  })
}
scrollToAnchorId()

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
      smoothScroll(e)
    })
  });
  // Set sections as active
  document.addEventListener('scroll', () => {
    activeSection();
  })
});


