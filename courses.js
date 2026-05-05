document.addEventListener("DOMContentLoaded", function () {
    resetHiddenToggles();
    setupSidebar();
    setupDropdowns();
    setupMarkReadButtons();
    setupCourseMenus();
    setupCourseFilters();

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

   

    function setupCourseMenus() {
        var buttons = document.querySelectorAll(".course-menu-btn");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                var actions = this.closest(".course-tile-actions");
                if (!actions) return;

                var menu = actions.querySelector(".course-context-menu");
                var isOpen = actions.classList.contains("is-open");

                closeCourseMenus();

                if (!isOpen && menu) {
                    actions.classList.add("is-open");
                    menu.classList.add("active");
                }
            });
        }

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".course-tile-actions")) {
                closeCourseMenus();
            }
        });
    }

    function closeCourseMenus() {
        var actions = document.querySelectorAll(".course-tile-actions");

        for (var i = 0; i < actions.length; i++) {
            actions[i].classList.remove("is-open");

            var menu = actions[i].querySelector(".course-context-menu");
            if (menu) {
                menu.classList.remove("active");
            }
        }
    }

    function setupCourseFilters() {
        var buttons = document.querySelectorAll(".courses-filter-radios .filter-tab");
        var items = document.querySelectorAll(".course-tile");
        var mapping = {
            "All Courses": "all",
            "In Progress": "progress",
            "Completed": "completed",
            "New": "new"
        };

        if (buttons.length === 0 || items.length === 0) return;

        for (var i = 0; i < buttons.length; i++) {
            (function (button) {
                button.addEventListener("click", function (event) {
                    event.preventDefault();
                    applyFilter(mapping[normalize(button.textContent)] || "all", button);
                });
            })(buttons[i]);
        }

        applyFilter("all", buttons[0]);

        function applyFilter(value, activeButton) {
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("active");
            }

            activeButton.classList.add("active");

            for (var j = 0; j < items.length; j++) {
                var matches = value === "all" || items[j].getAttribute("data-status") === value;
                items[j].style.display = matches ? "block" : "none";
            }
        }
    }

    function normalize(value) {
        return value.replace(/\s+/g, " ").trim();
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.body.classList.remove("sidebar-open");
            closeDropdowns();
            closeCourseMenus();
        }
    });
});
