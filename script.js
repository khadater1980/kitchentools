(function () {
  var btn  = document.getElementById('darkToggle');
  var html = document.documentElement;

  // Apply saved preference on load
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', function () {
    html.classList.toggle('dark');
    var isDark = html.classList.contains('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Animate score bars on scroll into view
  var bars = document.querySelectorAll('.score-bar-fill');
  if ('IntersectionObserver' in window && bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = el.dataset.width;
          barObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    bars.forEach(function (bar) {
      var target = bar.dataset.width || '80%';
      bar.style.width = '0%';
      barObserver.observe(bar);
    });
  } else {
    bars.forEach(function (bar) {
      bar.style.width = bar.dataset.width || '80%';
    });
  }
})();
