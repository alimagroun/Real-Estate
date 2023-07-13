// recaptcha.js
function onRecaptchaLoaded() {
    grecaptcha.ready(function() {
      grecaptcha.execute('6LeAgiAnAAAAAA2Q4V3EXvKh9WvsfopK1YoI54fJ', { action: 'form_submit' })
        .then(function(token) {
          document.getElementById('recaptchaToken').value = token;
        });
    });
  }
  