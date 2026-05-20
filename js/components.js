(function initGitddnComponents() {
  const dropdownIds = ['orgMenu', 'createMenu'];
  let toastTimer;

  function findTarget(target) {
    if (!target) return null;
    if (target.startsWith('#')) return document.querySelector(target);
    return document.getElementById(target);
  }

  function closeDropdowns(exceptId) {
    document.querySelectorAll('[data-dropdown-menu], .org-menu, .create-menu, .file-action-menu').forEach((menu) => {
      if (exceptId && menu.id === exceptId) return;
      menu.classList.remove('open');
    });
  }

  function toggleDropdown(targetId) {
    const menu = findTarget(targetId);
    if (!menu) return;
    const willOpen = !menu.classList.contains('open');
    closeDropdowns(menu.id);
    menu.classList.toggle('open', willOpen);
  }

  function showToast(message, options = {}) {
    const toast = document.getElementById('toast') || createToast();
    if (!toast) return;
    toast.textContent = message || '완료';
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, options.duration || 1800);
  }

  function createToast() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    return toast;
  }

  function setButtonGroupActive(button, selector) {
    const scope = button.closest('[data-tabs], .pill-tabs, .status-tabs, .tabs, .mode-toggle') || button.parentElement;
    scope?.querySelectorAll(selector).forEach((item) => {
      item.classList.toggle('active', item === button);
      if (item.matches('[role="tab"]')) item.setAttribute('aria-selected', String(item === button));
    });
  }

  function setTab(tabName, options = {}) {
    const buttonSelector = options.buttonSelector || `[data-tab="${tabName}"], [data-view="${tabName}"]`;
    const contentSelector = options.contentSelector || '.tab-content, [data-tab-panel], .repo-view';
    const activeButton = options.button || document.querySelector(buttonSelector);

    if (activeButton) {
      const scope = activeButton.closest('[data-tabs], .tabs, .repo-nav-list, .gnb-section') || document;
      scope.querySelectorAll('[data-tab], [data-view], .tab-button, .repo-nav').forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle('active', isActive);
        if (button.matches('[role="tab"]')) button.setAttribute('aria-selected', String(isActive));
      });
    }

    document.querySelectorAll(contentSelector).forEach((panel) => {
      const panelKey = panel.dataset.tabPanel || panel.dataset.view || panel.id?.replace(/^tab-/, '');
      panel.classList.toggle('active', panelKey === tabName || panel.id === `tab-${tabName}`);
    });
  }

  function openModal(targetId) {
    const modal = findTarget(targetId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('input, select, textarea, button')?.focus();
  }

  function closeModal(targetId) {
    const modal = targetId ? findTarget(targetId) : document.querySelector('.modal.open, [data-modal].open');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const fieldWrap = field.closest('.field') || field.parentElement;
      const invalid = !String(field.value || '').trim();
      field.classList.toggle('is-invalid', invalid);
      fieldWrap?.classList.toggle('has-error', invalid);
      if (invalid) isValid = false;
    });
    if (!isValid) showToast('필수 입력 항목을 확인해 주세요.');
    return isValid;
  }

  function handleAction(event) {
    const action = event.target.closest('[data-action]');
    if (!action) return;

    const actionName = action.dataset.action;
    if (actionName === 'toast') {
      event.preventDefault();
      showToast(action.dataset.message);
    }
    if (actionName === 'navigate') {
      event.preventDefault();
      window.location.href = action.dataset.href;
    }
    if (actionName === 'dropdown') {
      event.preventDefault();
      toggleDropdown(action.dataset.target);
    }
    if (actionName === 'organization') {
      event.preventDefault();
      const orgKey = action.dataset.orgKey || 'digital-banking';
      window.localStorage?.setItem('gitddn:organization', orgKey);
      window.dispatchEvent(new CustomEvent('gitddn:organization-change', { detail: { orgKey } }));
      closeDropdowns();
      window.location.reload();
    }
    if (actionName === 'modal-open') {
      event.preventDefault();
      openModal(action.dataset.target);
    }
    if (actionName === 'modal-close') {
      event.preventDefault();
      closeModal(action.dataset.target);
    }
  }

  document.addEventListener('click', (event) => {
    handleAction(event);

    const tabButton = event.target.closest('[data-component-tab]');
    if (tabButton) {
      event.preventDefault();
      setButtonGroupActive(tabButton, '[data-component-tab]');
      const panelTarget = tabButton.dataset.target;
      if (panelTarget) setTab(panelTarget, { button: tabButton });
    }

    if (!event.target.closest('[data-dropdown], [data-dropdown-menu], .org-switch, .create-wrapper, .file-action-group, .file-action-menu')) {
      closeDropdowns();
    }

    if (event.target.matches('[data-modal]')) closeModal(`#${event.target.id}`);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      closeModal();
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-validate]');
    if (form && !event.defaultPrevented && !validateForm(form)) event.preventDefault();
  });

  window.GitddnComponents = {
    closeDropdowns,
    toggleDropdown,
    showToast,
    setTab,
    openModal,
    closeModal,
    validateForm
  };

  window.showToast = showToast;
  window.closeFloatingMenus = closeDropdowns;
  window.toggleOrgMenu = () => toggleDropdown('orgMenu');
  window.toggleCreateMenu = () => toggleDropdown('createMenu');
  window.selectMode = (button, modeName) => {
    closeDropdowns();
    setButtonGroupActive(button, '.mode-option');
    showToast(`${modeName} 모드로 전환했습니다.`);
  };

  window.addEventListener('DOMContentLoaded', () => {
    dropdownIds.forEach((id) => {
      document.getElementById(id)?.setAttribute('data-dropdown-menu', '');
    });
  });
})();
