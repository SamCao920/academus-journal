export function initPageTransitions() {
    const body = document.body;
    // Trigger fade-in on load
    body.classList.remove('loading');
    body.classList.add('loaded');

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#') || href.includes('index.html')) {
            return;
        }
        if (!href.endsWith('.html') && href.indexOf('.html?') === -1) {
            return;
        }
        e.preventDefault();
        body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
}
