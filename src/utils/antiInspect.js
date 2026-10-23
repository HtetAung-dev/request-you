/**
 * Security utility to prevent DevTools inspection and right-click menus
 */

export function initAntiInspect(onBlockedAttempt) {
  // Prevent Right-Click Context Menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBlockedAttempt) {
      onBlockedAttempt('right-click');
    }
    return false;
  };

  // Prevent Keyboard Shortcuts (Inspect, View Source, DevTools)
  const handleKeyDown = (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    const key = e.key.toLowerCase();

    // F12 key
    if (e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('F12');
      return false;
    }

    // Ctrl + Shift + I or Cmd + Option + I
    if ((cmdOrCtrl && e.shiftKey && key === 'i') || (isMac && e.metaKey && e.altKey && key === 'i')) {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('inspect-i');
      return false;
    }

    // Ctrl + Alt + I
    if (e.ctrlKey && e.altKey && key === 'i') {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('ctrl-alt-i');
      return false;
    }

    // Ctrl + Shift + J or Cmd + Option + J (Console)
    if ((cmdOrCtrl && e.shiftKey && key === 'j') || (isMac && e.metaKey && e.altKey && key === 'j')) {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('console-j');
      return false;
    }

    // Ctrl + Shift + C or Cmd + Option + C (Inspect Element)
    if ((cmdOrCtrl && e.shiftKey && key === 'c') || (isMac && e.metaKey && e.altKey && key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('element-c');
      return false;
    }

    // Ctrl + U or Cmd + Option + U (View Source)
    if ((cmdOrCtrl && key === 'u') || (isMac && e.metaKey && e.altKey && key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('view-source');
      return false;
    }

    // Ctrl + S or Cmd + S (Save Page)
    if (cmdOrCtrl && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      if (onBlockedAttempt) onBlockedAttempt('save-page');
      return false;
    }
  };

  window.addEventListener('contextmenu', handleContextMenu, { capture: true });
  window.addEventListener('keydown', handleKeyDown, { capture: true });

  // Cleanup function
  return () => {
    window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
  };
}
