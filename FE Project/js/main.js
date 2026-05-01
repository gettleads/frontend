document.addEventListener('DOMContentLoaded', function () {

    // ── 0. Entrance animations — IntersectionObserver adds .in-view ──────────
    const animatedEls = document.querySelectorAll(
        '.hero-left, .hero-right, .tagline, .headline, .hero-description, .features-list, .cta-buttons, .trust-indicators'
    );

    const entranceObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entranceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedEls.forEach(function (el) { entranceObserver.observe(el); });

    // ── 1. Nav dropdowns ──────────────────────────────────────────────────────
    const navDropdownItems = document.querySelectorAll('.nav-item-dropdown');
    navDropdownItems.forEach(function (item) {
        const toggle = item.querySelector('.nav-dropdown-toggle');
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = item.classList.contains('open');
            navDropdownItems.forEach(function (i) { i.classList.remove('open'); i.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false'); });
            if (!isOpen) { item.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); }
        });
    });
    document.addEventListener('click', function () {
        navDropdownItems.forEach(function (i) { i.classList.remove('open'); i.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false'); });
    });

    // ── 2. Feature card — click to activate (one active at a time) ───────────
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(function (card) {
        card.addEventListener('click', function () {
            const isActive = this.classList.contains('feature-card-active');
            featureCards.forEach(function (c) { c.classList.remove('feature-card-active'); });
            if (!isActive) this.classList.add('feature-card-active');
        });
    });

    // ── 3. Filter pill removal ────────────────────────────────────────────────
    document.querySelectorAll('.filter-pill .fa-times').forEach(function (icon) {
        icon.addEventListener('click', function () {
            this.closest('.filter-pill').remove();
        });
    });

    const clearAllBtn = document.querySelector('.filter-clear-btn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.filter-pill').forEach(function (pill) {
                pill.remove();
            });
        });
    }

    // ── 4. Watch Demo modal ───────────────────────────────────────────────────
    const modal = document.getElementById('demo-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');

    function openModal() {
        if (modal) modal.classList.add('open');
    }

    function closeModal() {
        if (modal) modal.classList.remove('open');
    }

    document.querySelectorAll('.watch-demo-btn').forEach(function (btn) {
        btn.addEventListener('click', openModal);
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // ── 5. Stats counter animation ────────────────────────────────────────────
    const statEls = document.querySelectorAll('.stat-number[data-count]');

    function animateCounter(el) {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    if (statEls.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statEls.forEach(function (el) { observer.observe(el); });
    }

    // ── 6. Select-all checkbox ────────────────────────────────────────────────
    const selectAllBox = document.querySelector('.contact-table thead input[type="checkbox"]');
    if (selectAllBox) {
        selectAllBox.addEventListener('change', function () {
            document.querySelectorAll('.contact-table tbody input[type="checkbox"]').forEach(function (cb) {
                cb.checked = selectAllBox.checked;
            });
        });

        document.querySelectorAll('.contact-table tbody input[type="checkbox"]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                const all = document.querySelectorAll('.contact-table tbody input[type="checkbox"]');
                const checked = document.querySelectorAll('.contact-table tbody input[type="checkbox"]:checked');
                selectAllBox.checked = all.length === checked.length;
                selectAllBox.indeterminate = checked.length > 0 && checked.length < all.length;
            });
        });
    }

    // ── 7. Actions dropdown (⋮ button) ───────────────────────────────────────
    document.querySelectorAll('.actions-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            document.querySelectorAll('.actions-dropdown.open').forEach(function (d) {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.actions-dropdown.open').forEach(function (d) {
            d.classList.remove('open');
        });
    });

    // ── 8. Active nav link highlight ─────────────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('nav-link-active');
        }
    });

    // ── 9. Billing toggle (pricing page) ─────────────────────────────────────
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        let isAnnual = false;
        billingToggle.addEventListener('click', function () {
            isAnnual = !isAnnual;
            billingToggle.classList.toggle('active', isAnnual);
            document.querySelectorAll('.price-amount[data-monthly]').forEach(function (el) {
                el.textContent = '$' + (isAnnual ? el.dataset.annual : el.dataset.monthly);
            });
        });
    }

    // ── 10. Login page: URL param tab switching ───────────────────────────────
    // ?tab=demo has no panel — fall back to signup
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') === 'demo' ? 'signup' : params.get('tab');

    if (tabParam) {
        const tabBtn = document.querySelector('[data-tab="' + tabParam + '"]');
        if (tabBtn) tabBtn.click();
    }

    // ── 11. Login form validation ─────────────────────────────────────────────
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                showFormError(loginForm, 'Please fill in all fields.');
                return;
            }
            if (!isValidEmail(email)) {
                showFormError(loginForm, 'Please enter a valid email address.');
                return;
            }
            showFormSuccess(loginForm, 'Logging you in…');
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;

            if (!name || !email || !password) {
                showFormError(signupForm, 'Please fill in all fields.');
                return;
            }
            if (!isValidEmail(email)) {
                showFormError(signupForm, 'Please enter a valid email address.');
                return;
            }
            if (password.length < 8) {
                showFormError(signupForm, 'Password must be at least 8 characters.');
                return;
            }
            showFormSuccess(signupForm, 'Account created! Redirecting…');
        });
    }

    // ── Helpers ───────────────────────────────────────────────────────────────
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormError(form, message) {
        clearFormMessages(form);
        const el = document.createElement('p');
        el.className = 'form-message form-error';
        el.textContent = message;
        form.prepend(el);
    }

    function showFormSuccess(form, message) {
        clearFormMessages(form);
        const el = document.createElement('p');
        el.className = 'form-message form-success';
        el.textContent = message;
        form.prepend(el);
    }

    function clearFormMessages(form) {
        form.querySelectorAll('.form-message').forEach(function (el) { el.remove(); });
    }

});
