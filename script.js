 /* =========================================
   WAIT UNTIL HTML LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
    document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const contactMethod =
                document.getElementById(
                    "contact-method"
                ).value;

                let contactLink = "";

                // FACEBOOK
                if (contactMethod === "facebook") {

                    contactLink =
                    "https://web.facebook.com/Gachoianlaohaiphong?locale=vi_VN";
                }

                // ZALO
                else if (
                    contactMethod === "zalo"
                ) {

                    contactLink =
                    "https://zalo.me/359195743";
                }

                // PHONE
                else if (
                    contactMethod === "phone"
                ) {

                    contactLink =
                    "tel:+84359195743";
                }

                // OPEN LINK
                if (contactLink !== "") {

                    window.location.href =
                    contactLink;
                }
            }
        );
    }


    /* =========================================
       SMOOTH HEADER SHADOW
    ========================================= */

    window.addEventListener(
        "scroll",
        function () {

            const header =
            document.querySelector("header");

            if (!header) return;

            if (window.scrollY > 50) {

                header.style.boxShadow =
                "0 4px 25px rgba(0,0,0,0.12)";

                header.style.background =
                "rgba(255,255,255,0.96)";

            } else {

                header.style.boxShadow =
                "0 2px 20px rgba(0,0,0,0.08)";

                header.style.background =
                "rgba(255,255,255,0.92)";
            }
        }
    );


    /* =========================================
       SCROLL ANIMATION
    ========================================= */

    const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );
                }
            });
        },

        {
            threshold: 0.15
        }
    );

    document.querySelectorAll(
        ".card, .gallery img, .about-content, .section-title"
    ).forEach((el) => {

        el.classList.add("hidden");

        observer.observe(el);
    });


    /* =========================================
       IMAGE CLICK ZOOM
    ========================================= */

    const galleryImages =
    document.querySelectorAll(
        ".gallery img"
    );

    galleryImages.forEach((img) => {

        img.addEventListener(
            "click",
            () => {

                const overlay =
                document.createElement("div");

                overlay.style.position =
                "fixed";

                overlay.style.top = "0";

                overlay.style.left = "0";

                overlay.style.width = "100%";

                overlay.style.height = "100%";

                overlay.style.background =
                "rgba(0,0,0,0.88)";

                overlay.style.display =
                "flex";

                overlay.style.justifyContent =
                "center";

                overlay.style.alignItems =
                "center";

                overlay.style.zIndex =
                "99999";

                overlay.style.cursor =
                "zoom-out";

                const image =
                document.createElement("img");

                image.src = img.src;

                image.style.maxWidth =
                "92%";

                image.style.maxHeight =
                "92%";

                image.style.borderRadius =
                "18px";

                image.style.boxShadow =
                "0 10px 40px rgba(0,0,0,0.4)";

                overlay.appendChild(image);

                document.body.appendChild(
                    overlay
                );

                overlay.addEventListener(
                    "click",
                    () => {

                        overlay.remove();
                    }
                );
            }
        );
    });

/* =========================================
   

    /* =========================================
       PARALLAX HERO
    ========================================= */

    window.addEventListener(
        "scroll",
        () => {

            const hero =
            document.querySelector("#hero");

            if (!hero) return;

            let offset =
            window.pageYOffset;

            hero.style.backgroundPositionY =
            offset * 0.4 + "px";
        }
    );

    /* =========================================
       IMAGE SLIDER + DOTS + SWIPE + AUTO PLAY
    ========================================= */

    document.querySelectorAll(".image-slider").forEach(slider => {

        const images = slider.querySelectorAll("img");
      /* ===== ZOOM + SWIPE INSIDE ZOOM ===== */

slider.addEventListener("click", () => {

    const activeImage =
    slider.querySelector("img.active");

    if (!activeImage) return;

    let zoomIndex =
    Array.from(images).indexOf(activeImage);

    const overlay =
    document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";

    overlay.style.width = "100%";
    overlay.style.height = "100%";

    overlay.style.background =
    "rgba(0,0,0,0.92)";

    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    overlay.style.zIndex = "99999";

    const image =
    document.createElement("img");

    image.src = images[zoomIndex].src;

    image.style.maxWidth = "92%";
    image.style.maxHeight = "92%";

    image.style.borderRadius = "18px";

    overlay.appendChild(image);

    document.body.appendChild(overlay);
   overlay.tabIndex = 0;

overlay.focus();

    function updateZoomImage() {

        image.src = images[zoomIndex].src;
    }

    // ===== swipe trong zoom =====

let startX = 0;

/* ===== MOBILE SWIPE ===== */

overlay.addEventListener("touchstart", e => {

    startX = e.touches[0].clientX;
});

overlay.addEventListener("touchend", e => {

    let endX = e.changedTouches[0].clientX;

    handleSwipe(endX);
});

/* ===== PC DRAG ===== */

let isDragging = false;

overlay.addEventListener("mousedown", e => {

    isDragging = true;

    startX = e.clientX;
});

overlay.addEventListener("mousemove", e => {

    if (!isDragging) return;

    let moveX = e.clientX;

    // kéo trái
    if (startX - moveX > 80) {

        zoomIndex =
        (zoomIndex + 1) % images.length;

        updateZoomImage();

        startX = moveX;
    }

    // kéo phải
    else if (moveX - startX > 80) {

        zoomIndex =
        (zoomIndex - 1 + images.length)
        % images.length;

        updateZoomImage();

        startX = moveX;
    }
});

overlay.addEventListener("mouseup", () => {

    isDragging = false;
});

overlay.addEventListener("mouseleave", () => {

    isDragging = false;
});
/* ===== KEYBOARD ===== */

overlay.addEventListener("keydown", e => {
    // mũi tên phải
    if (e.key === "ArrowRight") {

        zoomIndex =
        (zoomIndex + 1) % images.length;

        updateZoomImage();
    }

    // mũi tên trái
    else if (e.key === "ArrowLeft") {

        zoomIndex =
        (zoomIndex - 1 + images.length)
        % images.length;

        updateZoomImage();
    }

    // ESC để đóng
    else if (e.key === "Escape") {

        overlay.remove();
    }
});

/* ===== SWIPE FUNCTION ===== */

function handleSwipe(endX) {

    // vuốt trái
    if (startX - endX > 40) {

        zoomIndex =
        (zoomIndex + 1) % images.length;

        updateZoomImage();
    }

    // vuốt phải
    else if (endX - startX > 40) {

        zoomIndex =
        (zoomIndex - 1 + images.length)
        % images.length;

        updateZoomImage();
    }
}

    // click nền để đóng

    overlay.addEventListener("click", (e) => {

    // nếu đang drag thì không đóng
if (isDragging) return;
    if (e.target === overlay) {

        overlay.remove();
    }
});
        images.forEach(img => img.classList.remove("active"));
        images[0].classList.add("active");
        let index = 0;
        let startX = 0;
        let autoPlay;

        // lấy dots (nằm ngay sau image-slider)
        const card = slider.parentElement;
       const dotsContainer = card.querySelector(".dots");

        if (!dotsContainer || !dotsContainer.classList.contains("dots")) {
            return; // nếu không có dots thì bỏ qua
        }

        // ===== tạo dots =====
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

    // xóa active khỏi tất cả ảnh
    images.forEach(img => {
        img.classList.remove("active");
    });

    // bật ảnh hiện tại
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

        startAuto();

        // ===== SWIPE =====
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
