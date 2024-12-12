// Xử lý sự kiện gửi form
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Hiển thị thông báo khi form được gửi
    alert(`Thank you, ${name}! We will contact you at ${email}.`);
});
