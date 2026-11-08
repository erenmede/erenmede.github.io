(function () {
  var root = document.documentElement;
  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  root.classList.add('js');

  var contrast = get('em-contrast');
  if (!contrast) {
    contrast = (window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) ? 'high' : 'normal';
  }
  root.setAttribute('data-contrast', contrast);
  root.setAttribute('data-size', get('em-size') || '100');

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('contrast-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', root.getAttribute('data-contrast') === 'high' ? 'true' : 'false');
      toggle.addEventListener('click', function () {
        var next = root.getAttribute('data-contrast') === 'high' ? 'normal' : 'high';
        root.setAttribute('data-contrast', next);
        toggle.setAttribute('aria-pressed', next === 'high' ? 'true' : 'false');
        put('em-contrast', next);
      });
    }

    var sizeButtons = document.querySelectorAll('[data-size-btn]');
    function markSize() {
      var cur = root.getAttribute('data-size') || '100';
      sizeButtons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-size-btn') === cur ? 'true' : 'false');
      });
    }
    sizeButtons.forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-size-btn');
        root.setAttribute('data-size', v);
        put('em-size', v);
        markSize();
      });
    });
    markSize();
  });
})();
