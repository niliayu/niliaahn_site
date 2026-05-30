// comic_show.js — displays comic pages, page title, navigation and author notes.
// Originally by geno7 (Rarebit); restyled for Nilia Ahn's site with themed,
// touch-friendly navigation buttons and graceful placeholders for missing pages.

writeNav();                                   // render navigation rows
writePageTitle(".writePageTitle", true, " · ");// page title (with page number)
writePageClickable(".writePageClickable", true);// the page image (click to advance)
writeAuthorNotes(".writeAuthorNotes");
keyNav();                                     // arrow-key / WASD navigation

// SHOW COMIC PAGE, optionally clickable to advance
function writePageClickable(div, clickable) {
	var el = document.querySelector(div);
	if (!el) return;
	if (clickable && pg < maxpg) {
		el.innerHTML = `<div class="comicPage"><a href="?pg=${pg + 1}${navScrollTo}" aria-label="Next page">${writePage()}</a></div>`;
	} else {
		el.innerHTML = `<div class="comicPage">${writePage()}</div>`;
	}
}

function writePageTitle(div, toggleNum, char) {
	var el = document.querySelector(div);
	if (!el || pgData.length < pg) return;
	var t = toggleNum ? (pgData[pg - 1].pgNum + char + pgData[pg - 1].title) : pgData[pg - 1].title;
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
		${navButton("?pg=1" + navScrollTo, "&laquo; First", { disabled: atStart })}
		${navButton("?pg=" + (pg - 1) + navScrollTo, "&lsaquo; Prev", { disabled: atStart })}
		${navButton("?pg=" + (pg + 1) + navScrollTo, "Next &rsaquo;", { disabled: atEnd, primary: !atEnd })}
		${navButton("?pg=" + maxpg + navScrollTo, "Last &raquo;", { disabled: atEnd })}
	</nav>`;

	rows.forEach(function (el) { el.innerHTML = html; });
}

// KEYBOARD NAVIGATION (arrows / WASD)
function keyNav() {
	document.addEventListener("keydown", function (e) {
		var k = (e.key || "").toLowerCase();
		if ((e.key === "ArrowRight" || k === "d") && pg < maxpg) {
			window.location.href = "?pg=" + (pg + 1) + navScrollTo;
		} else if ((e.key === "ArrowLeft" || k === "a") && pg > 1) {
			window.location.href = "?pg=" + (pg - 1) + navScrollTo;
		} else if (k === "w") {
			window.scrollBy({ top: -40 });
		} else if (k === "s") {
			window.scrollBy({ top: 40 });
		}
	});
}
