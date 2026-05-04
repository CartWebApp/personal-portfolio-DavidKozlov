document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.getElementById("nav-list");
    const chips = Array.from(document.querySelectorAll(".chip"));
    const projects = Array.from(document.querySelectorAll(".project"));
    const modal = document.getElementById("case-modal");
    const modalContent = document.getElementById("case-content");
    const modalClose = modal ? modal.querySelector(".modal-close") : null;
    let viewButtons = Array.from(document.querySelectorAll(".view"));
    if (viewButtons.length === 0)
        viewButtons = Array.from(document.querySelectorAll("button[data-id]"));
    const animatedTagline = document.getElementById("animated-tagline");

    // Nav toggle for small screens
    if (navToggle && navList) {
        navToggle.addEventListener("click", () => {
            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
            if (!expanded) navList.style.display = "block";
            else navList.style.display = "";
        });
    }

    // Filter chips
    if (chips.length > 0 && projects.length > 0) {
        chips.forEach((chip) =>
            chip.addEventListener("click", () => {
                chips.forEach((c) => c.classList.remove("active"));
                chip.classList.add("active");
                const filter = chip.dataset.filter;
                projects.forEach((p) => {
                    if (filter === "all" || p.dataset.type === filter) {
                        p.style.display = "";
                    } else {
                        p.style.display = "none";
                    }
                });
            }),
        );
    }

    // Case study content (matches data-id on buttons)
    const CASES = {
        budget: {
            title: "Budget Calculator",
            overview:
                "A responsive budgeting calculator that uses chart.js to enhance the user experience",
            tech: ["Chart.js", "JavaScript", "HTML", "CSS"],
            learned: [
                "Chart.js",
                "Hidden and not hidden states",
                "LocalStorage",
            ],
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
            challenges: ["Converting em to px"],
            habits: ["Perserverence"],
        },
        todo: {
            title: "To-Do List",
            overview: "Minimal task manager",
            tech: ["JS", "LocalStorage"],
            learned: ["JavaScript", "LocalStorage"],
            challenges: ["Keeping correct states in LocalStorage"],
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

    // Open modal with case study
    let lastFocusedEl = null;
    function renderListOrText(value) {
        if (!value) return "";
        if (Array.isArray(value))
            return `<ul>${value.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        return `<p>${value}</p>`;
    }
    function openCase(id) {
        const data = CASES[id];
        if (!data || !modal || !modalContent) return;
        const html = `\n      <h2>${data.title}</h2>\n      <p class="muted">${data.overview}</p>\n      <h3>Technology &amp; Tools</h3>\n      ${renderListOrText(data.tech)}\n      <h3>Concepts Learned</h3>\n      ${renderListOrText(data.learned)}\n      <h3>Challenges &amp; Solutions</h3>\n      ${renderListOrText(data.challenges)}\n      <h3>Habits of Mind</h3>\n      ${renderListOrText(data.habits)}\n    `;
        modalContent.innerHTML = html;
        lastFocusedEl = document.activeElement;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        const closeBtn = modal.querySelector(".modal-close");
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        if (!modal || !modalContent) return;
        modal.setAttribute("aria-hidden", "true");
        modalContent.innerHTML = "";
        document.body.style.overflow = "";
        if (lastFocusedEl && typeof lastFocusedEl.focus === "function")
            lastFocusedEl.focus();
        lastFocusedEl = null;
    }

    if (viewButtons.length > 0) {
        viewButtons.forEach((b) =>
            b.addEventListener("click", () => openCase(b.dataset.id)),
        );
    }
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modal)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // IntersectionObserver
    try {
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((ent) => {
                    if (ent.isIntersecting) ent.target.classList.add("inview");
                }),
            { threshold: 0.12 },
        );
        document
            .querySelectorAll(".panel, .card, .project, .timeline-item")
            .forEach((el) => io.observe(el));
    } catch (err) {
        alert("IntersectionObserver not supported");
    }

    // Animated tagline
    const taglines = [
        "Building elegant systems that scale — one deliberate line at a time.",
        "Design-minded engineering focused on clarity and impact.",
        "Curious, meticulous, collaborative.",
    ];

    let tIdx = 0;
    function rotateTagline() {
        if (!animatedTagline) return;
        animatedTagline.style.opacity = 0;
        setTimeout(() => {
            animatedTagline.textContent = taglines[tIdx];
            animatedTagline.style.opacity = 1;
            tIdx = (tIdx + 1) % taglines.length;
        }, 400);
    }
    if (animatedTagline) setInterval(rotateTagline, 4500);

    // Smooth scroll to anchors but preserve focus
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const target = document.querySelector(a.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.tabIndex = -1;
                target.focus({ preventScroll: true });
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Canvas circuit background
    const canvas = document.getElementById("circuit-canvas");
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        let w = (canvas.width = innerWidth);
        let h = (canvas.height = innerHeight);
        const nodes = [];
        const NODE_COUNT = Math.max(6, Math.floor((w * h) / 140000));
        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }
        for (let i = 0; i < NODE_COUNT; i++)
            nodes.push({
                x: rand(0, w),
                y: rand(0, h),
                vx: rand(-0.25, 0.25),
                vy: rand(-0.25, 0.25),
                r: rand(1.6, 3.2),
            });
        function resize() {
            w = canvas.width = innerWidth;
            h = canvas.height = innerHeight;
        }
        addEventListener("resize", resize);
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                a.x += a.vx;
                a.y += a.vy;
                if (a.x < 0 || a.x > w) a.vx *= -1;
                if (a.y < 0 || a.y > h) a.vy *= -1;
                ctx.beginPath();
                ctx.fillStyle = "rgba(104,190,148,0.12)";
                ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
                ctx.fill();
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x,
                        dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 160) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(104,190,148,${0.06 * (1 - d / 160)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // Form submit handling
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", () => {
            const btn = contactForm.querySelector("button[type=submit]");
            if (!btn) return;
            btn.textContent = "Sending…";
            setTimeout(() => {
                btn.textContent = "Sent";
                btn.disabled = true;
            }, 800);
        });
    }
});
