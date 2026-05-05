document.addEventListener("DOMContentLoaded", function () {
    resetHiddenToggles();
    setupSidebar();
    setupPaymentPage();

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

    function setupPaymentPage() {
        var paymentTabs = document.querySelectorAll(".pay-tab");
        var payContents = document.querySelectorAll(".pay-tab-content");
        var slider = document.querySelector("#coin-slider");
        var coinInput = document.querySelector("#coin-input");
        var applyButton = document.querySelector(".btn-apply-coins");
        var payButton = document.querySelector(".btn-pay-now");
        var upiApps = document.querySelectorAll(".upi-app");
        var tabTargets = ["tab-upi", "tab-card", "tab-netbanking"];

        populateOrderSummary();

        for (var i = 0; i < paymentTabs.length; i++) {
            (function (index) {
                paymentTabs[index].addEventListener("click", function () {
                    for (var j = 0; j < paymentTabs.length; j++) {
                        paymentTabs[j].classList.remove("active");
                        if (payContents[j]) {
                            payContents[j].classList.remove("active");
                        }
                    }

                    paymentTabs[index].classList.add("active");

                    var target = document.getElementById(tabTargets[index]);
                    if (target) {
                        target.classList.add("active");
                    }
                });
            })(i);
        }

        for (var k = 0; k < upiApps.length; k++) {
            upiApps[k].addEventListener("click", function () {
                for (var m = 0; m < upiApps.length; m++) {
                    upiApps[m].classList.remove("selected");
                }

                this.classList.add("selected");
            });
        }

        if (!slider || !coinInput || !applyButton || !payButton) return;

        slider.addEventListener("input", function () {
            coinInput.value = slider.value;
        });

        coinInput.addEventListener("input", function () {
            var maxCoins = Number(slider.max);
            var value = Number(coinInput.value || 0);

            if (value < 0) value = 0;
            if (value > maxCoins) value = maxCoins;

            coinInput.value = value;
            slider.value = value;
        });

        applyButton.addEventListener("click", function (event) {
            event.preventDefault();
            updatePaymentTotals(Number(coinInput.value || 0));
        });

        payButton.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Payment completed successfully.");
            localStorage.removeItem("selectedBook");
            window.location.href = "books.html";
        });
    }

    function populateOrderSummary() {
        var selectedBook = localStorage.getItem("selectedBook");
        var orderItems = document.querySelector("#order-items");
        var subtotal = document.querySelector("#order-subtotal");
        var total = document.querySelector("#order-total");
        var payLabel = document.querySelector(".btn-pay-now strong");

        if (!orderItems || !subtotal || !total || !payLabel) return;

        var book = selectedBook ? JSON.parse(selectedBook) : null;
        var basePrice = book && book.price ? book.price : 0;

        if (book) {
            orderItems.innerHTML =
                '<div class="order-item">' +
                '<div><strong>' + book.name + '</strong><div>' + book.author + "</div></div>" +
                "<span>₹" + formatNumber(basePrice) + "</span>" +
                "</div>";
        }

        subtotal.textContent = "₹" + formatNumber(basePrice);
        total.textContent = "₹" + formatNumber(basePrice);
        payLabel.textContent = "₹" + formatNumber(basePrice);
    }

    function updatePaymentTotals(coinsUsed) {
        var selectedBook = localStorage.getItem("selectedBook");
        var book = selectedBook ? JSON.parse(selectedBook) : null;
        var basePrice = book && book.price ? book.price : 0;
        var discount = Math.min(coinsUsed, basePrice);
        var finalPrice = basePrice - discount;
        var subtotal = document.querySelector("#order-subtotal");
        var total = document.querySelector("#order-total");
        var payLabel = document.querySelector(".btn-pay-now strong");
        var discountLine = document.querySelector("#order-coin-line");
        var discountValue = document.querySelector("#order-coin-discount");
        var resultBox = document.querySelector("#coin-discount-result");
        var saveAmount = document.querySelector("#coin-save-amount");

        if (subtotal) {
            subtotal.textContent = "₹" + formatNumber(basePrice);
        }

        if (total) {
            total.textContent = "₹" + formatNumber(finalPrice);
        }

        if (payLabel) {
            payLabel.textContent = "₹" + formatNumber(finalPrice);
        }

        if (discountLine && discountValue) {
            discountLine.style.display = discount > 0 ? "flex" : "none";
            discountValue.textContent = "-₹" + formatNumber(discount);
        }

        if (resultBox && saveAmount) {
            resultBox.style.display = discount > 0 ? "flex" : "none";
            saveAmount.textContent = "₹" + formatNumber(discount);
        }
    }

    function formatNumber(value) {
        return Number(value || 0).toLocaleString("en-IN");
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.body.classList.remove("sidebar-open");
        }
    });
});
