// comic_archive.js — builds the archive list. Originally by geno7 (Rarebit).
// Each writeArchive() call fills the matching <div class="..."> on archive.html.

writeArchive("chapter1", 1, maxpg, -1, false, true); // Chapter 1 (auto-updates with maxpg)

// ---- engine (no need to edit below) ----
function writeArchive(divClass, min, max, reverseOrder, useThumbs, useNums) {
	var getDiv = document.getElementsByClassName(divClass)[0];
	if (!getDiv) return;

	var archiveTable = document.createElement("TABLE");
	archiveTable.setAttribute("class", "archiveTable");
	getDiv.appendChild(archiveTable);

	for (var i = min; i <= max; i++) {
		var row = archiveTable.insertRow(reverseOrder);

		var cellThumb = useThumbs ? row.insertCell() : 0;
		var cellNum = useNums ? row.insertCell() : 0;
		var cellTitle = row.insertCell();
		var cellDate = row.insertCell();

		var pgTitle = "Page " + i;
		var pgDate = "";
		var pgNum = "";
		var pgThumb = thumbFolder + "/" + image + i + "." + thumbExt;
		var pgThumbDefault = thumbFolder + "/" + thumbDefault + "." + thumbExt;

		if (pgData.length >= i) {
			if (pgData[i - 1].title) pgTitle = pgData[i - 1].title;
			if (pgData[i - 1].date) pgDate = pgData[i - 1].date;
			if (pgData[i - 1].pgNum) pgNum = pgData[i - 1].pgNum;
		}

		row.setAttribute("class", "archiveRow");
		var linkToComic = indexPage + "?pg=" + i + navScrollTo;
		(function (href) {
			row.addEventListener("click", function () { window.location.href = href; });
		})(linkToComic);

		if (useThumbs) {
			cellThumb.innerHTML = `<img alt="${pgTitle}" title="${pgTitle}" src="${pgThumb}" onerror="this.onerror=null;this.src='${pgThumbDefault}';"/>`;
			cellThumb.setAttribute("class", "archiveCellThumb");
		}
		if (useNums) {
			cellNum.innerHTML = `<span><strong>${pgNum}</strong></span>`;
			cellNum.setAttribute("class", "archiveCellNum");
		}
		cellTitle.innerHTML = `<span><strong>${pgTitle}</strong></span>`;
		cellTitle.setAttribute("class", "archiveCellTitle leftAlignTableText");
		cellDate.innerHTML = "<span>" + pgDate + "</span>";
		cellDate.setAttribute("class", "archiveCellDate");
	}
}
