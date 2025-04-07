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
