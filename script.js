// Unico script della pagina: pulsanti "Copia" per i codici SHA-256. Nessun tracciamento, nessuna richiesta di rete.
(function () {
  'use strict';

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function feedback(btn, ok) {
    var label = btn.querySelector('span');
    var original = label.textContent;
    label.textContent = ok ? 'Copiato' : 'Seleziona e copia';
    btn.classList.toggle('done', ok);
    setTimeout(function () {
      label.textContent = original;
      btn.classList.remove('done');
    }, 1800);
  }

  var buttons = document.querySelectorAll('button[data-copy]');
  Array.prototype.forEach.call(buttons, function (btn) {
    var target = document.getElementById(btn.getAttribute('data-copy'));
    if (!target) return;
    var text = target.textContent.trim();
    if (!/^[0-9A-Fa-f]{64}$/.test(text)) return; // codice non ancora generato
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () { feedback(btn, true); },
          function () { feedback(btn, fallbackCopy(text)); }
        );
      } else {
        feedback(btn, fallbackCopy(text));
      }
    });
  });
})();
