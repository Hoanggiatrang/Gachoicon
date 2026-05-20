/* =========================================
   WAIT UNTIL HTML LOAD
========================================= */
document.addEventListener("DOMContentLoaded", function () {
    /* =========================================
       CONTACT FORM
    ========================================= */
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const contactMethod = document.getElementById("contact-method").value;
            let contactLink = "";

            if (contactMethod === "facebook") {
                contactLink = "https://web.facebook.com/Gachoianlaohaiphong?locale=vi_VN";
            } else if (contactMethod === "zalo") {
                contactLink = "https://zalo.me/359195743";
            } else if (contactMethod === "phone") {
                contactLink = "tel:+84359195743";
            }

            if (contactLink !== "") {
                window.location.href = contactLink;
            }
        });
    }

    /* =========================================
       SMOOTH HEADER SHADOW
    ========================================= */
    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        if (!header) return;
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 25px rgba(0,0,0,0.12)";
            header.style.background = "rgba(255,255,255,0.96)";
        } else {
            header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
            header.style.background = "rgba(255,255,255,0.92)";
        }
    });

    /* =========================================
       SCROLL ANIMATION
    ========================================= */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll(".card, .gallery img, .about-content, .section-title")
        .forEach((el) => {
            el.classList.add("hidden");
            observer.observe(el);
        });

    /* Gallery Zoom */
    const galleryImages = document.querySelectorAll(".gallery img");
    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(0,0,0,0.88)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "99999";
            overlay.style.cursor = "zoom-out";

            const image = document.createElement("img");
            image.src = img.src;
            image.style.maxWidth = "92%";
            image.style.maxHeight = "92%";
            image.style.borderRadius = "18px";
            image.style.boxShadow = "0 10px 40px rgba(0,0,0,0.4)";

            overlay.appendChild(image);
            document.body.appendChild(overlay);
            overlay.addEventListener("click", () => overlay.remove());
        });
    });

    /* =========================================
       PARALLAX HERO
    ========================================= */
    window.addEventListener("scroll", () => {
        const hero = document.querySelector("#hero");
        if (!hero) return;
        let offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.4 + "px";
    });

    /* =========================================
       IMAGE SLIDER + ZOOM WITH ARROWS
    ========================================= */
    document.querySelectorAll(".image-slider").forEach(slider => {
        const images = slider.querySelectorAll("img");

        slider.addEventListener("click", () => {
            const activeImage = slider.querySelector("img.active");
            if (!activeImage) return;

            let zoomIndex = Array.from(images).indexOf(activeImage);

            const overlay = document.createElement("div");
            Object.assign(overlay.style, {
                position: "fixed",
                top: "0", left: "0",
                width: "100%", height: "100%",
                background: "rgba(0,0,0,0.92)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "99999"
            });

            const container = document.createElement("div");
            container.style.position = "relative";
            container.style.maxWidth = "94%";
            container.style.maxHeight = "94%";

            const image = document.createElement("img");
            image.src = images[zoomIndex].src;
            Object.assign(image.style, {
                maxWidth: "100%",
                maxHeight: "92vh",
                width: "auto",
                height: "auto",
                borderRadius: "18px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                display: "block"
            });

            // Left Arrow
            const leftArrow = document.createElement("div");
            leftArrow.innerHTML = "❮";
            Object.assign(leftArrow.style, {
                position: "absolute",
                left: "-70px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: window.innerWidth < 768 ? "55px" : "50px",
                color: "rgba(255,255,255,0.95)",
                cursor: "pointer",
                userSelect: "none",
                zIndex: "100000",
                padding: "15px"
            });

            // Right Arrow
            const rightArrow = document.createElement("div");
            rightArrow.innerHTML = "❯";
            Object.assign(rightArrow.style, {
                position: "absolute",
                right: "-70px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: window.innerWidth < 768 ? "55px" : "50px",
                color: "rgba(255,255,255,0.95)",
                cursor: "pointer",
                userSelect: "none",
                zIndex: "100000",
                padding: "15px"
            });

            container.appendChild(image);
            container.appendChild(leftArrow);
            container.appendChild(rightArrow);
            overlay.appendChild(container);
            document.body.appendChild(overlay);

            function updateImage() {
                image.src = images[zoomIndex].src;
            }

            function goToNext() {
                zoomIndex = (zoomIndex + 1) % images.length;
                updateImage();
            }

            function goToPrev() {
                zoomIndex = (zoomIndex - 1 + images.length) % images.length;
                updateImage();
            }

            leftArrow.addEventListener("click", e => { e.stopImmediatePropagation(); goToPrev(); });
            rightArrow.addEventListener("click", e => { e.stopImmediatePropagation(); goToNext(); });

            // Touch swipe
            let startX = 0;
            overlay.addEventListener("touchstart", e => startX = e.touches[0].clientX);
            overlay.addEventListener("touchend", e => {
                let endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) goToNext();
                else if (endX - startX > 50) goToPrev();
            });

            // Keyboard
            overlay.addEventListener("keydown", e => {
                if (e.key === "ArrowRight") goToNext();
                else if (e.key === "ArrowLeft") goToPrev();
                else if (e.key === "Escape") overlay.remove();
            });

            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.remove();
            });
        });

        // ==================== SLIDER MAIN LOGIC ====================
        images.forEach(img => img.classList.remove("active"));
        if (images.length > 0) images[0].classList.add("active");

        let index = 0;
        let autoPlay;
        const card = slider.parentElement;
        const dotsContainer = card.querySelector(".dots");
        if (!dotsContainer || !dotsContainer.classList.contains("dots")) return;

        images.forEach((_, i) => {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                show(i);
                resetAuto();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll("span");

        function updateDots() {
            dots.forEach(d => d.classList.remove("active"));
            dots[index].classList.add("active");
        }

        function show(i) {
            index = (i + images.length) % images.length;
            images.forEach(img => img.classList.remove("active"));
            images[index].classList.add("active");
            updateDots();
        }

        function next() { show(index + 1); }
        function prev() { show(index - 1); }

        function startAuto() { autoPlay = setInterval(next, 3000); }
        function stopAuto() { clearInterval(autoPlay); }
        function resetAuto() { stopAuto(); startAuto(); }

        startAuto();

        let startX = 0;
        slider.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            stopAuto();
        });
        slider.addEventListener("touchend", e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 40) next();
            else if (endX - startX > 40) prev();
            startAuto();
        });
    });
});
