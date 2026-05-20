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
       IMAGE SLIDER + DOTS + SWIPE + AUTO PLAY + ZOOM ARROWS
    ========================================= */
    document.querySelectorAll(".image-slider").forEach(slider => {
        const images = slider.querySelectorAll("img");

        /* ===== CLICK TO ZOOM WITH ARROWS ===== */
        slider.addEventListener("click", () => {
            const activeImage = slider.querySelector("img.active");
            if (!activeImage) return;

            let zoomIndex = Array.from(images).indexOf(activeImage);

            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(0,0,0,0.92)";
            overlay.style.zIndex = "99999";

            // Container cho ảnh + mũi tên
            const container = document.createElement("div");
            container.style.position = "relative";
            container.style.maxWidth = "92%";
            container.style.maxHeight = "92%";

            const image = document.createElement("img");
            image.src = images[zoomIndex].src;
            image.style.width = "100%";
            image.style.height = "auto";
            image.style.borderRadius = "18px";
            image.style.boxShadow = "0 10px 40px rgba(0,0,0,0.5)";
            image.style.display = "block";

            // Left Arrow
            const leftArrow = document.createElement("div");
            leftArrow.innerHTML = "❮";
            leftArrow.style.position = "absolute";
            leftArrow.style.left = "-70px";
            leftArrow.style.top = "50%";
            leftArrow.style.transform = "translateY(-50%)";
            leftArrow.style.fontSize = "55px";
            leftArrow.style.color = "rgba(255,255,255,0.9)";
            leftArrow.style.cursor = "pointer";
            leftArrow.style.userSelect = "none";
            leftArrow.style.zIndex = "100000";
            leftArrow.style.transition = "all 0.2s";

            // Right Arrow
            const rightArrow = document.createElement("div");
            rightArrow.innerHTML = "❯";
            rightArrow.style.position = "absolute";
            rightArrow.style.right = "-70px";
            rightArrow.style.top = "50%";
            rightArrow.style.transform = "translateY(-50%)";
            rightArrow.style.fontSize = "55px";
            rightArrow.style.color = "rgba(255,255,255,0.9)";
            rightArrow.style.cursor = "pointer";
            rightArrow.style.userSelect = "none";
            rightArrow.style.zIndex = "100000";
            rightArrow.style.transition = "all 0.2s";

            container.appendChild(image);
            container.appendChild(leftArrow);
            container.appendChild(rightArrow);
            overlay.appendChild(container);
            document.body.appendChild(overlay);

            overlay.tabIndex = 0;
            overlay.focus();

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

            // Click mũi tên
            leftArrow.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                goToPrev();
            });

            rightArrow.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                goToNext();
            });

            // Hover effect
            [leftArrow, rightArrow].forEach(arrow => {
                arrow.addEventListener("mouseenter", () => {
                    arrow.style.color = "#fff";
                    arrow.style.transform = "translateY(-50%) scale(1.15)";
                });
                arrow.addEventListener("mouseleave", () => {
                    arrow.style.color = "rgba(255,255,255,0.9)";
                    arrow.style.transform = "translateY(-50%) scale(1)";
                });
            });

            // Touch swipe
            let startX = 0;
            overlay.addEventListener("touchstart", e => {
                startX = e.touches[0].clientX;
            });

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

            // Click ngoài để đóng
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.remove();
            });
        });

        // ==================== SLIDER MAIN LOGIC ====================
        images.forEach(img => img.classList.remove("active"));
        if (images.length > 0) images[0].classList.add("active");

        let index = 0;
        let startX = 0;
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

        // Swipe slider
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
