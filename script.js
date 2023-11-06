const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Hata mesajı gösterme
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Doğru veri girişinin geribildirimini verme
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Email kontrolü
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Geçersiz email girdiniz');
  }
}

// Boş alan kontrolü
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `Bu alan boş bırakılamaz`);
    } else {
      showSuccess(input);
    }
  });
}

// Max-min karakter kontrolü
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `En az ${min} karakter giriniz`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `Karakter sayısı ${max} karakterden az olmalı`
    );
  } else {
    showSuccess(input);
  }
}

// Kontrol şifresinin eşleşme durumu
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Şifreler Eşleşmiyor');
  }
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});