export function initSecurity() {
  const _c = window.console;
  const warnMsg = '[OBELISK-Z // SENTINEL] Unauthorized inspection detected. Incident logged.';
  const cipherMsg = '[OBELISK-Z // CIPHER] All DOM mutations and console interactions are recorded.';
  const aegisMsg = '[OBELISK-Z // AEGIS] Source analysis attempts are flagged and timestamped.';
  const overlayTitle = 'SECURITY PERIMETER BREACH';
  const overlayBody = 'Inspection tools detected. This session has been flagged and timestamped. All interactions within this environment are monitored under OBELISK-Z security protocol.';
  const overlayRef = 'INCIDENT REFERENCE: SEC-';
  const sessionId = 'OZ-0RNC-EMLY-VQP1-CX48-YVQ2';
  const baseSeed = 480723;
  let triggered = false;

  ['log', 'warn', 'error', 'info', 'debug', 'dir', 'table'].forEach(method => {
    const original = _c[method].bind(_c);
    _c[method] = function () {
      if (!triggered) {
        triggered = true;
        original.call(_c, '%c' + warnMsg, 'color:#ff4444;font-weight:bold;font-family:monospace;font-size:12px');
        original.call(_c, '%c' + cipherMsg, 'color:#b84fff;font-family:monospace;font-size:11px');
        original.call(_c, '%cSESSION: ' + sessionId, 'color:#333;font-family:monospace;font-size:10px');
        original.call(_c, '%cTIMESTAMP: ' + new Date().toISOString(), 'color:#222;font-family:monospace;font-size:10px');
      }
      original.apply(_c, arguments);
    };
  });

  _c.clear = () => _c.warn(aegisMsg);

  function showOverlay() {
    const overlay = document.getElementById('ΨΔ');
    if (!overlay) return;
    document.getElementById('ΨΔt').textContent = overlayTitle;
    document.getElementById('ΨΔb').textContent = overlayBody;
    document.getElementById('ΨΔr').textContent = overlayRef + Math.floor(baseSeed * (Math.random() * 9 + 1));
    overlay.classList.add('Χ');
    triggered = true;
  }

  function hideOverlay() {
    document.getElementById('ΨΔ')?.classList.remove('Χ');
  }

  setInterval(() => {
    (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160)
      ? showOverlay()
      : hideOverlay();
  }, 800);

  setInterval(() => {
    const t = performance.now();
    // eslint-disable-next-line no-debugger
    debugger;
    if (performance.now() - t > 100) showOverlay();
  }, 3000);

  document.addEventListener('keydown', e => {
    if (
      ['F12', 'F11', 'F8'].includes(e.key) ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      showOverlay();
    }
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
}
