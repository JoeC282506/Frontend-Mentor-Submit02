const inputImg = document.querySelector('input[type="file"]');
const imgdiv = document.querySelector(".imgdiv");
const inputinfo = document.querySelector(".inputinfo");
const inputImgError = document.querySelector(".inputImgError");
const selectedimg = document.querySelector("#selectedimg");
const fileLabel = document.querySelector("#fileLabel");
const ticketBtn = document.querySelector("#ticketBtn");
//main
const main = document.querySelector(".main");

//ticket
const ticket = document.querySelector(".ticketPart");

inputImg.addEventListener("change", upload);
function upload() {
  //check img size
  const maxSize = 1 * 1024 * 1024; // 1MB
  if (inputImg.files[0].size > maxSize) {
    inputinfo.style.display = "none";

    inputImgError.style.display = "block";
    return;
  } else {
    inputinfo.style.display = "block";

    inputImgError.style.display = "none";
  }

  // img input
  const file = inputImg.files[0];
  const reader = new FileReader();
  if (!file) return;

  reader.addEventListener("load", function () {
    selectedimg.src = reader.result;
    imgdiv.style.display = "block";
  });
  reader.readAsDataURL(file);
}

//img remove&change btn
function remove() {
  inputImg.value = "";
  selectedimg.src = "";
  imgdiv.style.display = "none";
}
function change() {
  inputImg.click();
}

//img drag&drop func
fileLabel.addEventListener("dragover", function (event) {
  event.preventDefault();
});
fileLabel.addEventListener("drop", function (event) {
  event.preventDefault();
  inputImg.files = event.dataTransfer.files;
  upload();
});

ticketBtn.addEventListener("click", (e) => {
  // 阻止表單提交
  e.preventDefault();

  // 獲取輸入元素
  const fileInput = document.querySelector("#file");
  const fullNameInput = document.querySelector("#fullName").value.trim();
  const emailInput = document.querySelector("#emailAddress").value.trim();
  const githubInput = document.querySelector("#githubUsername").value.trim();

  const fullnameMsg = document.querySelector("#fullnameError");
  const emailMsg = document.querySelector("#emailError");
  const githubMsg = document.querySelector("#githubError");
  /*   errormsg.style.display = "none"; */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 檢查輸入
  let fullhasError = false;
  let emailhasError = false;
  let githubhasError = false;
  if (!fullNameInput) {
    fullnameMsg.style.display = "flex";
    fullhasError = true;
  } else {
    fullnameMsg.style.display = "none";
    fullhasError = false;
  }
  // https://mailtrap.io/blog/javascript-email-validation/
  if (!emailInput || !emailRegex.test(emailInput)) {
    //email valid
    emailMsg.style.display = "flex";
    emailhasError = true;
  } else {
    emailMsg.style.display = "none";
    emailhasError = false;
  }
  if (!githubInput) {
    githubMsg.style.display = "flex";
    githubhasError = true;
  } else {
    githubMsg.style.display = "none";
    githubhasError = false;
  }
  if (fullhasError || emailhasError || githubhasError) {
    return false;
  } else {
    main.style.display = "none";
    ticket.style.display = "flex";
    const ticketImg = document.querySelector(".ticketImg");
    const ticketName = document.querySelectorAll(".ticketName");
    const ticketEmail = document.querySelector(".ticketEmail");
    const ticketGithub = document.querySelector("#ticketGithub");
    if (inputImg) {
      ticketImg.src = selectedimg.src;
    }
    ticketName.forEach((e) => {
      e.innerText = fullNameInput;
    });
    ticketEmail.textContent = emailInput;
    ticketGithub.innerText = githubInput; //textContent innerText both work
  }
});
