document.addEventListener("DOMContentLoaded", function () {
    resetHiddenToggles();
    setupSignInPanel();
    setupPasswordToggle();

    function resetHiddenToggles() {
        var toggles = document.querySelectorAll(".css-toggle-input");

        for (var i = 0; i < toggles.length; i++) {
            if (toggles[i].type === "checkbox") {
                toggles[i].checked = false;
            }
        }
    }

    function setupSignInPanel() {
        var openButtons = document.querySelectorAll(".btn-signin-top, .btn-get-started");
        var closeButtons = document.querySelectorAll(".signin-backdrop, .btn-close-signin");

        for (var i = 0; i < openButtons.length; i++) {
            openButtons[i].addEventListener("click", function (event) {
                event.preventDefault();
                document.body.classList.add("signin-open");
            });
        }

        for (var j = 0; j < closeButtons.length; j++) {
            closeButtons[j].addEventListener("click", function (event) {
                event.preventDefault();
                document.body.classList.remove("signin-open");
            });
        }
    }

    function setupPasswordToggle() {
        var passwordInput = document.querySelector("#password");
        var passwordToggle = document.querySelector(".form-group .fa-eye");

        if (!passwordInput || !passwordToggle) return;

        passwordToggle.style.cursor = "pointer";
        passwordToggle.addEventListener("click", function () {
            var isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            passwordToggle.classList.toggle("fa-eye");
            passwordToggle.classList.toggle("fa-eye-slash");
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.body.classList.remove("signin-open");
        }
    });
});
