gsap.registerPlugin(ScrollTrigger);

window.scroll(0, 0);
gsap.set('.main-page', { autoAlpha: 0 });

const loadingContent = document.querySelector('.loading-content');
const loadingBorder = document.querySelectorAll('.loading-border');

function borderSlide() {
  gsap.set('.loading-border-top', { xPercent: -100 });
  gsap.set('.loading-border-right', { yPercent: -100 });
  gsap.set('.loading-border-bottom', { xPercent: 100 });
  gsap.set('.loading-border-left', { yPercent: 100 });

  const tl = gsap.timeline({ defaults: { duration: 0.5 }, onComplete: start });

  tl.to('.loading-border-top', { xPercent: 0 }, 0.5)
    .to('.loading-border-right', { yPercent: 0 })
    .to('.loading-border-bottom', { xPercent: 0 })
    .to('.loading-border-left', { yPercent: 0 })
    .to(loadingBorder, { borderRadius: '50%' })
    .to('.loading', { overflow: 'visible', duration: 0 })
    .to(loadingBorder, { width: '120vw', height: '120vw', duration: 1 })
    .to('.intro', { autoAlpha: 0 }, '-=1');
}

function loadingAnim() {
  borderSlide();

  let int = setInterval(() => {
    loadingContent.textContent += '.';
  }, 500);

  setTimeout(() => {
    clearInterval(int);
  }, 2100);
}

function start() {
  gsap.set('.main-page', { autoAlpha: 1 });

  titleIntro();
  imageCardsEntrance();
  spanReveal();
  detailsSlide();
  footerEntrance();
}

const heroVideo = document.querySelector('.hero-video');
heroVideo.muted = true;
const logo = document.querySelector('.logo');
const heroVideoMask = document.querySelector('.hero-img');
const heroText = document.querySelectorAll('.hero-text-mask p');
const heroTextMask = document.querySelectorAll('.hero-text-mask');

function titleIntro() {
  gsap.set(logo, { autoAlpha: 0 });

  gsap.set([heroText, heroVideo], { yPercent: 105 });
  gsap.set([heroTextMask, heroVideoMask], { yPercent: -101 });

  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power1.out',
    },
  });

  tl.to([heroText, heroTextMask], {
    yPercent: 0,
    onComplete: () => {
      heroTextMask.forEach((mask) => {
        mask.classList.add('hero-anim-complete');
      });
    },
  })
    .to([heroVideo, heroVideoMask], { yPercent: 0 })
    .to(logo, {
      autoAlpha: 1,
    });
}

const logoLetter1 = document.querySelector('.logo-letter1');
const logoLetter2 = document.querySelector('.logo-letter2');
const logoLetter3 = document.querySelector('.logo-letter3');

function logoAnim() {
  const tl = gsap.timeline({
    defaults: { duration: 0.3 },
  });

  tl.to(logoLetter3, { x: 25, duration: 0.2 })
    .to(logoLetter3, { x: 0 })
    .to(logoLetter2, { x: -10 }, '-=0.1')
    .to(logoLetter1, { x: -25 }, '-=0.2')
    .to(logoLetter1, { x: 0 })
    .to(logoLetter2, { x: 0 }, '-=0.1');
}

setInterval(() => {
  logoAnim();
}, 5000);

const imgSection = document.querySelector('.image-cards');
const cards = document.querySelectorAll('.img-card');
const cardMask = document.querySelectorAll('.img-card-mask');

function imageCardsEntrance() {
  gsap.set(cards, { yPercent: 105 });
  gsap.set(cardMask, { yPercent: -101 });

  const tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'power1.out',
    },
  });

  cards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 70%',

      onToggle: () =>
        tl.to([card, cardMask[index]], {
          yPercent: 0,
        }),
    });
  });
}

function moveImages(e) {
  if (e.target.classList.value === 'image-cards') {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    // Get 0 0 in center of screen
    const xPos = offsetX / clientWidth - 0.5;
    const yPos = offsetY / clientHeight - 0.5;

    const leftImages = gsap.utils.toArray('.img-card-container-left .img-card');

    const rightImages = gsap.utils.toArray(
      '.img-card-container-right .img-card'
    );

    const modifier = (index) => index * 1.2 + 0.5;

    leftImages.forEach((image, index) => {
      gsap.to(image, {
        duration: 1.2,
        x: xPos * 15 * modifier(index),
        y: yPos * 25 * modifier(index),
        rotationX: yPos * 10,
        rotationY: xPos * 25,
        ease: 'power3.out',
      });
    });

    rightImages.forEach((image, index) => {
      gsap.to(image, {
        duration: 1.2,
        x: -(xPos * 15 * modifier(index)),
        y: -(yPos * 25 * modifier(index)),
        rotationX: -(yPos * 10),
        rotationY: -(xPos * 25),
        ease: 'power3.out',
      });
    });
  }
}

imgSection.addEventListener('mousemove', moveImages);

const span = document.querySelector('.page-span');
const spanMask = document.querySelector('.page-span-mask');
const spanText = document.querySelector('.page-span p');
const spanTextMask = document.querySelector('.span-text-mask');

function spanReveal() {
  gsap.set([span, spanTextMask], { yPercent: 105 });
  gsap.set([spanMask, spanText], { yPercent: -101 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: span,
      start: 'top 70%',
    },
    defaults: {
      duration: 0.8,
    },
  });

  tl.to([span, spanMask], { yPercent: 0 }).to([spanText, spanTextMask], {
    yPercent: 0,
  });
}

const detailsTitle = document.querySelector('.details-heading');
const detailsTitleMask = document.querySelector('.details-heading-mask');

const detailsImages = document.querySelectorAll('.details-img');
const detailsImagesMask = document.querySelectorAll('.details-img-mask');
const detailsText = document.querySelectorAll('.details-p');
const detailsTextMask = document.querySelectorAll('.details-p-mask');

function sectionSlide(img, text, index) {
  const tl = gsap.timeline({ defaults: { duration: 0.8 } });

  tl.to([img, text, detailsImagesMask[index], detailsTextMask[index]], {
    yPercent: 0,
  });

  return tl;
}

function detailsSlide() {
  gsap.set(detailsTitle, { yPercent: 105 });
  gsap.set(detailsTitleMask, { yPercent: -101 });

  gsap.to([detailsTitle, detailsTitleMask], {
    scrollTrigger: {
      trigger: detailsTitle,
      start: 'top 70%',
    },
    yPercent: 0,
    duration: 1.2,
  });

  detailsImages.forEach((img, index) => {
    gsap.set([detailsImagesMask[index], detailsText[index]], {
      yPercent: -100,
    });
    gsap.set([img, detailsTextMask[index]], { yPercent: 100 });
    ScrollTrigger.create({
      trigger: img,
      start: 'top 70%',
      animation: sectionSlide(img, detailsText[index], index),
    });
  });
}

const footerLogo = document.querySelector('.footer-logo');

function footerEntrance() {
  gsap.fromTo(
    footerLogo,
    { yPercent: 100, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1.2,
      scrollTrigger: {
        trigger: footerLogo,
        start: 'top bottom+=50',
      },
    }
  );
}

window.addEventListener('load', () => {
  loadingAnim();
});
