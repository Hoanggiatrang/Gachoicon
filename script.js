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

            // FACEBOOK
            if (contactMethod === "facebook") {
                contactLink = "https://web.facebook.com/Gachoianlaohaiphong?locale=vi_VN";
            }
            // ZALO
            else if (contactMethod === "zalo") {
                contactLink = "https://zalo.me/359195743";
            }
            // PHONE
            else if (contactMethod === "phone") {
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
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.88); display: flex;
                justify-content: center; align-items: center; z-index: 99999;
                cursor: zoom-out;
            `;

            const zoomedImg = document.createElement("img");
            zoomedImg.src = img.src;
            zoomedImg.style.cssText = `
                max-width: 92%; max-height: 92%;
                border-radius: 18px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            `;

            overlay.appendChild(zoomedImg);
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

        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.4 + "px";
    });

    /* =========================================
       IMAGE SLIDER + DOTS + SWIPE + AUTO PLAY + ZOOM
    ========================================= */

    document.querySelectorAll(".image-slider").forEach(slider => {
        const images = slider.querySelectorAll("img");
        if (images.length === 0) return;

        let index = 0;
        let startX = 0;
        let autoPlay;

        const card = slider.parentElement;
        const dotsContainer = card.querySelector(".dots");

        // ===== TẠO DOTS =====
        if (dotsContainer) {
            images.forEach((_, i) => {
                const dot = document.createElement("span");
                if (i === 0) dot.classList.add("active");
                
                dot.addEventListener("click", () => {
                    show(i);
                    resetAuto();
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll("span") : [];

        function updateDots() {
            dots.forEach(d => d.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
        }

        function show(i) {
            index = (i + images.length) % images.length;
            images.forEach(img => img.classList.remove("active"));
            images[index].classList.add("active");
            updateDots();
        }

        function next() {
            show(index + 1);
        }

        function prev() {
            show(index - 1);
        }

        function startAuto() {
            autoPlay = setInterval(next, 3000);
        }

        function stopAuto() {
            clearInterval(autoPlay);
        }

        function resetAuto() {
            stopAuto();
            startAuto();
        }

        // Khởi tạo slider
        images[0].classList.add("active");
        updateDots();
        startAuto();

        // ===== SWIPE MOBILE =====
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

        // ===== CLICK ZOOM + SWIPE TRONG ZOOM =====
        slider.addEventListener("click", (e) => {
            if (e.target.tagName !== "IMG") return;

            const activeImage = slider.querySelector("img.active");
            if (!activeImage) return;

            let zoomIndex = Array.from(images).indexOf(activeImage);

            const overlay = document.createElement("div");
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.92); display: flex;
                justify-content: center; align-items: center; z-index: 99999;
            `;

            const zoomImg = document.createElement("img");
            zoomImg.src = images[zoomIndex].src;
            zoomImg.style.cssText = `
                max-width: 92%; max-height: 92%;
                border-radius: 18px; box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            `;

            overlay.appendChild(zoomImg);
            document.body.appendChild(overlay);
            overlay.focus();

            function updateZoomImage() {
                zoomImg.src = images[zoomIndex].src;
            }

            // Swipe & Keyboard trong overlay
            let zoomStartX = 0;
            let isDragging = false;

            overlay.addEventListener("touchstart", e => zoomStartX = e.touches[0].clientX);
            overlay.addEventListener("touchend", e => {
                let endX = e.changedTouches[0].clientX;
                if (zoomStartX - endX > 40) {
                    zoomIndex = (zoomIndex + 1) % images.length;
                    updateZoomImage();
                } else if (endX - zoomStartX > 40) {
                    zoomIndex = (zoomIndex - 1 + images.length) % images.length;
                    updateZoomImage();
                }
            });

            // Click đóng overlay
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.remove();
            });

            // ESC key
            overlay.addEventListener("keydown", e => {
                if (e.key === "Escape") overlay.remove();
                if (e.key === "ArrowRight") {
                    zoomIndex = (zoomIndex + 1) % images.length;
                    updateZoomImage();
                }
                if (e.key === "ArrowLeft") {
                    zoomIndex = (zoomIndex - 1 + images.length) % images.length;
                    updateZoomImage();
                }
            });
        });
    });
});
