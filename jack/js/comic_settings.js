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

// REALLY IMPORTANT ONE:
// maxpg = how many pages the comic currently has. UPDATE THIS each time you post a new page,
// and drop the matching image into img/comics/ (named pg1.png, pg2.png, …).
const maxpg = 1;

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

if (pg == 0) { pg = maxpg; } // load the MOST RECENT page by default

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
const pgData = [
    {
        pgNum: 1,
        title: "Chapter 1: Page 1",
        date: writeDate(2026, 5, 29),
        altText: "Jack the Lantern Boy — Chapter 1, Page 1",
        imageFiles: 1,
        authorNotes: `
            <p>Welcome to <strong>Jack the Lantern Boy</strong>! Chapter 1 starts here.</p>
            <p>(You can delete or edit this note in <code>js/comic_settings.js</code>.)</p>
        `,
    },
    // Add Chapter 1 pages 2, 3, … here as you post them.
];

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
