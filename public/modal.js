const btns = document.querySelectorAll(".btn");
const modals = document.getElementsByClassName("modal");
const closeModals = document.getElementsByClassName("modalClose");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    closeAllModal(); // 念の為全てのモーダルを閉じます
    const modalId = btns[i].dataset.modal_id; // ボタンに設定されたモーダルを開きます
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
  });
}

// 閉じるボタンが押されたら全てのモーダルを閉じます
for (let i = 0; i < closeModals.length; i++) {
  closeModals[i].addEventListener("click", function () {
    closeAllModal();
  });
}

// 全てのモーダルを閉じます
function closeAllModal() {
  for (let i = 0; i < modals.length; i++) {
    modals[i].style.display = "none";
  }
}
