const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navLinks.classList.toggle("open", !isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    });

    navAnchors.forEach((anchor) => {
        anchor.addEventListener("click", () => {
            navToggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("open");
            document.body.classList.remove("nav-open");
        });
    });
}

const sections = [...document.querySelectorAll("main section[id], footer[id]")];

if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navAnchors.forEach((anchor) => {
                anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: "-38% 0px -52% 0px",
        threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));
}

const featuredCarousel = document.querySelector("[data-featured-carousel]");
const featuredSlides = [...document.querySelectorAll("[data-featured-slide]")];
const featuredDots = [...document.querySelectorAll("[data-featured-dots] button")];
const featuredPrev = document.querySelector("[data-featured-prev]");
const featuredNext = document.querySelector("[data-featured-next]");
let featuredIndex = 0;

function showFeaturedSlide(index) {
    if (!featuredSlides.length) {
        return;
    }

    featuredIndex = (index + featuredSlides.length) % featuredSlides.length;

    featuredSlides.forEach((slide, i) => {
        const isActive = i === featuredIndex;
        slide.classList.toggle("is-active", isActive);
        slide.hidden = !isActive;
    });

    featuredDots.forEach((dot, i) => {
        const isActive = i === featuredIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

if (featuredCarousel && featuredSlides.length > 1) {
    featuredPrev?.addEventListener("click", () => showFeaturedSlide(featuredIndex - 1));
    featuredNext?.addEventListener("click", () => showFeaturedSlide(featuredIndex + 1));

    featuredDots.forEach((dot, i) => {
        dot.addEventListener("click", () => showFeaturedSlide(i));
    });

    featuredCarousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showFeaturedSlide(featuredIndex - 1);
        }
        if (event.key === "ArrowRight") {
            showFeaturedSlide(featuredIndex + 1);
        }
    });

    showFeaturedSlide(0);
}
