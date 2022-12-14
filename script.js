"use strict";

// MODAL
const btnShowModal = document.querySelector(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

btnShowModal.addEventListener("click", function (e) {
  e.preventDefault();

  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// SMOOTH SCROLLING

const btnScrollToAbout = document.querySelector(".btn-scroll--about");
const btnScrollToAdoption = document.querySelector(".btn-scroll--adoption");
const btnScrollToMeet = document.querySelector(".btn-scroll--meet");
const sectionAbout = document.querySelector(".section--about");
const sectionAdoption = document.querySelector(".section--adoption");
const sectionMeet = document.querySelector(".meet-cats");

// const coordinatesSectionAdoption = sectionAdoption.getBoundingClientRect();

btnScrollToAbout.addEventListener("click", function () {
  // Modern way
  sectionAbout.scrollIntoView({ behavior: "smooth" });
});

btnScrollToAdoption.addEventListener("click", function () {
  // Modern way
  sectionAdoption.scrollIntoView({ behavior: "smooth" });
});

btnScrollToMeet.addEventListener("click", function () {
  // Modern way
  sectionMeet.scrollIntoView({ behavior: "smooth" });
});

// TABBED COMPONENT
const tabs = document.querySelectorAll(".tab");
const tabContainer = document.querySelector(".tab-container");
const tabsContent = document.querySelectorAll(".content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tab");

  if (!clicked) return;

  // Clear active tab and content
  tabs.forEach((t) => t.classList.remove("tab-active"));
  tabsContent.forEach((c) => c.classList.remove("content-active"));

  // Active tab
  clicked.classList.add("tab-active");

  // Active content
  document
    .querySelector(`.content-${clicked.dataset.tab}`)
    .classList.add("content-active");
});

// STICKY NAVIGATION

const header = document.querySelector("header");
const navHeight = document.querySelector(".nav").getBoundingClientRect().height;
console.log(navHeight);
const nav = document.querySelector(".nav");

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-76px`,
};

const headerObserver = new IntersectionObserver(stickyNav, options);

headerObserver.observe(header);

// REVEAL elements ON SCROLL

const allSections = document.querySelectorAll(".section");

// 2.
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");

  observer.unobserve(entry.target);
};

// 1.
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// LAZY LOADING IMAGES

const allImages = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // remove '-'!!!
});

allImages.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// SLIDER
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // -- Dots --
  const dotContainer = document.querySelector(".dots");

  // // 1. Creating dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // 2. Selecting all the dots and deactivating them
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // 3. Activating current dot
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
