

// Importing the markup of the testimonials
import { testimonialsMarkup } from "./markup.js";

// Getting elements form the document
const navToggleBtn = document.querySelector(".header__toggle-btn");
const nav = document.querySelector(".main-nav");
const navOverlay = document.querySelector(".nav-overlay");

const emailForm = document.querySelector("footer form");
const emailInput = emailForm.querySelector("#email-input");
const submitBtn = emailForm.querySelector("button");
const errorMessage = emailForm.querySelector(".error-message");

const testimonialsSection = document.querySelector(".section-testimonials ")
const testimonialsContaner = testimonialsSection.
  querySelector(".section__content .container");


const sliderBtns = testimonialsSection.querySelectorAll(".slider-btn");
const previousBtn = testimonialsSection.querySelector(".previous-btn");
const nextBtn = testimonialsSection.querySelector(".next-btn");


// Global variable
let prevent = true; // Should the form get prevented from being submitted ?



// Handling the first load of the page
document.addEventListener("DOMContentLoaded", () => {

  handleResizing();

  window.addEventListener("resize", () => handleResizing());

  handleSliderBtns();
  handlePreviousNextBtns()

  navToggleBtn.addEventListener("click", () => manageNav());

  emailInput.addEventListener("keyup", () => checkInput());

  submitBtn.addEventListener("click", (e) => {
    if (prevent) e.preventDefault()
  });

});


// Function => Manage the nav and its overlay
function manageNav() {

  navOverlay.classList.toggle("show-up")
  navToggleBtn.classList.toggle("opened");
  nav.classList.toggle("opened");

}


// Function => Check the validity of the email input
function checkInput() {

  let value = emailInput.value;

  if (value == "" || !(/.*@.+\..+/.test(value))) {

    errorMessage.classList.add("show-up");
    prevent = true;

  } else {

    errorMessage.classList.remove("show-up");
    prevent = false;

  }

}

// Function => Handling how different elements are going to appear on different screen sizes
function handleResizing() {

  let windowWidth = window.innerWidth;

  if (windowWidth > 1200) {

    nav.classList.add("opened");
    navToggleBtn.classList.remove("opened")
    navOverlay.classList.remove("show-up");

  } else {

    if (!navToggleBtn.classList.contains("opened")) {

      nav.classList.remove("opened");

    }

  }
  testimonialsContaner.innerHTML = testimonialsMarkup;

  if (windowWidth > 768) {

    testimonialsSection.classList.add("desktop");

  } else {

    sliderBtns.forEach(item => {

      item.classList.remove("active");

      if (item.isSameNode(sliderBtns[0])) {
        item.classList.add("active");
      }

    });

    testimonialsSection.classList.remove("desktop");
    testimonialsContaner.innerHTML = testimonialsMarkup;

  }

}

// Function => Handling the slider buttons
function handleSliderBtns() {

  sliderBtns.forEach(btn => {

    btn.addEventListener("click", (e) => {

      let testimonials = Array.from(testimonialsContaner.children);

      sliderBtns.forEach(btn => btn.classList.remove("active"));

      testimonialsContaner.classList.add("fade");

      testimonials.forEach(testimonial => {

        setTimeout(() => {
          testimonial.classList.remove("active");

          if (e.target.dataset.id == testimonial.dataset.id) {

            testimonialsContaner.classList.remove("fade");
            e.target.classList.add("active");
            testimonial.classList.add("active");

          }
        }, 500);

      });

    });

  });

}


// Function => handling previous and next buttons
function handlePreviousNextBtns() {

  // Next Button
  nextBtn.addEventListener("click", () => {

    let clone = testimonialsContaner.firstElementChild.cloneNode(true);
    let firstAnimation = true;

    testimonialsContaner.style.animation = "move-left .5s linear";
    nextBtn.style.pointerEvents = "none";

    testimonialsContaner.addEventListener("animationend", () => {

      if (firstAnimation) {

        testimonialsContaner.insertAdjacentElement("beforeend", clone)
        testimonialsContaner.firstElementChild.remove();
        firstAnimation = false;

      }

      nextBtn.style.pointerEvents = "all";
      testimonialsContaner.style.animation = "none";

    });

  });


  previousBtn.addEventListener("click", () => {

    let clone = testimonialsContaner.lastElementChild.cloneNode(true);
    let firstAnimation = true;

    testimonialsContaner.style.animation = "move-right .5s linear";
    previousBtn.style.pointerEvents = "none";

    testimonialsContaner.addEventListener("animationend", () => {

      if (firstAnimation) {

        testimonialsContaner.insertAdjacentElement("afterbegin", clone)
        testimonialsContaner.lastElementChild.remove();
        firstAnimation = false;

      }

      previousBtn.style.pointerEvents = "all";
      testimonialsContaner.style.animation = "none";

    });

  });
}
