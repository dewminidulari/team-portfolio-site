


// 1. TYPING EFFECT
// ===============================

const typingText = document.querySelector(".typing");

const words = [
    "with purpose.",
    "with passion.",
    "with GitHub.",
    "with teamwork."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 70 : 120);
}

typeEffect();


// 2. MOBILE MENU
// ===============================

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("show");
    });

}


// Close mobile menu after clicking a link

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navigation) {
            navigation.classList.remove("show");
        }

    });

});


// 3. DARK MODE TOGGLE
// ===============================

const themeButton = document.querySelector(".theme-toggle");

if (themeButton) {

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        // Save user's theme preference
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });

}


// Load saved theme when page opens

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


// 4. ACTIVE NAVIGATION LINK
// ===============================

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");

        }

    });

    links.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// 5. CONTACT FORM VALIDATION
// ===============================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.querySelector("#name");
        const email = document.querySelector("#email");
        const message = document.querySelector("#message");

        // Remove old error messages
        document.querySelectorAll(".error-message").forEach(function (error) {
            error.remove();
        });

        let valid = true;


        // Validate name

        if (name.value.trim() === "") {

            showError(name, "Please enter your name.");
            valid = false;

        }


        // Validate email

        if (email.value.trim() === "") {

            showError(email, "Please enter your email.");
            valid = false;

        } else if (!validateEmail(email.value.trim())) {

            showError(email, "Please enter a valid email address.");
            valid = false;

        }


        // Validate message

        if (message.value.trim() === "") {

            showError(message, "Please enter your message.");
            valid = false;

        }


        // If everything is valid

        if (valid) {

            alert("Thank you! Your message was sent.");

            contactForm.reset();

        }

    });

}


// Email validation function

function validateEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// Display error message

function showError(input, message) {

    const error = document.createElement("small");

    error.className = "error-message";
    error.textContent = message;

    input.parentNode.appendChild(error);

}