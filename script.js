// ----- show current year in footer -----
document.getElementById("currentYear").textContent = new Date().getFullYear();


// ----- change navbar color when page is scrolled -----
var navbar = document.getElementById("mainNav");

window.addEventListener("scroll", function () {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ----- contact form validation -----
var form = document.getElementById("contactForm");
var nameInput = document.getElementById("fullName");
var emailInput = document.getElementById("userEmail");
var messageInput = document.getElementById("userMessage");
var successBox = document.getElementById("successBox");

// shows an error under the field and turns the border red
function showError(input, errorId, text) {
  document.getElementById(errorId).textContent = text;
  input.classList.add("input-error");
  input.classList.remove("input-ok");
}

// clears the error and turns the border green
function showOk(input, errorId) {
  document.getElementById(errorId).textContent = "";
  input.classList.remove("input-error");
  input.classList.add("input-ok");
}

function checkName() {
  var value = nameInput.value.trim();

  if (value === "") {
    showError(nameInput, "nameError", "Please enter your name.");
    return false;
  }
  if (value.length < 3) {
    showError(nameInput, "nameError", "Name must have at least 3 characters.");
    return false;
  }
  showOk(nameInput, "nameError");
  return true;
}

function checkEmail() {
  var value = emailInput.value.trim();
  // simple email pattern: something@something.something
  var pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  if (value === "") {
    showError(emailInput, "emailError", "Please enter your email.");
    return false;
  }
  if (!pattern.test(value)) {
    showError(emailInput, "emailError", "Please enter a valid email like abc@gmail.com");
    return false;
  }
  showOk(emailInput, "emailError");
  return true;
}

function checkMessage() {
  var value = messageInput.value.trim();

  if (value === "") {
    showError(messageInput, "messageError", "Please write a message.");
    return false;
  }
  if (value.length < 10) {
    showError(messageInput, "messageError", "Message must be at least 10 characters.");
    return false;
  }
  showOk(messageInput, "messageError");
  return true;
}

// check each field when the user leaves it
nameInput.addEventListener("blur", checkName);
emailInput.addEventListener("blur", checkEmail);
messageInput.addEventListener("blur", checkMessage);

// once a field has an error, re-check it while the user types
nameInput.addEventListener("input", function () {
  if (nameInput.classList.contains("input-error")) checkName();
});
emailInput.addEventListener("input", function () {
  if (emailInput.classList.contains("input-error")) checkEmail();
});
messageInput.addEventListener("input", function () {
  if (messageInput.classList.contains("input-error")) checkMessage();
});

// when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  successBox.classList.add("d-none");

  // run all three checks (not stopping at the first wrong one)
  var nameOk = checkName();
  var emailOk = checkEmail();
  var messageOk = checkMessage();

  if (nameOk && emailOk && messageOk) {
    // no backend yet, so just show a success message
    successBox.classList.remove("d-none");
    form.reset();

    // remove the green borders after reset
    nameInput.classList.remove("input-ok");
    emailInput.classList.remove("input-ok");
    messageInput.classList.remove("input-ok");
  }
});
