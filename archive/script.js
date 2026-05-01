/* =========================================
   HEADER
   ========================================= */
function loadHeader() {
  const header = `
  <header>
    <div class="header-container">
      <a href="/index.html" class="logo">GettLeads</a>
      <nav>
        <ul class="nav-links">

          <li class="dropdown">
            <a href="#" class="nav-item">Datasets
              <svg class="icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
            </a>
          </li>

          <li class="dropdown">
            <a href="#" class="nav-item">Data APIs
              <svg class="icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
            </a>
          </li>

          <li class="dropdown">
            <a href="#" class="nav-item">Solutions
              <svg class="icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
            </a>
            <div class="dropdown-menu">
              <a href="/solutions/lead-generation.html" class="dropdown-item">
                <span class="dropdown-item-title">Lead Generation</span>
                <span class="dropdown-item-desc">Sales, Marketing, and Recruitment</span>
              </a>
              <a href="/solutions/social-media.html" class="dropdown-item">
                <span class="dropdown-item-title">Social Media</span>
                <span class="dropdown-item-desc">Manage and grow your social media presence</span>
              </a>
              <a href="/solutions/recruiters.html" class="dropdown-item">
                <span class="dropdown-item-title">Recruiters</span>
                <span class="dropdown-item-desc">Find top talent faster</span>
              </a>
              <a href="/solutions/customer-onboarding.html" class="dropdown-item">
                <span class="dropdown-item-title">Customer Onboarding</span>
                <span class="dropdown-item-desc">Enrich and verify customer data</span>
              </a>
            </div>
          </li>

          <li class="dropdown">
            <a href="#" class="nav-item">Resources
              <svg class="icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
            </a>
            <div class="dropdown-menu">
              <a href="documentation.html" class="dropdown-item">
                <span class="dropdown-item-title">Documentation</span>
                <span class="dropdown-item-desc">API docs and guides</span>
              </a>
              <a href="blog.html" class="dropdown-item">
                <span class="dropdown-item-title">Blog</span>
                <span class="dropdown-item-desc">Latest insights and tips</span>
              </a>
              <a href="case-studies.html" class="dropdown-item">
                <span class="dropdown-item-title">Case Studies</span>
                <span class="dropdown-item-desc">Success stories</span>
              </a>
              <a href="gettleads-vs-competitors.html" class="dropdown-item">
                <span class="dropdown-item-title">GettLeads vs. Competitors</span>
                <span class="dropdown-item-desc">See how we compare</span>
              </a>
            </div>
          </li>

          <li class="dropdown">
            <a href="#" class="nav-item">Pricing
              <svg class="icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
            </a>
            <div class="dropdown-menu">
              <a href="starter-plan.html" class="dropdown-item">
                <span class="dropdown-item-title">Starter Plan</span>
                <span class="dropdown-item-desc">Perfect for individuals</span>
              </a>
              <a href="professional-plan.html" class="dropdown-item">
                <span class="dropdown-item-title">Professional Plan</span>
                <span class="dropdown-item-desc">For growing teams</span>
              </a>
              <a href="enterprise-plan.html" class="dropdown-item">
                <span class="dropdown-item-title">Enterprise Plan</span>
                <span class="dropdown-item-desc">Custom solutions</span>
              </a>
              <a href="api-pricing.html" class="dropdown-item">
                <span class="dropdown-item-title">API Pricing</span>
                <span class="dropdown-item-desc">Pay-per-use pricing</span>
              </a>
            </div>
          </li>

        </ul>
      </nav>
      <div class="nav-actions">
        <a href="#" class="login">Login</a>
        <button class="btn btn-secondary">Schedule a Demo</button>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </header>`;

  document.getElementById('header-placeholder').outerHTML = header;
}

/* =========================================
   FOOTER
   ========================================= */
function loadFooter() {
  fetch('../footer.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('footer-placeholder').outerHTML = html;

      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
            }
          });
        }, { threshold: 0.2 });

        const left   = document.querySelector('.footer-bottom-left');
        const center = document.querySelector('.footer-bottom-center');
        const right  = document.querySelector('.footer-bottom-right');

        if (left)   observer.observe(left);
        if (center) observer.observe(center);
        if (right)  observer.observe(right);
      }, 0);
    })
    .catch(err => console.warn('Footer failed to load:', err));
}

/* =========================================
   PLATFORM ACCORDION (Social Listening)
   ========================================= */

// ===== DATA MAP — defined first, used below =====
const dataMap = {
  linkedin:  "data/linkedin.json",
  X      :   "data/X.json",
  instagram: "data/instagram.json",
  facebook:  "data/facebook.json",
  youtube:   "data/youtube.json",
  reddit:    "data/reddit.json",
  tiktok:    "data/tiktok.json"
};

// ===== JSON VIEWER — declared once, used consistently =====
const jsonViewer = document.getElementById('jsonViewer');

// ===== ACCORDION =====
document.querySelectorAll('.platform-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.sidebar-card');
    const isOpen = card.classList.contains('open');

    // Close all
    document.querySelectorAll('.sidebar-card').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.platform-toggle')?.setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked card
    if (!isOpen) {
      card.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== ENDPOINT CLICK — event delegation =====
const sidebar = document.querySelector('.sidebar');

if (!sidebar) {
  console.warn('Sidebar not found — skipping endpoint listener');
} else {
  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.platform-body li');
    if (!item) return;

    const platform = item.dataset.platform;
    const type     = item.dataset.type;
    const filePath = dataMap[platform];

    if (!filePath) {
      jsonViewer.textContent = 'No data available';
      return;
    }

    // Show loading state while fetching
    jsonViewer.textContent = 'Loading...';

    fetch(filePath)
      .then(res => res.json())
      .then(platformData => {
        const data = platformData[type];
        jsonViewer.textContent = data
          ? JSON.stringify(data, null, 2)
          : 'No data available';
      })
      .catch(() => {
        jsonViewer.textContent = 'Error loading data';
      });
  });
}

/* =========================================
   IMPORT + SOCIAL CTA BUTTONS
   ========================================= */
document.querySelectorAll('.import-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('Coming Soon');
  });
});

/* =========================================
   TAB SWITCHER — Lead Generation section
   ========================================= */
function initLeadTabs() {
  const section = document.querySelector('.st-use-cases.lead-generation');
  if (!section) return;

  const tabs    = section.querySelectorAll('.st-tab');
  const cards   = section.querySelectorAll('.st-cards');
  const subtext = section.querySelector('.st-subtext');

  const texts = [
    "Everything your sales team needs to identify and convert prospects.",
    "Marketing campaigns, targeting, and lead nurturing strategies.",
    "Recruitment and hiring insights for finding top talent."
  ];

  tabs.forEach((tab, index) => {
    tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');

    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      cards.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.focus();

      if (cards[index]) cards[index].classList.add('active');
      if (subtext && texts[index]) subtext.textContent = texts[index];
    });

    tab.addEventListener('keydown', (e) => {
      let newIndex = index;
      if (e.key === 'ArrowRight') {
        newIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        newIndex = (index - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }
      tabs[newIndex].click();
    });
  });
}

/* =========================================
   TAB SWITCHER — Social Listening section
   ========================================= */
function initSocialTabs() {
  const section = document.querySelector('.st-use-cases.solutions-social-section');
  if (!section) return;

  const tabs    = section.querySelectorAll('.st-tab');
  const cards   = section.querySelectorAll('.st-cards');
  const subtext = section.querySelector('.st-subtext');

  const texts = [
    "Extract LinkedIn profiles, company data, posts, and professional networking information.",
    "Scrape X (Twitter) posts, profiles, hashtags, and real-time conversations.",
    "Scrape Facebook pages, groups, posts, and engagement data at scale.",
    "Collect Instagram profiles, posts, reels, and audience insights.",
    "Extract YouTube videos, channels, comments, and engagement metrics.",
    "Scrape TikTok profiles, videos, and trending content insights.",
    "Extract Reddit posts, subreddits, comments, and discussions."
  ];

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t  => t.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      if (cards[index]) cards[index].classList.add('active');
      if (subtext && texts[index] !== undefined) subtext.textContent = texts[index];
    });
  });
}

/* =========================================
   TAB SWITCHER — Lookup section
   ========================================= */
function initLookupTabs() {
  const section = document.querySelector('.lookup-section');
  if (!section) return;

  const tabs    = section.querySelectorAll('.st-tab');
  const cards   = section.querySelectorAll('.st-cards');
  const subtext = section.querySelector('.st-subtext');

  const texts = [
    "Identify owners, carriers, locations, and detailed information from phone numbers.",
    "Verify emails, enrich profiles, and detect risks using advanced email intelligence.",
    "Analyze IP addresses to get location, ISP details, and detect VPNs or proxies."
  ];

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t  => t.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      if (cards[index]) cards[index].classList.add('active');
      if (subtext && texts[index] !== undefined) subtext.textContent = texts[index];
    });
  });
}

/* =========================================
   INIT — single DOMContentLoaded
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
  loadHeader();
  loadFooter();
  initLeadTabs();
  initSocialTabs();
  initLookupTabs();

  // Word rotator — Lead Generation page
  const leadWord = document.getElementById('lead-word');
  if (leadWord) {
    const leadWords = ['Sales', 'Marketing', 'Recruitment'];
    let leadIndex = 0;
    setInterval(() => {
      leadIndex = (leadIndex + 1) % leadWords.length;
      leadWord.textContent = leadWords[leadIndex];
    }, 2000);
  }

  // Word rotator — Social Media page
  const socialWord = document.getElementById('word');
  if (socialWord) {
    const socialWords = ['LinkedIn', 'Facebook', 'Instagram', 'X', 'Youtube', 'Reddit', 'TikTok'];
    let socialIndex = 0;
    setInterval(() => {
      socialIndex = (socialIndex + 1) % socialWords.length;
      socialWord.textContent = socialWords[socialIndex];
    }, 2000);
  }
});

/* =========================================
   SCROLL TRACK CLONER
   ========================================= */
window.addEventListener('load', function () {
  const track = document.querySelector('.scroll-track');
  if (!track) return;

  const content = track.children[0];
  const contentWidth = content.offsetWidth;
  let totalWidth = track.scrollWidth;

  while (totalWidth < window.innerWidth * 2) {
    const clone = content.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
    totalWidth += contentWidth;
  }
});