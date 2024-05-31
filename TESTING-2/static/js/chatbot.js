const msgerForm = document.querySelector(".msger-inputarea");
const msgerInput = document.querySelector(".msger-input");
const msgerChat = document.querySelector(".msger-chat");

const BOT_IMG = "/static/img/BENGBOT3.png";
const PERSON_IMG = "/static/img/person-circle.svg";
const BOT_NAME = "BengBOT";
const PERSON_NAME = "Kamu";
const showChatPopup = showPopup;
const hideChatPopup = hidePopup;

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  botResponse(msgText);

  // Tambahkan perintah untuk menampilkan kembali popup chatbot setelah formulir dikirim
  showChatPopup();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
  <div class="msg ${side}-msg">
  <div class="msg-img" style="background-image: url(${img})"></div>
  
  <div class="msg-bubble">
  <div class="msg-info">
  <div class="msg-info-name">${name}</div>
  <div class="msg-info-time">${formatDate(new Date())}</div>
  </div>
  
  <div class="msg-text">${text}</div>
  </div>
  </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(rawText) {
  // Bot Response
  $.get("/get", { msg: rawText }).done(function (data) {
    console.log(rawText);
    console.log(data);
    const msgText = data;
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  });
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

// Fungsi untuk menampilkan tombol close dan menyembunyikan tombol di luar section
function showPopup() {
  document.getElementById("chatPopup").style.display = "block";
  document.getElementById("closeBtn").style.display = "block";
  document.getElementById("chatBtnOutside").style.display = "none";
}

// Fungsi untuk menyembunyikan tombol close dan menampilkan tombol di luar section kembali
function hidePopup() {
  document.getElementById("chatPopup").style.display = "none";
  document.getElementById("closeBtn").style.display = "none";
  document.getElementById("chatBtnOutside").style.display = "block";
}

// Tambahkan event listener untuk tombol di luar section
document
  .getElementById("chatBtnOutside")
  .addEventListener("click", function () {
    showPopup();
  });

// Tambahkan event listener untuk tombol di dalam section
document.getElementById("chatBtnInside").addEventListener("click", function () {
  showPopup();
});

// Tambahkan event listener untuk tombol penutup
document.getElementById("closeBtn").addEventListener("click", function () {
  hidePopup();
});

// Mencegah event click pada elemen-elemen di dalam popup agar tidak menyembunyikan popup
document
  .getElementById("chatPopup")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

// Ketika area di luar popup chatbot ditekan, sembunyikan popup chatbot
window.addEventListener("click", function (event) {
  var popup = document.getElementById("chatPopup");
  var chatBtn = document.getElementById("chatBtnInside");
  var target = event.target;
  if (target !== popup && target !== chatBtn && !popup.contains(target)) {
    // hideChatPopup();
  }
});

// scroll tombol chatbot
const chatBtnOutside = document.getElementById("chatBtnOutside", "closeBtn");
function togglechatBtn() {
  if (window.scrollY > 100) {
    chatBtnOutside.classList.add("active");
  } else {
    chatBtnOutside.classList.remove("active");
  }
}
window.addEventListener("scroll", togglechatBtn);
togglechatBtn();
