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
  let currentVStatus = 'all';
  let currentSeverity = 'all';

  function sevHtml(sev={}){
    const keys = ['critical','high','medium','low'];
    if (!keys.some(k => Number(sev[k]) > 0)) return '<span class="vuln-badge none">취약점 없음</span>';
    return keys.filter(k => Number(sev[k]) > 0).map(k => `<span class="vuln-badge ${k}">${k[0].toUpperCase()} ${R.escape(sev[k])}</span>`).join('');
  }
  function row(s){
    const v = R.status(s.vstatus);
    const policyTone = s.policy === 'blocked' ? 'blocked' : s.policy === 'allowed' ? 'allowed' : 'running';
    return `<tr data-id="${R.escape(s.id)}" data-vstatus="${R.escape(s.vstatus)}" data-project="${R.escape(s.projectKey)}" data-repo="${R.escape(s.repo)}" data-mrstatus="${R.escape(s.mrStatus)}"
      data-severity="${Object.entries(s.severity||{}).filter(([,v])=>Number(v)>0).map(([k])=>k).join(' ')}"
      onclick="location.href='./security-detail.html?id=${encodeURIComponent(s.id)}&mrId=${encodeURIComponent(s.mrId)}'">
      <td><div class="mr-title-cell"><strong>MR #${R.escape(s.mrId)} ${R.escape(s.mrTitle)}</strong><span>${R.escape(s.branch || `${s.lastCheckedAt} 검증`)}</span></div></td>
      <td><div class="repo-cell"><strong>${R.escape(s.repo)}</strong><span>${R.escape(s.project)}</span></div></td>
      <td>${R.chip(v.label, v.chip)}</td>
      <td><div class="vuln-count-row">${sevHtml(s.severity)}</div></td>
      <td>${R.chip(s.policy === 'blocked' ? '병합 차단' : s.policy === 'allowed' ? '허용' : '검증 중', policyTone)}</td>
      <td style="color:var(--muted);font-size:12px;">${R.escape(s.lastCheckedAt || '-')}</td>
      <td><button class="row-action" type="button" onclick="event.stopPropagation(); location.href='./security-detail.html?id=${encodeURIComponent(s.id)}&mrId=${encodeURIComponent(s.mrId)}'">상세 보기</button></td>
    </tr>`;
  }
  function render(){
    const data = R.data().security?.validations || [];
    const body = document.getElementById('secTable');
    if (!body) return;
    body.innerHTML = data.map(row).join('');
    filterSec();
  }

  window.setVStatusTab = function(status){
    currentVStatus = status;
    document.querySelectorAll('[data-vstatus]').forEach(tab => {
      if (tab.tagName === 'BUTTON') tab.classList.toggle('active', tab.dataset.vstatus === status);
    });
    filterSec();
  };
  window.toggleSeverity = function(btn){
    currentSeverity = btn?.dataset?.severity || 'all';
    document.querySelectorAll('.severity-chip').forEach(chip => chip.classList.toggle('inactive', currentSeverity !== 'all' && chip !== btn));
    filterSec();
  };
  window.filterSec = function(){
    const keyword = (document.getElementById('secSearch')?.value || '').trim().toLowerCase();
    const project = document.getElementById('projectFilter')?.value || 'all';
    const repo = document.getElementById('repoFilter')?.value || 'all';
    const mrStatus = document.getElementById('mrStatusFilter')?.value || 'all';
    let visible = 0;
    document.querySelectorAll('#secTable tr').forEach(row => {
      const okKeyword = !keyword || row.innerText.toLowerCase().includes(keyword);
      const okProject = project === 'all' || row.dataset.project === project;
      const okRepo = repo === 'all' || row.dataset.repo === repo;
      const okMr = mrStatus === 'all' || row.dataset.mrstatus === mrStatus;
      const okV = currentVStatus === 'all' || row.dataset.vstatus === currentVStatus;
      const okSev = currentSeverity === 'all' || (row.dataset.severity || '').includes(currentSeverity);
      const ok = okKeyword && okProject && okRepo && okMr && okV && okSev;
      row.style.display = ok ? '' : 'none';
      if (ok) visible += 1;
    });
    const empty = document.getElementById('emptyState');
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };
  window.goDetail = function(event){
    event?.stopPropagation?.();
    const row = event?.currentTarget?.closest('tr');
    const id = row?.dataset?.id || 'SEC-204';
    location.href = `./security-detail.html?id=${encodeURIComponent(id)}`;
  };

  document.addEventListener('DOMContentLoaded', render);
})();
