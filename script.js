document.addEventListener("DOMContentLoaded", function() {
    const buyButtons = document.querySelectorAll(".cta-button");

    buyButtons.forEach(button => {
        button.addEventListener("click", function() {
            alert("Cảm ơn bạn đã quan tâm! Chúng tôi sẽ liên hệ với bạn ngay.");
        });
    });
});
