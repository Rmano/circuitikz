document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

  headings.forEach(h => {
    // Look for explicit label anchor right after heading
    let next = h.nextElementSibling;
    if (!next) return;

    // lwarp usually emits several <a id="..."></a> blocks
    let explicitId = null;

    while (next && next.tagName === "A") {
      const id = next.getAttribute("id");
      if (
        id &&
        !id.startsWith("autosec-") &&
        !id.includes("autopage")
      ) {
        explicitId = id;
        break;
      }
      next = next.nextElementSibling;
    }

    if (!explicitId) return;

    // Create visible permalink icon
    const link = document.createElement("a");
    link.href = "#" + explicitId;
    link.className = "explicit-permalink";
    link.innerHTML = "🔗";   // or "#" if you prefer
    link.style.marginLeft = "0.4em";
    link.style.textDecoration = "none";

    h.appendChild(link);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const homeGrid = document.querySelector(".homepagegrid");
  if (!homeGrid) return; // not the homepage

  // If the homepage already has a sidetoccontainer, do nothing.
  if (homeGrid.querySelector(".sidetoccontainer")) return;

  // Grab the main TOC from the homepage content
  const mainTOC = homeGrid.querySelector("nav.toc");
  if (!mainTOC) return;

  // Turn homepagegrid into pagegrid so your CSS/layout rules apply
  homeGrid.classList.remove("homepagegrid");
  homeGrid.classList.add("pagegrid");

  // Create the same sidebar container structure used on other pages
  const side = document.createElement("div");
  side.className = "sidetoccontainer";

  const nav = document.createElement("nav");
  nav.className = "sidetoc";

  // Optional: title block similar-ish to other pages
  const title = document.createElement("div");
  title.className = "sidetoctitle";
  title.innerHTML = `<p><span class="sidetocthetitle">Contents</span></p>`;

  const contents = document.createElement("div");
  contents.className = "sidetoccontents";

  // Clone the homepage TOC into the sidebar
  contents.appendChild(mainTOC.cloneNode(true));

  nav.appendChild(title);
  nav.appendChild(contents);
  side.appendChild(nav);

  // Insert sidebar before <main>
  const main = homeGrid.querySelector("main.bodycontainer");
  if (main) homeGrid.insertBefore(side, main);

  // Optional: hide the big inline TOC in the main flow (since it’s now in the sidebar)
 //  mainTOC.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  // 1) SET THIS to whatever wraps your left TOC (inspect HTML to confirm)
  // Examples that often work: ".sidetoccontainer", "#sidetoc", "nav.sidetoc"
  const TOC_CONTAINER_SELECTOR = ".sidetoccontainer";

  const toc = document.querySelector(TOC_CONTAINER_SELECTOR);
  if (!toc) return;

  // Collect TOC links that point to anchors on THIS page
  const links = Array.from(toc.querySelectorAll('a[href*="#"]'));
  if (!links.length) return;

  // Map: headingId -> link
  const idToLink = new Map();
  for (const a of links) {
    const href = a.getAttribute("href") || "";
    const hashIndex = href.indexOf("#");
    if (hashIndex < 0) continue;

    const frag = href.slice(hashIndex + 1);
    if (!frag) continue;

    // Only match headings that actually exist on this page
    // lwarp often uses <hN id="autosec-..."> plus separate <a id="sec:...">
    if (document.getElementById(frag)) idToLink.set(frag, a);
  }

  const ids = Array.from(idToLink.keys());
  if (!ids.length) return;

  // Helper: clear/set active class
  const ACTIVE_CLASS = "toc-active";
  function setActive(id) {
    for (const a of idToLink.values()) a.classList.remove(ACTIVE_CLASS);
    const link = idToLink.get(id);
    if (link) link.classList.add(ACTIVE_CLASS);
  }

  // If URL already has a hash, highlight that immediately
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (idToLink.has(id)) setActive(id);
  }

  // Observe headings/anchors entering the viewport
  // Prefer heading elements with these ids if possible
  const targets = ids
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // IntersectionObserver: pick the heading closest to the top
  let lastActive = null;
  const observer = new IntersectionObserver((entries) => {
    // Consider only visible entries
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;

    // Choose the one nearest the top of viewport
    visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    const chosen = visible[0].target.id;

    if (chosen && chosen !== lastActive) {
      lastActive = chosen;
      setActive(chosen);
    }
  }, {
    // This makes “active” switch when heading crosses a line near top
    root: null,
    rootMargin: "-15% 0px -75% 0px",
    threshold: [0, 1.0],
  });

  targets.forEach(t => observer.observe(t));

  // Also update highlight when clicking TOC links / manual hash changes
  window.addEventListener("hashchange", () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (idToLink.has(id)) setActive(id);
  });
});


