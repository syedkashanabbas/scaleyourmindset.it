gsap.registerPlugin(ScrollTrigger);

const heroCanvas = document.getElementById("hero-bg");

const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    end: "bottom+=100% top",  // was 200%, now half
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

// Zoom in the canvas smoothly
heroTimeline.to(heroCanvas, {
  scale: 2.5,
  ease: "power2.inOut",
}, 0);

// Fade out hero text sooner now
heroTimeline.to("#hero-section", {
  opacity: 0,
  y: -100,
  ease: "power2.out",
}, 0.5); // fade-out starts earlier to match shorter scroll

// Helper: Typing effect
function typeText(element, text, delay = 0, speed = 30) {
  element.innerHTML = "";
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      element.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }, delay);
}

// Scroll animation timeline
const messages = gsap.utils.toArray(".chat-message");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#chat-section",
    start: "top top",
    end: "+=400%",
    scrub: true,
    pin: true,
  }
});

// Animate messages appearing one by one
messages.forEach((msg, i) => {
  const originalText = msg.innerText.trim();
  msg.dataset.hasTyped = "false"; // Add a flag to each message

  tl.to(msg, {
    opacity: 1,
    duration: 0.3,
    onStart: () => {
      // Only trigger typing ONCE
      if (msg.dataset.hasTyped === "false") {
        msg.dataset.hasTyped = "true";
        typeText(msg.querySelector("div") || msg, originalText);
      }
    },
  }, "+=1.2");
});


// Section reveal animation using IntersectionObserver
const integrationSection = document.querySelector('#integration-section');
const integrationContent = document.querySelector('#integration-content');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      integrationContent.classList.remove('opacity-0', 'translate-y-10');
      integrationContent.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.2 });

observer.observe(integrationSection);
const inverseWhiteSection = document.querySelector('#integration-inverse');
const inverseWhiteContent = document.querySelector('#integration-inverse-content');

const observerInverse = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      inverseWhiteContent.classList.remove('opacity-0', 'translate-y-10');
      inverseWhiteContent.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.2 });

observerInverse.observe(inverseWhiteSection);
const miniSection = document.querySelector('#mini-section');
const miniContent = document.querySelector('#mini-content');

const observerMini = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      miniContent.classList.remove('opacity-0', 'translate-y-10');
      miniContent.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.2 });

observerMini.observe(miniSection);
