(function(){
  window.GitddnRender = window.GitddnRender || {};
  const R = window.GitddnRender;
  R.data = () => window.GITDDN_MOCK || {};
  R.escape = (v='') => String(v ?? '').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  R.status = (keyOrLabel) => {
    const m = R.data();
    const st = (m.common && m.common.status && m.common.status[keyOrLabel]) || null;
    return st || {label:keyOrLabel || '-', chip:''};
  };
  R.param = (name) => new URLSearchParams(window.location.search).get(name);
  R.chip = (label, tone='') => `<span class="chip ${R.escape(tone)}">${R.escape(label)}</span>`;
  R.statusChip = (label, tone='') => `<span class="status-chip ${R.escape(tone)}">${R.escape(label)}</span>`;
})();

(function(){
  const R = window.GitddnRender;
  let currentStatus = 'all';

  function repoUrl(repo){ return `./repository-detail.html?id=${encodeURIComponent(repo.id || repo.name)}`; }
  function row(repo){
    const st = R.status(repo.status);
    const disabled = repo.status !== 'approved';
    const fav = repo.favorite ? 'active' : '';
    const star = repo.favorite ? '★' : '☆';
    const action = repo.status === 'pending'
      ? `<button class="row-action danger" type="button" onclick="event.stopPropagation(); showToast('Repository 생성 요청을 취소했습니다.')">요청 취소</button>`
      : repo.status === 'rejected'
      ? `<button class="row-action" type="button" onclick="event.stopPropagation(); showToast('반려 사유: Repository 명명 규칙과 보안 템플릿을 확인해 주세요.')">반려 사유</button>`
      : '';
    return `<div class="repository-item ${disabled?'is-disabled':''}"
      data-id="${R.escape(repo.id)}"
      data-name="${R.escape(repo.name)}"
      data-group="${R.escape(repo.groupKey)}"
      data-type="${R.escape(repo.typeKey)}"
      data-status="${R.escape(repo.status)}"
      data-favorite="${repo.favorite?'true':'false'}"
      onclick="${disabled ? "showToast('승인 완료된 Repository만 상세로 이동할 수 있습니다.')" : `location.href='${repoUrl(repo)}'`}">
        <button class="favorite-button ${fav}" type="button" ${disabled?'disabled':''} aria-label="즐겨찾기" onclick="event.stopPropagation(); this.classList.toggle('active'); this.textContent=this.classList.contains('active')?'★':'☆';">${star}</button>
        <div class="repo-name">
          <strong>${R.escape(repo.name)}</strong>
          <span class="repo-group">${R.escape(repo.group)}</span>
          <span class="repo-description">${R.escape(repo.description)}</span>
        </div>
        ${R.chip(st.label, st.chip)}
        <div class="repo-meta-line">
          <strong>${R.escape(repo.type)}</strong>
          <span class="repo-cell-note">${R.escape(repo.updatedAt)}</span>
        </div>
        <div class="repo-status-action">${action}</div>
      </div>`;
  }

  function render(){
    const list = document.getElementById('repoList');
    const data = R.data().repositories?.list || [];
    if (!list) return;
    list.innerHTML = data.map(row).join('');
    filterRepositories();
  }

  window.setStatusTab = function(status){
    currentStatus = status;
    document.querySelectorAll('.status-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.status === status));
    filterRepositories();
  };

  window.filterRepositories = function(){
    const keyword = (document.getElementById('repoSearch')?.value || '').trim().toLowerCase();
    const group = document.getElementById('groupFilter')?.value || 'all';
    const type = document.getElementById('typeFilter')?.value || 'all';
    let visible = 0;
    document.querySelectorAll('#repoList .repository-item').forEach(row => {
      const matchKeyword = !keyword || row.innerText.toLowerCase().includes(keyword);
      const matchStatus = currentStatus === 'all' || row.dataset.status === currentStatus;
      const matchGroup = group === 'all' || row.dataset.group === group;
      const matchType = type === 'all' || row.dataset.type === type;
      const ok = matchKeyword && matchStatus && matchGroup && matchType;
      row.style.display = ok ? '' : 'none';
      if (ok) visible += 1;
    });
    const empty = document.getElementById('emptyState');
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };

  window.openRepositoryDetail = function(event){
    const row = event?.currentTarget;
    const id = row?.dataset?.id || row?.dataset?.name || 'mobile-banking-api';
    if (row?.classList?.contains('is-disabled')) return showToast('승인 완료된 Repository만 상세로 이동할 수 있습니다.');
    location.href = `./repository-detail.html?id=${encodeURIComponent(id)}`;
  };

  document.addEventListener('DOMContentLoaded', render);
})();
