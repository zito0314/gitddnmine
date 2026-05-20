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
  let currentPipelineFilter = 'all';

  function detailUrl(p){ return `./pipeline-detail.html?id=${encodeURIComponent(p.id)}`; }
  function row(p){
    const result = p.status === 'finished' ? (p.result || 'passed') : p.status;
    const st = R.status(result);
    const triggerTone = p.trigger === 'Schedule' ? 'blue' : p.trigger === 'Manual' ? '' : 'blue';
    const action = p.status === 'running'
      ? `<button class="secondary-button small danger-text" type="button" onclick="event.stopPropagation(); showToast('Pipeline 실행을 취소했습니다.')">실행 취소</button>`
      : result === 'failed' || result === 'canceled'
      ? `<button class="secondary-button small" type="button" onclick="event.stopPropagation(); showToast('Pipeline을 재실행합니다.')">재실행</button>`
      : `<span class="table-action-placeholder">-</span>`;
    return `<tr data-id="${R.escape(p.id)}" data-status="${R.escape(p.status)}" onclick="location.href='${detailUrl(p)}'">
      <td>${R.escape(p.updatedAt)}</td>
      <td><div class="mr-title"><strong>#${R.escape(p.id)}</strong><span>${R.escape(p.title)}</span><div class="chip-row">${R.chip(p.trigger, triggerTone)}${R.chip(st.label, st.chip)}</div></div></td>
      <td><div class="repo-info"><strong>${R.escape(p.repo)}</strong><span>${R.escape(p.repoGroup)}</span></div></td>
      <td><div class="branch-flow"><strong class="mono">${R.escape(p.branch)}</strong><span>→ <strong class="mono">${R.escape(p.target || p.branch)}</strong></span></div></td>
      <td>${R.escape(p.author)}</td>
      <td><a class="code-chip" href="./commit-detail.html?id=${encodeURIComponent(p.commit)}&pipelineId=${encodeURIComponent(p.id)}" onclick="event.stopPropagation();">${R.escape(p.commit)}</a></td>
      <td><div class="stage-status-row">${(p.jobs||[]).map(j=>`<span class="pipeline-status-icon ${R.escape(j)}"></span>`).join('')}</div></td>
      <td>${action}</td>
    </tr>`;
  }

  function updateCounts(data){
    const counts = {all:data.length, running:0, failed:0, finished:0};
    data.forEach(p => {
      if (p.status === 'running') counts.running += 1;
      if (p.status === 'finished') counts.finished += 1;
      if (p.result === 'failed' || p.status === 'failed') counts.failed += 1;
    });
    Object.entries(counts).forEach(([k,v]) => {
      const el = document.querySelector(`[data-count="${k}"]`);
      if (el) el.textContent = v;
    });
  }

  function render(){
    const data = R.data().pipelines?.list || [];
    const body = document.getElementById('pipelineTableBody');
    if (body) {
      body.innerHTML = data.map(row).join('');
      updateCounts(data);
      filterPipelineRows(currentPipelineFilter);
    }

    const repoBody = document.getElementById('repoPipelineTableBody');
    if (repoBody) {
      const repoName = R.param('id') || R.param('repo') || 'mobile-banking-api';
      const repoData = data.filter(p => !repoName || p.repo === repoName || p.repositoryId === repoName);
      repoBody.innerHTML = (repoData.length ? repoData : data).map(row).join('');
      if (typeof window.filterRepoPipelineRows === 'function') window.filterRepoPipelineRows('all');
    }
  }

  window.filterPipelineRows = function(status='all'){
    currentPipelineFilter = status;
    document.querySelectorAll('[data-pipeline-filter]').forEach(tab => tab.classList.toggle('active', tab.dataset.pipelineFilter === status));
    const keyword = (document.getElementById('pipelineSearch')?.value || '').trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll('#pipelineTableBody tr').forEach(row => {
      const pStatus = row.dataset.status;
      const okStatus = status === 'all' || pStatus === status || (status === 'failed' && row.innerText.toLowerCase().includes('failed'));
      const okKeyword = !keyword || row.innerText.toLowerCase().includes(keyword);
      const ok = okStatus && okKeyword;
      row.style.display = ok ? '' : 'none';
      if (ok) visible += 1;
    });
  };

  window.togglePipelineRun = function(event, button){
    event?.stopPropagation?.();
    showToast(button?.dataset?.pipelineAction === 'cancel' ? 'Pipeline 실행을 취소했습니다.' : 'Pipeline을 재실행합니다.');
  };

  document.addEventListener('DOMContentLoaded', render);
})();
