let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
  wrapperClass: "page__wrapper",
  slideClass: "page__screen", 
  direction: 'vertical',
  slidesPerView: 'auto',  

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  mousewheel: {
    sensitivity: 1, 
  },

  watchOverflow: true,
  speed: 800,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true, 
  },
  navigation: {
    nextEl: '.page-button-next',
    prevEl: '.page-button-prev',
  },

  init: false,

  on: {
    init: function () {
      menuSlider(); 
      setScrollType();
      changePageNumber();
      getPageValueScroll();
      changePageNumberScroll();
    },
    slideChangeTransitionStart: function () {
      changePageNumberScroll();
      menuSliderRemove();
      menuLinks[pageSlider.realIndex].classList.add('_active');
    },
    resize: function () {
      setScrollType();
    }
  }
});

// menu
let menuLinks = document.querySelectorAll('.menu__link');
let menuIcon = document.querySelector('.menu__icon');

function menuSlider () {    
  menuIcon.addEventListener('click', function (e) {
    document.documentElement.classList.toggle('menu-open');
  });

  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add('_active');
    for (let index = 0; index < menuLinks.length; index++) {
      const menuLink = menuLinks[index];
      menuLink.addEventListener('click', function (e) {
        menuSliderRemove();
        document.documentElement.classList.contains('menu-open') ?  
          document.documentElement.classList.remove('menu-open') : null;
        pageSlider.slideTo(index, 800);
        menuLink.classList.add('_active');
        e.preventDefault();
      });
    }
  }
}
function menuSliderRemove() {
  let menuLinkActive = document.querySelector('.menu__link._active');
  if (menuLinkActive) {
    menuLinkActive.classList.remove('_active');
  }
}
function setScrollType() {
  if (wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free');
    pageSlider.params.freeMode.enabled = false;
  }
  for (let index = 0; index < pageSlider.slides.length; index++) {
    const pageSlide = pageSlider.slides[index];
    const pageSlideContent = pageSlide.querySelector('.screen__body');
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight;
      if ((pageSlideContentHeight > window.innerHeight) || (window.innerWidth < 991)) {
        wrapper.classList.add('_free');
        pageSlider.params.freeMode.enabled = true;
        break;
      }
    }
  }
}


pageSlider.init();


function changePageNumber() {  
  const screenActive = document.documentElement.querySelector(".screen.swiper-slide-active");
  const getAttributeScreenActive = screenActive.getAttribute("aria-label");
  const arrayPageNumbers = getAttributeScreenActive.split(" / ");
  const pageValue = arrayPageNumbers[1];
  const screenPageNumber = document.documentElement.querySelectorAll(".screen__page-number");
  for (let i = 0; i < Number(pageValue); i++) {
    screenPageNumber[i].innerHTML = `0${(i+1)}`
  }  
}  
function getPageValueScroll() {
  const screenActive = document.documentElement.querySelector(".screen.swiper-slide-active");
  const getAttributeScreenActive = screenActive.getAttribute("aria-label");
  const arrayPageNumbers = getAttributeScreenActive.split(" / ");
  const pageValue = arrayPageNumbers[1];
  const scrollPageValue = document.documentElement.querySelector(".page__scroll-page-value");
  scrollPageValue.innerHTML = `0${Number(pageValue)}`
}  
function changePageNumberScroll() {
  const screenActive = document.documentElement.querySelector(".screen.swiper-slide-active");
  const getAttributeScreenActive = screenActive.getAttribute("aria-label");
  const arrayPageNumbers = getAttributeScreenActive.split(" / ");
  const pageNumberActive = arrayPageNumbers[0];
  const scrollPageNumber = document.documentElement.querySelector(".page__scroll-page-number");
  scrollPageNumber.innerHTML = `0${Number(pageNumberActive)}`
}  


