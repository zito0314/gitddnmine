if (!window.GitddnComponents) {
  function closeFloatingMenus(exceptId) {
    ['orgMenu', 'createMenu'].forEach((id) => {
      if (id !== exceptId) document.getElementById(id)?.classList.remove('open');
    });
  }

  function toggleOrgMenu() {
    closeFloatingMenus('orgMenu');
    document.getElementById('orgMenu')?.classList.toggle('open');
  }

  function toggleCreateMenu() {
    closeFloatingMenus('createMenu');
    document.getElementById('createMenu')?.classList.toggle('open');
  }

  function selectMode(button, modeName) {
    closeFloatingMenus();
    button.closest('.mode-toggle')?.querySelectorAll('.mode-option').forEach((option) => {
      option.classList.toggle('active', option === button);
    });
    showToast(`${modeName} 모드로 전환했습니다.`);
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    const isMenuButton = target.closest('.org-switch, .mode-toggle, .primary-button, .create-menu, .org-menu');
    if (!isMenuButton) closeFloatingMenus();
  });
}
