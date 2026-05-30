/* =========================================================
   protect.js — client-side art-theft deterrents
   ---------------------------------------------------------
   NOTE: Client-side protection can only *deter* casual
   copying. It cannot truly stop a determined person or an
   AI crawler. The meaningful protections live server-side
   (robots.txt, /.well-known/tdmrep.json, noai meta tags,
   plus tools like Glaze/Nightshade and watermarking).
   This script raises the effort required for casual theft.
   ========================================================= */
(function () {
	"use strict";

	var STRONG = true; // strong-deterrent mode

	// 1) Block the right-click context menu (where "Save image as" lives).
	document.addEventListener("contextmenu", function (e) {
		if (e.target && (e.target.closest("img, picture, .protected, .comicPage, .hero-portrait, .comic-cover"))) {
			e.preventDefault();
		} else if (STRONG) {
			e.preventDefault();
		}
	});

	// 2) Block dragging images out of the page.
	document.addEventListener("dragstart", function (e) {
		if (e.target && (e.target.tagName === "IMG" || e.target.closest(".protected"))) {
			e.preventDefault();
		}
	});

	// 3) Mark every image as non-draggable + non-selectable.
	function harden() {
		var imgs = document.images;
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].setAttribute("draggable", "false");
			imgs[i].oncontextmenu = function () { return false; };
		}
	}
	if (document.readyState !== "loading") harden();
	else document.addEventListener("DOMContentLoaded", harden);
	// Re-harden when comic engine injects pages after load.
	window.addEventListener("load", harden);
	setTimeout(harden, 600);

	if (!STRONG) return;

	// 4) Discourage common "save / view source / devtools" shortcuts.
	document.addEventListener("keydown", function (e) {
		var k = (e.key || "").toLowerCase();
		var blockedCombo =
			(e.ctrlKey || e.metaKey) && (k === "s" || k === "u") ||                       // save page / view source
			(e.ctrlKey || e.metaKey) && e.shiftKey && (k === "i" || k === "j" || k === "c") || // devtools
			k === "f12";                                                                  // devtools
		if (blockedCombo) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});

	// 5) Clear clipboard on PrintScreen (best-effort, deters quick screenshots).
	document.addEventListener("keyup", function (e) {
		if ((e.key || "").toLowerCase() === "printscreen" && navigator.clipboard) {
			navigator.clipboard.writeText("").catch(function () {});
		}
	});
})();
