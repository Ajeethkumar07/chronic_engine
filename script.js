document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('errorMsg');
    const loginBtn = document.querySelector('.login-btn');
    const eyeIcon = document.querySelector('.eye-icon');

    eyeIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.remove('bx-show');
            eyeIcon.classList.add('bx-hide');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('bx-hide');
            eyeIcon.classList.add('bx-show');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        errorMsg.style.opacity = '0';

        const originalBtnContent = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> VERIFYING...';
        loginBtn.style.opacity = '0.8';

        setTimeout(() => {
            if (email === 'chronic67@gmail.com' && password === 'Test@123') {
                loginBtn.innerHTML = '<i class="bx bx-check"></i> GRANTED';
                loginBtn.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
                errorMsg.textContent = 'Access Authorized.';
                errorMsg.style.color = '#34d399';
                errorMsg.style.opacity = '1';

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                loginBtn.innerHTML = originalBtnContent;
                loginBtn.style.opacity = '1';

                errorMsg.textContent = 'ACCESS DENIED: Invalid Credentials';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.opacity = '1';

                loginForm.classList.add('shake-animation');
                setTimeout(() => {
                    loginForm.classList.remove('shake-animation');
                }, 500);
            }
        }, 1500);
    });
});
