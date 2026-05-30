// comic_settings.js — the main file you'll edit to manage "Jack the Lantern Boy".
// Engine originally by geno7 (Rarebit).

let pg = Number(findGetParameter("pg")); // current page number from the URL (?pg=)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

// SITE / BRANDING (used by the shared header, footer & reader styling)
const comicTitle = "Jack the Lantern Boy"; // shown in the masthead + browser tab
const comicTagline = "For the love of loot."; // short subtitle under the title
const comicHome = "../index.html"; // link back to the main site
const comicTitleImage = ""; // optional logo image (e.g. "img/Title.png"); leave "" to use the styled text title
const comicPlaceholder = "../assets/img/page-placeholder.svg"; // shown automatically until a page image exists

// REALLY IMPORTANT ONES:
// maxpg = total number of pages currently posted.
// chapter1LastPage = where chapter 1 ends (for archive grouping + title mapping).
const maxpg = 17;
const chapter1LastPage = 9;
const pageDates = [
    // Chapter 1 (starts Sep 2025)
    [2025, 9, 5],   // pg1  - Chapter 1 title page
    [2025, 9, 12],  // pg2  - Chapter 1 page 1
    [2025, 9, 26],  // pg3
    [2025, 10, 10], // pg4
    [2025, 10, 24], // pg5
    [2025, 11, 7],  // pg6
    [2025, 11, 21], // pg7
    [2025, 12, 5],  // pg8
    [2025, 12, 19], // pg9

    // Break in Jan 2026, then Chapter 2 begins in Feb
    [2026, 2, 7],   // pg10 - Chapter 2 title page
    [2026, 2, 21],  // pg11
    [2026, 3, 7],   // pg12
    [2026, 3, 21],  // pg13
    [2026, 4, 4],   // pg14
    [2026, 4, 18],  // pg15
    [2026, 5, 2],   // pg16
    [2026, 5, 29],  // pg17 (most recent; capped at today)
];

// COMIC PAGE SETTINGS
const folder = "img/comics"; // folder that holds your comic pages
const image = "pg";          // page filenames start with this (pg1, pg2, …)
const imgPart = "_";         // separator for multi-file pages (pg2_1, pg2_2, …)
const ext = "png";           // file extension of your comic pages

// THUMBNAIL SETTINGS (for the archive page)
const thumbFolder = "img/thumbs";
const thumbExt = "png";
const thumbDefault = "default";

// NAVIGATION SETTINGS
const navText = ["First", "Previous", "Next", "Last"];
const navFolder = "img/comicnav";
const navExt = "png";
const navScrollTo = "#showComic"; // auto-scroll target when turning pages

// For this comic, opening index.html without ?pg= should start at page 1.
// Also guard against bad values (NaN, negatives, too large).
if (!Number.isFinite(pg) || pg < 1) {
    pg = 1;
} else if (pg > maxpg) {
    pg = maxpg;
}

// pgData holds the info for each page. To add a page:
//   1) drop the image into img/comics/ (pg2.png, pg3.png, …)
//   2) bump `maxpg` above
//   3) copy a block below and fill it in
/*
    {
        pgNum: ,
        title: "",
        date: writeDate(YEAR, MONTH, DAY),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
*/
// Explicit chapter/page map (Rarebit pg1..pg17). Title pages are separate from numbered story pages.
const pageMeta = [
    { chapter: 1, kind: "title" },
    { chapter: 1, page: 1 },
    { chapter: 1, page: 2 },
    { chapter: 1, page: 3 },
    { chapter: 1, page: 4 },
    { chapter: 1, page: 5 },
    { chapter: 1, page: 6 },
    { chapter: 1, page: 7 },
    { chapter: 1, page: 8 },
    { chapter: 2, kind: "title" },
    { chapter: 2, page: 1 },
    { chapter: 2, page: 2 },
    { chapter: 2, page: 3 },
    { chapter: 2, page: 4 },
    { chapter: 2, page: 5 },
    { chapter: 2, page: 6 },
    { chapter: 2, page: 7 },
];

const pgData = pageMeta.map(function (meta, idx) {
    const pageNumber = idx + 1;
    const isTitle = meta.kind === "title";
    const title = isTitle
        ? `Chapter ${meta.chapter}: Title Page`
        : `Chapter ${meta.chapter}: Page ${meta.page}`;
    const altText = isTitle
        ? `Jack the Lantern Boy — Chapter ${meta.chapter} title page`
        : `Jack the Lantern Boy — Chapter ${meta.chapter}, Page ${meta.page}`;
    const dateTuple = pageDates[idx] || [2026, 5, 29];
    return {
        pgNum: pageNumber, // global reader index shown in archive (1–17)
        title: title,
        date: writeDate(dateTuple[0], dateTuple[1], dateTuple[2]),
        altText: altText,
        imageFiles: 1,
        authorNotes: pageNumber === 1
            ? `<p>Welcome to <strong>Jack the Lantern Boy</strong>! Chapter 1 starts here.</p>`
            : "",
    };
});

// ---- helpers (no need to edit) ----
function findGetParameter(parameterName) {
    let result = null, tmp = [];
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function writeDate(year, month, day) {
    return new Date(year, month - 1, day).toDateString().toString().slice(4);
}

// Build reader URLs that work from index.html and archive.html (including file:// previews).
function comicPageUrl(page) {
    var base = (typeof indexPage !== "undefined" && indexPage) ? indexPage : "index.html";
    return base + "?pg=" + page + navScrollTo;
}
