export function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('Χ');
    }),
    { threshold: 0.1 }
  );

  document.querySelectorAll('.Rv, .RvL, .RvR').forEach(el =>
    observer.observe(el)
  );
}
