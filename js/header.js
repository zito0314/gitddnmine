(function renderAppHeader() {
  const mount = document.getElementById('appHeader');
  if (!mount) return;

  const isPageFile = window.location.pathname.includes('/pages/');
  const pageUrl = (fileName) => isPageFile ? `./${fileName}` : `./pages/${fileName}`;

  mount.outerHTML = `
    <header class="top-header">
      <div class="header-left">
        <div class="org-switch">
          <button class="org-button" type="button" data-action="dropdown" data-target="orgMenu" data-dropdown>
            <strong>Digital Banking</strong>
            <span>⌄</span>
          </button>
          <div class="org-menu" id="orgMenu" data-dropdown-menu>
            <button type="button">Digital Banking</button>
            <button type="button">Platform Center</button>
            <button type="button">Partner Workspace</button>
          </div>
        </div>
      </div>

      <div class="global-search">
        <span>⌕</span>
        <input type="text" placeholder="Repository, MR, Pipeline, 파일 검색" />
        <kbd>⌘K</kbd>
      </div>

      <div class="header-actions">
        <div class="mode-toggle" role="group" aria-label="서비스 모드 선택">
          <button class="mode-option active" type="button" onclick="selectMode(this, 'gitddn')">gitddn</button>
          <button class="mode-option" type="button" onclick="selectMode(this, 'Admin Console')">Admin Console</button>
        </div>

        <button class="icon-button" type="button" data-action="toast" data-message="알림 목록을 엽니다.">
          🔔
          <span class="notification-dot"></span>
        </button>
        <button class="icon-button" type="button" data-action="toast" data-message="도움말을 엽니다.">?</button>

        <div class="create-wrapper">
          <button class="primary-button" type="button" data-action="dropdown" data-target="createMenu" data-dropdown>+ Create</button>
          <div class="create-menu" id="createMenu" data-dropdown-menu>
            <button type="button" data-action="navigate" data-href="${pageUrl('repository-create.html')}">Repository 생성 요청</button>
            <button type="button" data-action="navigate" data-href="${pageUrl('mr-create.html')}">Create MR</button>
            <button type="button" data-action="toast" data-message="Deployment Transfer 화면은 다음 단계에서 연결됩니다.">Deployment Transfer</button>
          </div>
        </div>

        <button class="profile-button" type="button">
          <span class="avatar">J</span>
          <span class="profile-text">
            <strong>Jito</strong>
            <small>Maintainer</small>
          </span>
        </button>
      </div>
    </header>
  `;
})();
