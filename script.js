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

    /* =========================================
       IMAGE CLICK ZOOM (Gallery)
    ========================================= */
    document.querySelectorAll(".gallery img").forEach((img) => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            Object.assign(overlay.style, {
                position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
                background: "rgba(0,0,0,0.88)", display: "flex",
                justifyContent: "center", alignItems: "center", zIndex: "99999",
                cursor: "zoom-out"
            });

            const image = document.createElement("img");
            Object.assign(image.style, {
                maxWidth: "92%", maxHeight: "92%", borderRadius: "18px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
            });
            image.src = img.src;

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
        hero.style.backgroundPositionY = window.pageYOffset * 0.4 + "px";
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
                position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
                background: "rgba(0,0,0,0.92)", display: "flex",
                justifyContent: "center", alignItems: "center", zIndex: "99999"
            });

            const image = document.createElement("img");
            image.src = images[zoomIndex].src;
            Object.assign(image.style, {
                maxWidth: "94%", maxHeight: "92vh", borderRadius: "18px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            });

            // === MŨI TÊN ===
            const prevBtn = document.createElement("div");
            prevBtn.innerHTML = "❮";
            Object.assign(prevBtn.style, {
                position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
                fontSize: "50px", color: "white", cursor: "pointer", userSelect: "none",
                padding: "12px 18px", borderRadius: "50%", background: "rgba(0,0,0,0.4)",
                zIndex: "100000"
            });

            const nextBtn = document.createElement("div");
            nextBtn.innerHTML = "❯";
            Object.assign(nextBtn.style, {
                position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
                fontSize: "50px", color: "white", cursor: "pointer", userSelect: "none",
                padding: "12px 18px", borderRadius: "50%", background: "rgba(0,0,0,0.4)",
                zIndex: "100000"
            });

            overlay.appendChild(image);
            overlay.appendChild(prevBtn);
            overlay.appendChild(nextBtn);
            document.body.appendChild(overlay);

            overlay.tabIndex = 0;
            overlay.focus();

            function updateImage() {
                image.src = images[zoomIndex].src;
            }

            function goPrev() {
                zoomIndex = (zoomIndex - 1 + images.length) % images.length;
                updateImage();
            }

            function goNext() {
                zoomIndex = (zoomIndex + 1) % images.length;
                updateImage();
            }

            prevBtn.addEventListener("click", e => { e.stopImmediatePropagation(); goPrev(); });
            nextBtn.addEventListener("click", e => { e.stopImmediatePropagation(); goNext(); });

            // Swipe mobile
            let startX = 0;
            overlay.addEventListener("touchstart", e => startX = e.touches[0].clientX);
            overlay.addEventListener("touchend", e => {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) goNext();
                else if (endX - startX > 50) goPrev();
            });

            // Keyboard
            overlay.addEventListener("keydown", e => {
                if (e.key === "ArrowRight") goNext();
                else if (e.key === "ArrowLeft") goPrev();
                else if (e.key === "Escape") overlay.remove();
            });

            // Click background đóng
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.remove();
            });
        });

        // ==================== SLIDER CHÍNH ====================
        images.forEach(img => img.classList.remove("active"));
        if (images.length > 0) images[0].classList.add("active");

        let index = 0;
        let autoPlay;
        const dotsContainer = slider.parentElement.querySelector(".dots");
        if (!dotsContainer) return;

        images.forEach((_, i) => {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => { show(i); resetAuto(); });
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

        // Swipe slider
        let startX = 0;
        slider.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            stopAuto();
        });
        slider.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 40) next();
            else if (endX - startX > 40) prev();
            startAuto();
        });
    });
});
