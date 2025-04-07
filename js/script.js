// ✅ on top button
$(function () {
  // スムーススクロールで上に戻る
  $('#scrollTopBtn').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500); // 0 là đầu trang, 500ms là thời gian
    return false;
  });
});

// ✅ jQuery Tooltip Script 
$(function () {
  $(".tooltip-img").hover(
    function () {
      $("body").append("<div id='tooltip'><p></p><span class='tooltip-arrow'></span></div>");
      $("#tooltip p").html($(this).attr("alt"));
      $("#tooltip").hide();
      const top = $(this).offset().top - $("#tooltip").outerHeight() - 10;
      const left = $(this).offset().left + $(this).width() / 2 - $("#tooltip").outerWidth() / 2;
      $("#tooltip").css({ top: top, left: left });
      $("#tooltip").fadeIn();
    },
    function () {
      $("#tooltip").remove();
    }
  );
});

// ✅ Tạo hàm toggleMenu để đóng/mở sidebar và overlay
function toggleMenu() {
  const sidebar = document.querySelector(".mobile-sidebar");
  const overlay = document.querySelector(".overlay");
  const hamburger = document.querySelector(".hamburger-menu");
  const menuIcon = document.getElementById("menu-icon");

  sidebar.classList.toggle("open");
  overlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
  hamburger.classList.toggle("active");

  // Đổi biểu tượng 🍔 ↔ ❌
  if (hamburger.classList.contains("active")) {
    menuIcon.textContent = "❌";
  } else {
    menuIcon.textContent = "🍔";
  }
}


// Sidebar links
const sidebarLinks = document.querySelectorAll('.mobile-sidebar a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Xóa active ở tất cả
    sidebarLinks.forEach(l => l.classList.remove('active'));
    // Gán lại active cho phần được click
    this.classList.add('active');
  });
});

// Nút 詳細
const detailButtons = document.querySelectorAll('button[id$="DetailBtn"]');

detailButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    // Xóa active ở các nút khác
    detailButtons.forEach(b => b.classList.remove('active'));
    // Gán lại
    this.classList.add('active');
  });
});


// ✅ Global Popup Logic for All Sections (Including ABOUT ME)
// Đảm bảo DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Định nghĩa các cặp nút và modal tương ứng
  const modalMappings = [
    {
      buttonId: "eduDetailBtn",
      modalId: "eduModal",
      closeId: "closeEduModal"
    },
    {
      buttonId: "workDetailBtn",
      modalId: "workModal",
      closeId: "closeWorkModal"
    },
    {
      buttonId: "licenseDetailBtn",
      modalId: "licenseModal",
      closeId: "closeLicenseModal"
    },
    {
      buttonId: "jobDetailBtn",
      modalId: "jobModal",
      closeId: "closeJobModal"
    }
  ];

  // Lặp qua từng cặp để gán sự kiện
  modalMappings.forEach(({ buttonId, modalId, closeId }) => {
    const button = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);

    // Nếu tất cả phần tử tồn tại thì mới gán sự kiện
    if (button && modal && closeBtn) {
      // Mở popup khi nhấn nút 詳細
      button.addEventListener("click", () => {
        modal.classList.add("show");
      });

      // Đóng popup khi nhấn nút X
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
      });

      // Đóng popup khi click ra ngoài phần modal-content
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
        }
      });
    }
  });
});


// ✅ Global Popup Logic for All Sections (Including WORKS)

// Element IDs specific for the WORKS section
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeImageModal = document.getElementById("closeImageModal");

// Shared class for all image trigger buttons in WORKS
const imgButtons = document.querySelectorAll(".imgBtn");

imgButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const imgSrc = btn.getAttribute("data-src");
    if (imgSrc) {
      modalImage.setAttribute("src", imgSrc);
      imageModal.classList.add("show");
    }
  });
});

// Close button
closeImageModal.addEventListener("click", function () {
  imageModal.classList.remove("show");
  modalImage.setAttribute("src", "");
});

// Click outside to close
imageModal.addEventListener("click", function (e) {
  if (e.target === imageModal) {
    imageModal.classList.remove("show");
    modalImage.setAttribute("src", "");
  }
});



// ===========================
// Hobby Effects JS
// ===========================

let currentEffectIndex = 0;
const hobbyEffects = [
  {
    title: "エフェクト 1: 背景色の変更",
    description: "Demo Elementの背景色がlightblueに変わるアニメーションが再生され、結果が保持されます。",
    code: "demoElement.classList.toggle('bg-lightblue');",
    trigger: () => demoElement.classList.toggle("bg-lightblue"),
  },
  {
    title: "エフェクト 2: 表示/非表示切替",
    description: "要素の表示/非表示を切り替えるエフェクトです。",
    code: "demoElement.classList.toggle('hidden');",
    trigger: () => demoElement.classList.toggle("hidden"),
  },
  {
    title: "エフェクト 3: クラスの追加",
    description: "クラス active を追加: 背景色をゴールドに変更し、文字色を変更し、枠線を追加",
    code: "demoElement.classList.toggle('active');",
    trigger: () => demoElement.classList.toggle("active"),
  },
  {
    title: "エフェクト 4: 回転効果",
    description: "要素を回転させます。",
    code: "demoElement.classList.toggle('rotate-45');",
    trigger: () => demoElement.classList.toggle("rotate-45"),
  },
  {
    title: "エフェクト 5: 拡大縮小",
    description: "要素のサイズを変更します。",
    code: "demoElement.classList.toggle('scale-150');",
    trigger: () => demoElement.classList.toggle("scale-150"),
  },
  {
    title: "エフェクト 6: 不透明度の変更",
    description: "要素の不透明度を変更します。",
    code: "demoElement.classList.toggle('opacity-50');",
    trigger: () => demoElement.classList.toggle("opacity-50"),
  },
  {
    title: "エフェクト 7: 位置の変更",
    description: "要素の位置を移動させます。",
    code: "demoElement.classList.toggle('margin-left-50');",
    trigger: () => demoElement.classList.toggle("margin-left-50"),
  },
  {
    title: "エフェクト 8: スムーズスクロール",
    description: "ページをスムーズにスクロールします。（alertデモ）",
    code: "alert('スムーズスクロールのデモ');",
    trigger: () => alert("スムーズスクロールのデモ"),
  },
  {
    title: "エフェクト 9: HTML内容変更",
    description: "要素の内容を変更します。",
    code: "demoElement.innerHTML = demoElement.innerHTML === '新しい内容' ? 'Demo Element' : '新しい内容';",
    trigger: () => {
      if (demoElement.innerHTML === '新しい内容') {
        demoElement.innerHTML = 'Demo Element';
        demoElement.classList.remove('red-text');
      } else {
        demoElement.innerHTML = '新しい内容';
        demoElement.classList.add('red-text');
      }
    }
  },
  {
    title: "エフェクト 10: 回転とフェード効果",
    description: "要素を回転させながらフェードさせます。",
    code: "demoElement.classList.toggle('rotate-fade');",
    trigger: () => demoElement.classList.toggle("rotate-fade"),
  },
];

const effectGrid = document.getElementById("effectGrid");
hobbyEffects.forEach((effect, index) => {
  const container = document.createElement("div");
  container.className = `effect-item ${index % 2 === 1 ? 'reverse' : ''}`;
  container.innerHTML = `
    <div class="effect-img">
      <img src="images/hobby/${index + 1}.png" alt="effect${index + 1}">
    </div>
    <div class="effect-content">
      <h4>${effect.title}</h4>
      <p>${effect.description}</p>
      <button class="popup-btn" data-index="${index}">詳細を見る</button>
    </div>
  `;
  effectGrid.appendChild(container);
});

function openHobbyEffect(index) {
  currentEffectIndex = index;
  const effect = hobbyEffects[index];
  document.getElementById("hobbyModalTitle").textContent = effect.title;
  document.getElementById("hobbyModalContent").textContent = effect.description;
  const demo = document.getElementById("demoElement");
  demo.innerHTML = "Demo Element";
  demo.className = "";
  demo.removeAttribute("style");
  document.getElementById("effectCodeBlock").textContent = effect.code;
  document.getElementById("hobbyModal").classList.add("show");
}

function closeHobbyModal() {
  document.getElementById("hobbyModal").classList.remove("show");
}

function runEffect() {
  hobbyEffects[currentEffectIndex].trigger();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".popup-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      openHobbyEffect(index);
    });
  });
});