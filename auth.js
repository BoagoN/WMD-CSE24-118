document.addEventListener('DOMContentLoaded', function() {
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  function showLogin() {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  }

  function showSignup() {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  }

  // Tab clicks
  loginTab.addEventListener('click', function(e) {
    e.preventDefault();
    if (!loginTab.classList.contains('active')) {
      showLogin();
    }
  });

  signupTab.addEventListener('click', function(e) {
    e.preventDefault();
    if (!signupTab.classList.contains('active')) {
      showSignup();
    }
  });

  // Text link clicks
  switchToSignup.addEventListener('click', function(e) {
    e.preventDefault();
    showSignup();
  });

  switchToLogin.addEventListener('click', function(e) {
    e.preventDefault();
    showLogin();
  });
});