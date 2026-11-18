
/* =========================================
   JAY ELECTRONICS PVT LTD
   COMPLETE WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   1. SPLIT SCREEN OPENING ANIMATION
========================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        loader.classList.add("finished");
        return;
    }

    setTimeout(function () {

        loader.classList.add("open");

        setTimeout(function () {
            loader.classList.add("finished");
        }, 1500);

    }, 800);

});


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));

        });

        // Close menu after clicking a navigation link

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        // Close menu with Escape

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }

        });

    }


    /* =========================================
       3. FOOTER YEAR
    ========================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       4. SERVICE DETAILS DATA
    ========================================= */

    const serviceData = {

        "security": {
            category: "01 / SECURITY SYSTEMS",
            title: "IP / Analog CCTV Solutions",
            description:
                "Protect your business with professional CCTV surveillance solutions designed for reliable monitoring and security.",
            features: [
                "IP camera installation",
                "Analog CCTV systems",
                "Remote video monitoring",
                "Recording and surveillance solutions",
                "Security system maintenance"
            ]
        },

        "networking": {
            category: "02 / NETWORK INFRASTRUCTURE",
            title: "LAN / WAN Networking",
            description:
                "Build a reliable and scalable network infrastructure to keep your business connected.",
            features: [
                "LAN network installation",
                "WAN connectivity solutions",
                "Network configuration",
                "Business network infrastructure",
                "Network troubleshooting"
            ]
        },

        "communication": {
            category: "03 / BUSINESS COMMUNICATION",
            title: "EPABX / IP-PBX System",
            description:
                "Improve business communication with professional telephone and communication system solutions.",
            features: [
                "EPABX installation",
                "IP-PBX solutions",
                "Telephone system configuration",
                "Internal communication systems",
                "System maintenance and support"
            ]
        },

        "audio-video": {
            category: "04 / AUDIO VISUAL",
            title: "Audio / Video Solutions",
            description:
                "Create better communication and presentation experiences with integrated audio and video solutions.",
            features: [
                "Professional audio systems",
                "Video display solutions",
                "Meeting room AV setup",
                "Presentation systems",
                "Audio and video integration"
            ]
        },

        "cabling": {
            category: "05 / INFRASTRUCTURE",
            title: "Structured LAN / Telecom Cabling",
            description:
                "Organize your business connectivity with structured cabling and reliable telecom infrastructure.",
            features: [
                "Structured LAN cabling",
                "Telecom cabling",
                "Cable management",
                "Network rack organization",
                "Infrastructure installation"
            ]
        },

        "led": {
            category: "06 / DISPLAY SYSTEMS",
            title: "Active LED Board System",
            description:
                "Use modern LED display systems for business communication, advertising and digital information.",
            features: [
                "LED display installation",
                "Digital display systems",
                "Display configuration",
                "LED board integration",
                "Technical support"
            ]
        }

    };


    /* =========================================
       5. SERVICE POPUP
    ========================================= */

    const modal = document.getElementById("service-modal");

    const modalTitle = document.getElementById("service-modal-title");
    const modalCategory = document.getElementById("service-modal-category");
    const modalDescription = document.getElementById("service-modal-description");
    const modalFeatures = document.getElementById("service-modal-features");
    const modalEnquire = document.getElementById("service-modal-enquire");

    const closeButtons = document.querySelectorAll("[data-close-modal]");

    function closeServiceModal() {

        if (!modal) return;

        modal.classList.remove("active");
        document.body.classList.remove("modal-open");

    }


    function openServiceModal(serviceKey) {

        if (!modal) return;

        const service = serviceData[serviceKey];

        if (!service) return;

        if (modalTitle) {
            modalTitle.textContent = service.title;
        }

        if (modalCategory) {
            modalCategory.textContent = service.category;
        }

        if (modalDescription) {
            modalDescription.textContent = service.description;
        }

        if (modalFeatures) {

            modalFeatures.replaceChildren();

            service.features.forEach(function (feature) {

                const item = document.createElement("li");

                item.textContent = feature;

                modalFeatures.appendChild(item);

            });

        }

        modal.classList.add("active");
        document.body.classList.add("modal-open");

    }


    // Open popup from service cards

    document.querySelectorAll(".service-link[data-service]").forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                event.preventDefault();

                const serviceKey = this.dataset.service;

                openServiceModal(serviceKey);

            });

        }
    );


    // Close popup buttons

    closeButtons.forEach(function (button) {

        button.addEventListener("click", closeServiceModal);

    });


    // Close popup by clicking outside

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeServiceModal();
            }

        });

    }


    // Close popup with Escape key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeServiceModal();
        }

    });


    // Enquire Now button

    if (modalEnquire) {

        modalEnquire.addEventListener("click", function () {

            const serviceTitle = modalTitle
                ? modalTitle.textContent.trim()
                : "";

            const serviceSelect = document.querySelector(
                '.contact-form select[name="service"]'
            );

            if (serviceSelect) {

                const matchingOption = Array.from(
                    serviceSelect.options
                ).find(function (option) {
                    return option.textContent.trim() === serviceTitle;
                });

                if (matchingOption) {
                    serviceSelect.value = matchingOption.value;
                }

            }

            closeServiceModal();

        });

    }


    /* =========================================
       6. NAVBAR ACTIVE LINK
    ========================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navigationLinks.forEach(function (link) {

                        const isActive =
                            link.getAttribute("href") === "#" + sectionId;

                        link.classList.toggle("active", isActive);

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    /* =========================================
       7. SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".service-card, .about-content, .about-image, .project-card, .highlight-item"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
        });

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    }


    /* =========================================
       8. BUTTON RIPPLE POSITION
    ========================================= */

    document.querySelectorAll(".ripple-button").forEach(
        function (button) {

            button.addEventListener("pointermove", function (event) {

                const rect = button.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                button.style.setProperty("--ripple-x", x + "px");
                button.style.setProperty("--ripple-y", y + "px");

            });

        }
    );

});

/* =================================
   CURSOR FOLLOWING WAVE EFFECT
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const waveElements = document.querySelectorAll(
        ".service-image, .primary-button, .nav-button, .submit-button"
    );

    waveElements.forEach(function (element) {

        element.addEventListener("pointerenter", function (event) {
            updateWave(event, element);
        });

        element.addEventListener("pointermove", function (event) {
            updateWave(event, element);
        });

    });

    function updateWave(event, element) {

        if (event.pointerType === "touch") return;

        const rect = element.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        element.style.setProperty("--wave-x", x + "px");
        element.style.setProperty("--wave-y", y + "px");

    }

});

/* =========================================
   3D TILT + LIFT - SERVICE PANELS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const panels = document.querySelectorAll(".service-image");

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || reducedMotion) return;

    panels.forEach(function (panel) {

        panel.addEventListener("pointerenter", function () {
            panel.style.transition =
                "transform 0.12s ease-out, box-shadow 0.3s ease";
        });

        panel.addEventListener("pointermove", function (event) {

            const rect = panel.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Cursor position from -1 to +1
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;

            // Maximum tilt angle
            const rotateY = percentX * 10;
            const rotateX = percentY * -10;

            // Cursor-following light position
            panel.style.setProperty(
                "--mouse-x",
                x + "px"
            );

            panel.style.setProperty(
                "--mouse-y",
                y + "px"
            );

            // Apply 3D tilt and lift
            panel.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-9px)
                scale3d(1.025, 1.025, 1.025)
            `;

            panel.style.boxShadow =
                "0 22px 38px rgba(7, 27, 59, 0.20)";

        });

        panel.addEventListener("pointerleave", function () {

            panel.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";

            panel.style.boxShadow = "none";

            panel.style.transition =
                "transform 0.55s cubic-bezier(.2,.8,.2,1), box-shadow 0.4s ease";

        });

    });

});
