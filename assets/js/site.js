/* Shared UI behavior: sticky-nav state, mobile menu, scroll reveals. */
(function () {
	"use strict";

	var nav = document.querySelector(".site-nav");
	var toggle = document.querySelector(".nav-toggle");
	var body = document.body;

	// Sticky nav shadow on scroll
	if (nav) {
		var onScroll = function () {
			nav.classList.toggle("scrolled", window.scrollY > 12);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
	}

	// Mobile menu
	if (toggle) {
		toggle.addEventListener("click", function () {
			body.classList.toggle("nav-open");
		});
		document.querySelectorAll(".nav-links a").forEach(function (a) {
			a.addEventListener("click", function () { body.classList.remove("nav-open"); });
		});
	}

	// Lightweight scroll-reveal (no external dependency).
	var reveals = document.querySelectorAll("[data-reveal]");
	if ("IntersectionObserver" in window && reveals.length) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
		reveals.forEach(function (el) { io.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add("is-visible"); });
	}
})();
