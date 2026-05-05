document.addEventListener("DOMContentLoaded", function () {
    resetHiddenToggles();
    setupSidebar();
    setupDropdowns();
    setupMarkReadButtons();

    function resetHiddenToggles() {
        var toggles = document.querySelectorAll(".css-toggle-input");

        for (var i = 0; i < toggles.length; i++) {
            if (toggles[i].type === "checkbox") {
                toggles[i].checked = false;
            }
        }
    }

    function setupSidebar() {
        var openButton = document.querySelector(".mobile-sidebar-label");
        var overlay = document.querySelector(".sidebar-overlay-label");

        if (!openButton || !overlay) return;

        openButton.addEventListener("click", function (event) {
            event.preventDefault();
            document.body.classList.toggle("sidebar-open");
        });

        overlay.addEventListener("click", function (event) {
            event.preventDefault();
            document.body.classList.remove("sidebar-open");
        });
    }

    function setupDropdowns() {
        var wrappers = document.querySelectorAll(".dropdown-wrapper");

        for (var i = 0; i < wrappers.length; i++) {
            (function (wrapper) {
                var trigger = wrapper.querySelector(".header-icon-btn");
                var panel = wrapper.querySelector(".dropdown-panel");

                if (!trigger || !panel) return;

                trigger.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    var isOpen = wrapper.classList.contains("is-open");
                    closeDropdowns();

                    if (!isOpen) {
                        wrapper.classList.add("is-open");
                        panel.classList.add("active");
                    }
                });
            })(wrappers[i]);
        }

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".dropdown-wrapper")) {
                closeDropdowns();
            }
        });
    }

    function closeDropdowns() {
        var wrappers = document.querySelectorAll(".dropdown-wrapper");

        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].classList.remove("is-open");

            var panel = wrappers[i].querySelector(".dropdown-panel");
            if (panel) {
                panel.classList.remove("active");
            }
        }
    }

   

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.body.classList.remove("sidebar-open");
            closeDropdowns();
        }
    });
});
