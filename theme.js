(function () {
    var STORAGE_KEY = "edudash-theme";
    var LIGHT_CLASS = "light-theme";

    document.addEventListener("DOMContentLoaded", function () {
        applySavedTheme();
        mountThemeToggle();
    });

    function mountThemeToggle() {
        var sidebar = document.querySelector(".sidebar");
        if (!sidebar) return;

        var bottom = sidebar.querySelector(".sidebar-bottom");
        if (!bottom) {
            bottom = document.createElement("div");
            bottom.className = "sidebar-bottom";
            sidebar.appendChild(bottom);
        }

        if (bottom.querySelector(".theme-toggle")) return;

        var button = document.createElement("button");
        button.type = "button";
        button.className = "theme-toggle";
        button.setAttribute("aria-label", "Toggle theme");

        var icon = document.createElement("i");
        icon.className = "fa-solid";
        icon.setAttribute("aria-hidden", "true");

        var text = document.createElement("span");
        text.textContent = "";

        button.appendChild(icon);
        button.appendChild(text);
        bottom.appendChild(button);

        updateToggleUi(button);

        button.addEventListener("click", function () {
            document.body.classList.toggle(LIGHT_CLASS);
            saveTheme();
            updateToggleUi(button);
        });
    }

    function applySavedTheme() {
        var savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme === "light") {
            document.body.classList.add(LIGHT_CLASS);
        } else {
            document.body.classList.remove(LIGHT_CLASS);
        }
    }

    function saveTheme() {
        var theme = document.body.classList.contains(LIGHT_CLASS) ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, theme);
    }

    function updateToggleUi(button) {
        var isLight = document.body.classList.contains(LIGHT_CLASS);
        var icon = button.querySelector("i");
        var text = button.querySelector("span");

        if (!icon || !text) return;

        icon.classList.toggle("fa-sun", isLight);
        icon.classList.toggle("fa-moon", !isLight);
        text.textContent = isLight ? "Light Mode" : "Dark Mode";
    }
})();
