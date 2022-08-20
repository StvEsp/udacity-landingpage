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

const nav = document.querySelector("#navbar__list")

// Create blank Array which will be populated once links are added to the DOM
const navLinksArray = []

// Create Nodelist from sections
const sections = document.querySelectorAll("section")

// Create Array of sections from nodelist
const sectionsArray = Array.from(sections)
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const navFragment = document.createDocumentFragment()

// Scroll to section on link click
// Assigns event target SetActiveLink function
function HandleClick(event) {
  event.preventDefault()
  SetActiveLink(event.target, true)
}

// Reusing same function for nav link click and scroll events
function SetActiveLink(targ, isLink) {
  // Get relevant identifier from target. If isLink is true, target is a link. If false, target is a section.
  const eventTargetValue = `${

    isLink ? targ.parentElement.attributes.href.value : `#${targ.id}`
  }`

 
  // Find target element
  const linkTarget = document.querySelector(eventTargetValue)

  // If link, scroll to section
  // Scroll to anchor ID using scrollIntoView event
  isLink && linkTarget.scrollIntoView({ behavior: "smooth" })

  // Manage active/non-active sections
  sectionsArray.forEach((section) => {
    {
      section.id === linkTarget.id
        ? section.classList.add("your-active-class")
        : section.classList.remove("your-active-class")
    }
  })

  // Manage active/non-active nav li items
  navLinksArray.forEach((navLi) => {
    const navLinkVal = navLi.firstElementChild.attributes.href.value
    {
      navLinkVal.replace("#", "") === linkTarget.id
        ? navLi.classList.add("your-active-class")
        : navLi.classList.remove("your-active-class")
    }
  })
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function buildNav(section, isHome) {
  const theSection = section ? section : null
  const label = theSection && theSection.dataset.nav
  const navItem = document.createElement("li")
  navItem.className = "menu__link"

  isHome
    ? navItem.append(homeButton)
    : (navItem.innerHTML = `<a href="#${
        section.id
      }" onclick="HandleClick(event)">
          <div class="full-label">${label}</div>
          <div class="short-label">${label.charAt(0)}${label.slice(-1)}</div>
        </a>`)

  navFragment.appendChild(navItem)
  navLinksArray.push(navItem)
}

// Build menu
var homeButton = document.createElement("a")
homeButton.setAttribute("href", "")
homeButton.setAttribute(
  "onclick",
  `event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });`
)
homeButton.innerHTML = `<span class="material-icons home-btn">home</span>`

buildNav(null, true)

// Build nav links
Object.values(sections).map((section) => buildNav(section, false))

// Add menu to DOM
nav.append(navFragment)

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", ScrollActions)
function ScrollActions() {
  sectionsArray.forEach((section) => {
    const pos = Math.floor(section.offsetTop - window.pageYOffset)
    if (pos <= 110 && pos >= 0) {
      SetActiveLink(section, false)
    }
  })
}

/**
 * End Main Functions
 * Begin Events
 *
 */
