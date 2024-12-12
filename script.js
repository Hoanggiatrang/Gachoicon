document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngừng việc gửi form mặc định

    const contactMethod = document.getElementById("contact-method").value;

    let contactLink = "";

    // Chuyển hướng tới kênh liên lạc đã chọn
    if (contactMethod === "facebook") {
        contactLink = "https://web.facebook.com/Gachoianlaohaiphong?locale=vi_VN";  // Link đến Messenger của Facebook
    } else if (contactMethod === "zalo") {
        contactLink = "https://zalo.me/359195743"; // Link đến Zalo (thay bằng ID Zalo nếu cần)
    } else if (contactMethod === "phone") {
        contactLink = "tel:+84359195743"; // Số điện thoại để gọi trực tiếp
    }

    // Chuyển hướng đến kênh liên lạc đã chọn
    window.location.href = contactLink;
});
