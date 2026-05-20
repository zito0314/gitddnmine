(function(){
  window.GitddnRender = window.GitddnRender || {};
  const R = window.GitddnRender;
  R.h = (v) => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  R.chip = (label, cls='') => `<span class="chip ${cls}">${R.h(label)}</span>`;
  R.status = (key) => (window.GITDDN_MOCK?.common?.status || {})[key] || {label:key, chip:''};
  R.setOptions = (select, values, placeholder) => {
    if(!select || !values) return;
    select.innerHTML = `${placeholder ? `<option value="">${R.h(placeholder)}</option>` : ''}${values.map(v => typeof v === 'string' ? `<option value="${R.h(v)}">${R.h(v)}</option>` : `<option value="${R.h(v.value)}">${R.h(v.label)}</option>`).join('')}`;
  };
})();

(function(){
  const R = window.GitddnRender;
  const data = () => window.GITDDN_MOCK?.dashboard || {};

  function goExpression(item) {
    if (item.href && item.href !== '#deployment') return `location.href='${R.h(item.href)}'`;
    return `showToast('${R.h(item.toast || 'Deployment Transfer 화면은 다음 단계에서 연결됩니다.')}')`;
  }

  function renderSummary() {
    const grid = document.querySelector('.work-summary-grid');
    const cards = data().summaryCards || [];
    if (!grid || !cards.length) return;

    grid.innerHTML = cards.map((card) => `
      <button class="work-summary-card ${R.h(card.tone || '')}" type="button" onclick="${goExpression(card)}">
        <strong>${R.h(card.title)}</strong>
        <b>${R.h(card.value)}</b>
        <span>${R.h(card.note)}</span>
      </button>
    `).join('');
  }

  function renderDots(item) {
    const done = Number(item.done || 0);
    const total = Number(item.total || 0);
    return Array.from({ length: total }, (_, index) => `<span${index < done ? ' class="done"' : ''}></span>`).join('');
  }

  function renderNextUp() {
    const list = document.getElementById('nextList');
    const items = data().nextUp || [];
    if (!list || !items.length) return;

    list.innerHTML = items.map((item) => `
      <div class="next-item" data-filter="${R.h(item.filters || '')}">
        <div class="next-main">
          <div class="next-title-line">
            <span class="priority-badge ${R.h(item.tone || '')}">${R.h(item.priority)}</span>
            <strong>${R.h(item.title)}</strong>
          </div>
          <div class="next-meta">${R.h(item.meta)}</div>
          <div class="policy-state">
            <span class="policy-label">${R.h(item.condition)}</span>
            <span class="policy-dots ${R.h(item.tone || '')}">${renderDots(item)}</span>
          </div>
        </div>
        <button class="${item.actionType === 'primary' ? 'primary-button' : 'secondary-button'} next-action" type="button" onclick="${goExpression(item)}">${R.h(item.actionLabel)}</button>
      </div>
    `).join('');
  }

  function renderRepositories() {
    const list = document.querySelector('.repo-work-list');
    const repos = data().repositories || [];
    if (!list || !repos.length) return;

    list.innerHTML = repos.map((repo) => `
      <a class="repo-work-item" href="${R.h(repo.href)}">
        <strong>${R.h(repo.name)}</strong>
        <div class="mini-chip-row">
          ${(repo.chips || []).map((chip) => `<span class="mini-chip ${R.h(chip.tone || '')}">${R.h(chip.label)}</span>`).join('')}
        </div>
        <small>${R.h(repo.updatedAt)}</small>
      </a>
    `).join('');
  }

  function renderRecent() {
    const list = document.querySelector('.recent-list');
    const items = data().recent || [];
    if (!list || !items.length) return;

    list.innerHTML = items.map((item) => `
      <a class="recent-item" href="${R.h(item.href)}">
        <strong>${R.h(item.title)}</strong>
        <small>${R.h(item.meta)}</small>
      </a>
    `).join('');
  }

  function renderActivity() {
    const list = document.getElementById('activityList');
    const items = data().activity || [];
    if (!list || !items.length) return;

    list.innerHTML = items.map((item) => `
      <div class="activity-log-item" data-filter="${R.h(item.filter)}">
        <span class="activity-type ${R.h(item.tone || '')}">${R.h(item.type)}</span>
        <div>
          <strong>${R.h(item.title)}</strong>
          <small>${R.h(item.meta)}</small>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.page-dashboard-home')) return;
    renderSummary();
    renderNextUp();
    renderRepositories();
    renderRecent();
    renderActivity();
  });
})();
