// comic_show.js — displays comic pages, page title, navigation and author notes.
// Originally by geno7 (Rarebit); restyled for Nilia Ahn's site with themed,
// touch-friendly navigation buttons and graceful placeholders for missing pages.

// Build a comic page URL that works from index.html and archive.html.
// (Defined in comic_settings.js as comicPageUrl.)

writeNav();                                   // render navigation rows
writePageTitle(".writePageTitle", false);// chapter title only (no global reader index)
writePageClickable(".writePageClickable", true);// the page image (click to advance)
writeAuthorNotes(".writeAuthorNotes");
keyNav();                                     // arrow-key / WASD navigation

// SHOW COMIC PAGE, optionally clickable to advance
function writePageClickable(div, clickable) {
	var el = document.querySelector(div);
	if (!el) return;
	if (clickable && pg < maxpg) {
		el.innerHTML = `<div class="comicPage"><a href="${comicPageUrl(pg + 1)}" aria-label="Next page">${writePage()}</a></div>`;
	} else {
		el.innerHTML = `<div class="comicPage">${writePage()}</div>`;
	}
}

function writePageTitle(div, toggleNum, char) {
	var el = document.querySelector(div);
	if (!el || pgData.length < pg) return;
	var entry = pgData[pg - 1];
	var t = entry.title;
	if (toggleNum && entry.pgNum && entry.pgNum !== "Title") {
		t = entry.pgNum + (char || " · ") + entry.title;
	}
	el.innerHTML = `<h1>${t}</h1>`;
}

function writeAuthorNotes(div) {
	var el = document.querySelector(div);
	if (!el || pgData.length < pg) return;
	var notes = pgData[pg - 1].authorNotes;
	if (notes && notes.trim()) {
		el.innerHTML = `<div class="author-notes"><div class="card"><h2>Author Notes</h2>${notes}</div></div>`;
	} else {
		el.innerHTML = "";
	}
}

// Build the <img> for the current page, with a graceful placeholder fallback.
function writePage() {
	var altText = (pgData.length >= pg && pgData[pg - 1].altText) ? pgData[pg - 1].altText : ("Page " + pg);
	var placeholder = (typeof comicPlaceholder !== "undefined") ? comicPlaceholder : "";
	var onerr = placeholder ? ` onerror="this.onerror=null;this.src='${placeholder}';"` : "";

	function tag(path) {
		return `<img alt="${altText}" title="${altText}" src="${path}"${onerr} draggable="false" oncontextmenu="return false;" />`;
	}

	var base = (folder !== "" ? folder + "/" : "") + image + pg;

	if (pgData.length >= pg && pgData[pg - 1].imageFiles > 1) {
		var out = "";
		for (var i = 1; i <= pgData[pg - 1].imageFiles; i++) {
			if (i > 1) out += "<br/>";
			out += tag(base + imgPart + i + "." + ext);
		}
		return out;
	}
	return tag(base + "." + ext);
}

// Render a single arrow/label button (or a disabled span).
function navButton(href, label, opts) {
	opts = opts || {};
	var cls = "comic-btn" + (opts.primary ? " is-primary" : "");
	if (opts.disabled) {
		return `<span class="${cls} is-disabled">${label}</span>`;
	}
	return `<a class="${cls}" href="${href}">${label}</a>`;
}

function writeNav() {
	var rows = document.querySelectorAll(".writeNav");
	if (!rows.length) return;
	var atStart = pg <= 1;
	var atEnd = pg >= maxpg;

	var html = `<nav class="comicNav" aria-label="Comic navigation">
		${navButton(comicPageUrl(1), "&laquo; First", { disabled: atStart })}
		${navButton(comicPageUrl(pg - 1), "&lsaquo; Prev", { disabled: atStart })}
		${navButton(comicPageUrl(pg + 1), "Next &rsaquo;", { disabled: atEnd, primary: !atEnd })}
		${navButton(comicPageUrl(maxpg), "Last &raquo;", { disabled: atEnd })}
	</nav>`;

	rows.forEach(function (el) { el.innerHTML = html; });
}

// KEYBOARD NAVIGATION (arrows / WASD)
function keyNav() {
	document.addEventListener("keydown", function (e) {
		var k = (e.key || "").toLowerCase();
		if ((e.key === "ArrowRight" || k === "d") && pg < maxpg) {
			window.location.href = comicPageUrl(pg + 1);
		} else if ((e.key === "ArrowLeft" || k === "a") && pg > 1) {
			window.location.href = comicPageUrl(pg - 1);
		} else if (k === "w") {
			window.scrollBy({ top: -40 });
		} else if (k === "s") {
			window.scrollBy({ top: 40 });
		}
	});
}
