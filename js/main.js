if (!window.showToast) {
  window.showToast = function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 1800);
  };
}
