// Welcome Alert
window.onload = function () {
    alert("Welcome to Ayush's Portfolio!");
};

// Smooth Scroll Navigation
let navLinks = document.querySelectorAll("nav a");

for (let i = 0; i < navLinks.length; i++) {

    navLinks[i].addEventListener("click", function (event) {
        event.preventDefault();

        let targetId = this.getAttribute("href").substring(1);
        let targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
}

// Highlight Section When Clicked
function highlightSection(sectionId) {

    let sections = document.querySelectorAll("section");

    for (let i = 0; i < sections.length; i++) {
        sections[i].style.backgroundColor = "white";
    }

    document.getElementById(sectionId).style.backgroundColor = "#f0f8ff";
}

// Add Click Event to Navigation for Highlighting
let sections = document.querySelectorAll("section");

for (let i = 0; i < navLinks.length; i++) {

    navLinks[i].addEventListener("click", function () {

        let targetId = this.getAttribute("href").substring(1);
        highlightSection(targetId);

    });
}
