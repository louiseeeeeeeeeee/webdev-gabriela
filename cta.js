
// This is for CTA scroll animation effect. Kapag nagscroll to the CTA section, mag-aadd ng 'in-view' class.
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.cta-content');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px'
    });

    targets.forEach(t => io.observe(t));
});
