// Case study content
document.addEventListener("DOMContentLoaded", () => {
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("nav-list");
const chips = Array.from(document.querySelectorAll(".chip"));
const projects = Array.from(document.querySelectorAll(".project"));
const modal = document.getElementById("case-modal");
let viewButtons = Array.from(document.querySelectorAll(".view"));
const animatedTagline = document.getElementById("animated-tagline");

const CASES = {
    budget: {
        title: "Budget Calculator",
        overview:
            "A responsive budgeting calculator that uses chart.js to enhance the user experience",
        tech: ["Chart.js", "JavaScript", "HTML", "CSS"],
        learned: ["chart.js", "hidden and not hidden states", "localStorage"],
        challenges: [
            "Edge-case large percents",
            "Mobile layouts",
            "Working with teamates",
        ],
        habits: ["Collaborating", "Daily and on task work"],
    },
    zen: {
        title: "Zen Garden",
        overview: "CSS selectors and art",
        tech: ["CSS"],
        learned: ["Creative styles", "Selectors"],
        challenges: ["converting em to px"],
        habits: ["Perserverence"],
    },
    todo: {
        title: "To-Do List",
        overview: "Minimal task manager",
        tech: ["JS", "LocalStorage"],
        learned: ["JavaScript", "LocalStorage"],
        challenges: ["Keeping states in LocalStorage"],
        habits: ["Problem Solving"],
    },
    vex: {
        title: "VEX Robot",
        overview: "Robot system precoded and modular",
        tech: ["C++", "CAD"],
        learned: [
            "Control loops",
            "Proficiency with potentiometers and other machine systems",
        ],
        challenges: ["Size constraints"],
        habits: ["Test & iterate"],
    },
    figma: {
        title: "Zoo enrichment app (Figma)",
        overview: "Design system for zoological enrichment UI.",
        tech: ["Figma"],
        learned: ["Variables", "Component libraries"],
        challenges: ["Consistency and across-screen functionality"],
        habits: ["Teamwork"],
    },
    research: {
        title: "Research Paper",
        overview:
            "Study on the effects of enritchment on the stress and psyche of captive animals",
        tech: ["Writing", "Research"],
        learned: ["Research techniques", "Note taking methods"],
        challenges: ["Looking for relevent information"],
        habits: ["Document everything"],
    },
    "writing-resume": {
        title: "Resume Writing",
        overview: "Web Development focused resume.",
        tech: ["Writing"],
        learned: ["Resume and interview techniques"],
        challenges: ["conciseness"],
        habits: ["Peer review"],
    },
};
});