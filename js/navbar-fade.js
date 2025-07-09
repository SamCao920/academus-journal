// Sticky navbar fade effect on scroll

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleNavbarFade() {
        // Change at 40px scroll, adjust as needed
        if (window.scrollY > 40) {
            navbar.classList.add('faded');
        } else {
            navbar.classList.remove('faded');
        }
    }

    window.addEventListener('scroll', handleNavbarFade, { passive: true });
    handleNavbarFade(); // Init on page load
});
