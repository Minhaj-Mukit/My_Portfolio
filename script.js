// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function anim() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(anim);
})();
document.querySelectorAll('a,button,.skill-card,.project-card,.ref-card,.chip').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '10px'; cursor.style.height = '10px'; });
});

// Scroll reveal + skill bar animation
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            const fill = e.target.querySelector('.skill-fill');
            if (fill) {
                const lvl = e.target.dataset.level || 70;
                setTimeout(() => { fill.style.width = lvl + '%'; }, 200);
            }
            obs.unobserve(e.target);
        }
    });
}, { threshold: .12 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

// Hero parallax glow
const glow = document.querySelector('.hero-glow');
document.addEventListener('mousemove', e => {
    if (!glow) return;
    const x = (e.clientX / window.innerWidth - .5) * 25;
    const y = (e.clientY / window.innerHeight - .5) * 25;
    glow.style.transform = `translate(${x}px,${y}px)`;
});
