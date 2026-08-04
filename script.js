// Sets the footer year automatically — no need to update it by hand.
document.getElementById("year").textContent = new Date().getFullYear();

// ===========================================================
// JOB OPENINGS — pulled live from a published Google Sheet
// ===========================================================
// 1. Make a Sheet with columns: Title | Tag | Description | ApplyLink
// 2. File → Share → Publish to web → pick the sheet tab → format: CSV → Publish
// 3. Paste that published URL below, replacing the placeholder.
const JOBS_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vST6irfaXdhFu_kulGNv736hxrOGQw1JePywIqZ620iaQRBUPr1x-wwhJfB8jQDEuqEJKTbwK6cVYrI/pub?output=csv";

const jobsGrid = document.getElementById("jobs-grid");

function renderJobs(rows) {
  jobsGrid.innerHTML = "";
git log --oneline -3
  const jobs = rows.filter(row => row.Title && row.Title.trim() !== "");

  if (jobs.length === 0) {
    jobsGrid.innerHTML = '<p class="jobs-status">No open roles right now — check back soon.</p>';
    return;
  }

  jobs.forEach(job => {
    const card = document.createElement("a");
    card.className = "pin-card";
    card.href = job.ApplyLink || "#";
    card.target = "_blank";
    card.rel = "noopener";

    card.innerHTML = `
      <span class="pin" aria-hidden="true"></span>
      <span class="card-tag">${escapeHtml(job.Tag || "")}</span>
      <h3>${escapeHtml(job.Title || "")}</h3>
      <p>${escapeHtml(job.Description || "")}</p>
      <span class="card-go">View posting →</span>
    `;

    jobsGrid.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function loadJobs() {
  if (!JOBS_SHEET_CSV_URL || JOBS_SHEET_CSV_URL === "https://docs.google.com/spreadsheets/d/e/2PACX-1vST6irfaXdhFu_kulGNv736hxrOGQw1JePywIqZ620iaQRBUPr1x-wwhJfB8jQDEuqEJKTbwK6cVYrI/pub?output=csv") {
    jobsGrid.innerHTML = '<p class="jobs-status">Job openings will appear here once the Google Sheet is connected — see README.</p>';
    return;
  }

  Papa.parse(JOBS_SHEET_CSV_URL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results) => renderJobs(results.data),
    error: () => {
      jobsGrid.innerHTML = '<p class="jobs-status">Couldn\'t load openings right now. Try refreshing the page.</p>';
    }
  });
}

loadJobs();
