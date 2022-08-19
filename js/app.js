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
    isLink ? targ.attributes.href.value : `#${targ.id}`
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
  const navItem = document.createElement("li")
  navItem.className = "menu__link"

  isHome
    ? navItem.append(homeButton)
    : (navItem.innerHTML = `<a href="#${section.id}" onclick="HandleClick(event)">
          ${theSection.dataset.nav}
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
homeButton.innerHTML = `<span><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="white"
width="1em" height="1em" viewBox="0 0 495.398 495.398" style="enable-background:new 0 0 495.398 495.398;"
xml:space="preserve">
<g>
   <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
     v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
     c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
     c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
   <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
     c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
     c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
;</g></svg></span>`

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
