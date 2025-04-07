$(document).ready(function () {
    let slideWidth = $(".slider").width(); 
    let slideCount = $(".slides li").length;
    let interval = 3000; // Thời gian chạy tự động (3 giây)
    let timer;
    let dir = 1; // Luôn chạy từ phải sang trái
    let $slideContainer = $(".slides"); // Lấy danh sách ảnh

    // Cập nhật kích thước slider khi resize
    function updateSliderSize() {
        slideWidth = $(".slider").width();
        $(".slides").css("width", slideWidth * slideCount);
        $(".slides").css("left", -slideWidth); // Dịch sang ảnh đầu tiên
    }

        // cập nhật lại số ảnh còn lại nếu lỡ xóa ảnh hoặc muốn thêm ảnh ở index
        function updateSlides() {
            let slideCount = $(".slides li").length;
            if (slideCount > 0) {
                $(".slides").css("width", slideCount * 100 + "%");
            } else {
                $(".slides").html("<p>No slides available</p>");
            }
        }

    $(window).on("resize", updateSliderSize);
    updateSliderSize(); // Gọi ngay khi tải trang

    // Hàm chuyển slide mượt mà
    function changeSlide(next = true) {
        if (next) {
            // Dịch chuyển slider sang trái
            $slideContainer.animate({ left: `-=${slideWidth}px` }, 500, function () {
                // Di chuyển ảnh đầu tiên xuống cuối danh sách
                $slideContainer.append($(".slides li:first"));
                $slideContainer.css("left", -slideWidth); // Reset vị trí
            });
        } else {
            // Di chuyển ảnh cuối lên đầu trước khi trượt sang phải
            $slideContainer.prepend($(".slides li:last"));
            $slideContainer.css("left", -slideWidth * 2); // Đặt vị trí trước khi trượt

            // Trượt về vị trí ban đầu
            $slideContainer.animate({ left: `+=${slideWidth}px` }, 500);
        }
    }

    // Hàm chạy slide tự động
    function slideTimer() {
        changeSlide(true); // Luôn chạy từ phải sang trái
    }

    // Nút điều hướng
    $(".prevBtn").click(function () {
        clearInterval(timer);
        changeSlide(false); // Lùi về ảnh trước
        timer = setInterval(slideTimer, interval);
    });

    $(".nextBtn").click(function () {
        clearInterval(timer);
        changeSlide(true); // Tiến tới ảnh tiếp theo
        timer = setInterval(slideTimer, interval);
    });

    // Bắt đầu chạy tự động khi tải trang
    timer = setInterval(slideTimer, interval);
});


//hiển thị tooltip cho lịch
document.addEventListener("DOMContentLoaded", function () {
    let eventDateElements = document.querySelectorAll(".event-date");

    eventDateElements.forEach(eventDate => {
        let dateString = eventDate.getAttribute("data-date"); // Lấy ngày sự kiện từ data-date
        let eventDateObject = new Date(dateString + "T00:00:00"); // Fix lỗi lệch ngày bằng "T00:00:00"
        let today = new Date(); // Lấy ngày hiện tại

        // Xóa giờ phút giây để so sánh chính xác
        today.setHours(0, 0, 0, 0);

        // Tính số ngày còn lại bằng cách lấy mốc thời gian 00:00:00
        let timeDiff = eventDateObject.getTime() - today.getTime();
        let daysLeft = Math.round(timeDiff / (1000 * 60 * 60 * 24)); // Sử dụng Math.round() thay vì Math.ceil()

        // Lấy tooltip đi kèm với ngày sự kiện
        let tooltip = eventDate.nextElementSibling;

        // Kiểm tra điều kiện & cập nhật nội dung + màu sắc
        if (daysLeft < 0) {
            daysLeft = "イベント終了致しました。";
            tooltip.style.backgroundColor = "white"; // Nền trắng
            tooltip.style.color = "gray"; // Chữ xám
            tooltip.style.border = "1px solid lightgray"; // Viền xám nhẹ
        } else if (daysLeft === 0) {
            daysLeft = "イベント開始しています！！";
            tooltip.style.backgroundColor = "red"; // Nền đỏ
            tooltip.style.color = "black"; // Chữ đen
        } else if (daysLeft > 10) {
            daysLeft = `お後 ${daysLeft} 日間開始致します。`;
            tooltip.style.backgroundColor = "green"; // Nền xanh lá
            tooltip.style.color = "white"; // Chữ trắng
        } else {
            daysLeft = `お後 ${daysLeft} 日間始致します。`;
            tooltip.style.backgroundColor = "yellow"; // Nền vàng
            tooltip.style.color = "black"; // Chữ đen
        }

        // Cập nhật số ngày vào tooltip
        tooltip.textContent = daysLeft;
    });
});