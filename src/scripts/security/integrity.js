export function initIntegrity() {
  const msg = 'DOM INTEGRITY VIOLATION — Unauthorized modification detected';

  new MutationObserver(mutations =>
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === 1 && ['Ν0', 'α', 'Δ'].includes(node.id)) {
            console.error(msg);
          }
        });
      }
    })
  ).observe(document.body, { childList: true, subtree: true });
}
