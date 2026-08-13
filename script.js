// Sets the footer year automatically — no need to update it by hand.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===========================================================
// JOB OPENINGS — pulled live from a published Google Sheet
// ===========================================================
const JOBS_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vST6irfaXdhFu_kulGNv736hxrOGQw1JePywIqZ620iaQRBUPr1x-wwhJfB8jQDEuqEJKTbwK6cVYrI/pub?output=csv";

const jobsGrid = document.getElementById("jobs-grid");

function renderJobs(rows) {
  if (!jobsGrid) return;
  jobsGrid.innerHTML = "";

  // Filters out empty rows or rows without a Title
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
  if (!jobsGrid) return;

  // Only block if URL is completely empty
  if (!JOBS_SHEET_CSV_URL) {
    jobsGrid.innerHTML = '<p class="jobs-status">Job openings will appear here once the Google Sheet is connected.</p>';
    return;
  }

  // Parse CSV data directly into objects using headers
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
// ==================================================
// CONTACT FORM - hands off to a pre-filled Google form
// ==================================================
const GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf5gAAPsRra6njUIDEaG_3bB-TUGDZ4Ur6ef0njVLeGuwm5pQ/viewform";
const NAME_ENTRY_ID = "entry.1287623871";
const EMAIL_ENTRY_ID = "entry.693571926";
const contactForm = document.getElementByID("hr-contact-form");

if (contactForm) {
  contactForm.addEventListener("submit" ,(e) => {
    e.preventDefault();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value;

    const params = new URLSearchParams();
    params.set(NAME_ENTRY_ID, name);
    params.set(EMAIL_ENTRY_ID, email);

    const prefilledUrl = `${GOOGLE_FORM_BASE_URL}?usp=pp_url&{params.toString()}`;
    window.open(prefilledUrl, "_blank" , "noopener");
  });
}
    

                               
