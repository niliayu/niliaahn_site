// Site-wide navigation + comic masthead, injected into every page's .writeHeader div.
// Pulls comicTitle / comicTagline / comicHome / comicTitleImage from comic_settings.js.
(function () {
	var home = (typeof comicHome !== "undefined") ? comicHome : "../index.html";
	var title = (typeof comicTitle !== "undefined") ? comicTitle : "Webcomic";
	var tagline = (typeof comicTagline !== "undefined") ? comicTagline : "";
	var logo = (typeof comicTitleImage !== "undefined") ? comicTitleImage : "";

	var titleMarkup = logo
		? '<a href="index.html"><img class="title-logo" src="' + logo + '" alt="' + title + '" /></a>'
		: '<h1 class="comic-title"><a href="index.html">' + title + '</a></h1>';

	var target = document.querySelector(".writeHeader");
	if (target) {
		target.innerHTML = `
			<nav class="site-nav" aria-label="Primary">
				<a href="${home}" class="brand"><span class="dot" aria-hidden="true"></span> Nilia Ahn</a>
				<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
				<ul class="nav-links">
					<li><a href="index.html">Read</a></li>
					<li><a href="archive.html">Archive</a></li>
					<li><a href="about.html">About</a></li>
					<li><a href="${home}#comics" class="cta">All Comics</a></li>
				</ul>
			</nav>
			<header class="comic-masthead">
				<span class="eyebrow">Webcomic</span>
				${titleMarkup}
				${tagline ? '<p class="comic-tagline">' + tagline + "</p>" : ""}
			</header>
		`;
	}

	// Wire up sticky-nav + mobile menu (mirrors assets/js/site.js for comic pages).
	var nav = document.querySelector(".site-nav");
	var toggle = document.querySelector(".nav-toggle");
	if (nav) {
		var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 12); };
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
	}
	if (toggle) {
		toggle.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
		document.querySelectorAll(".nav-links a").forEach(function (a) {
			a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
		});
	}
})();
