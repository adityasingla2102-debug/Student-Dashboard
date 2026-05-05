// ============================================
// SEARCH.JS — Live search filtering
// Shows matching suggestions as you type
// and filters page content when Enter is pressed
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".header-search-form");
    if (!form) return;

    var input = form.querySelector("input[name='search']");
    var dropdown = form.querySelector(".search-suggestions");
    if (!input || !dropdown) return;

    var items = dropdown.querySelectorAll(".search-suggestion-item");

    // all filterable content items on the page
    var contentCards = document.querySelectorAll(
        ".course-tile, .book-card, .assignment-card, .schedule-slot"
    );

    // hide dropdown by default
    dropdown.style.display = "none";

    // ---- Suggestion dropdown filtering (as you type) ----
    input.addEventListener("input", function () {
        var query = input.value.trim().toLowerCase();

        if (query.length === 0) {
            dropdown.style.display = "none";
            // reset all content cards when search is cleared
            resetContentFilter();
            return;
        }

        var matchCount = 0;
        for (var i = 0; i < items.length; i++) {
            var text = items[i].textContent.toLowerCase();
            if (text.indexOf(query) !== -1) {
                items[i].style.display = "";
                matchCount++;
            } else {
                items[i].style.display = "none";
            }
        }

        dropdown.style.display = matchCount > 0 ? "block" : "none";
    });

    // ---- On Enter: filter page content instead of navigating ----
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page navigation

        var query = input.value.trim().toLowerCase();
        dropdown.style.display = "none";
        input.blur();

        if (query.length === 0) {
            resetContentFilter();
            return;
        }

        filterPageContent(query);
    });

    // ---- Click a suggestion: filter to that item ----
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function (e) {
            // get the main text from the suggestion (first span)
            var span = this.querySelector("span");
            if (span) {
                var text = span.textContent.trim();
                input.value = text;
                dropdown.style.display = "none";
                filterPageContent(text.toLowerCase());
            }
        });
    }

    // close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!form.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });

    // re-filter when input is focused with existing text
    input.addEventListener("focus", function () {
        if (input.value.trim().length > 0) {
            input.dispatchEvent(new Event("input"));
        }
    });

    // ---- Filter page content to show only matching cards ----
    function filterPageContent(query) {
        if (contentCards.length === 0) return;



        for (var i = 0; i < contentCards.length; i++) {
            var card = contentCards[i];
            var cardText = card.textContent.toLowerCase();

            if (cardText.indexOf(query) !== -1) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        }

    }

    // ---- Reset all content cards to visible ----
    function resetContentFilter() {
        for (var i = 0; i < contentCards.length; i++) {
            contentCards[i].style.display = "";
        }
    }
});
