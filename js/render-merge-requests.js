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

  function repoMergeRequestsUrl(m){
    return `./repository-detail.html?id=${encodeURIComponent(m.repo || m.repositoryId || '')}#merge-requests`;
  }
  function progressTone(m){
    if (Number(m.approved || 0) >= Number(m.required || 0)) return 'green is-100';
    if (m.review === 'rejected' || m.pipeline === 'failed' || m.security === 'failed') return 'red is-0';
    return 'orange is-50';
  }
  function row(m){
    const pipeline = R.status(m.pipeline);
    const mrStatus = R.status(m.status);
    const secTone = m.security === 'passed' ? 'green' : m.security === 'failed' || m.security === 'need-check' ? 'red' : '';
    const reviewTone = m.review === 'approved' ? 'green' : m.review === 'need-review' ? 'orange' : m.review === 'rejected' ? 'red' : '';
    return `<tr class="mr-clickable-row"
      data-id="${R.escape(m.id)}"
      data-status="${R.escape(m.status)}"
      data-repo="${R.escape(m.repo)}"
      data-owner="${R.escape(m.owner)}"
      data-review="${R.escape(m.review)}"
      onclick="location.href='${repoMergeRequestsUrl(m)}'">
        <td>${R.escape(m.updatedAt)}</td>
        <td>
          <div class="mr-title">
            <strong>MR #${R.escape(m.id)} ${R.escape(m.title)}</strong>
            <span>${R.escape(m.summary || m.description || '')}</span>
          </div>
        </td>
        <td>
          <div class="repo-info">
            <strong>${R.escape(m.repo)}</strong>
            <span>${R.escape(m.repoGroup || m.project || '')}</span>
          </div>
        </td>
        <td>
          <div class="branch-flow">
            <span><strong class="mono">${R.escape(m.source)}</strong></span>
            <span>→ <strong class="mono">${R.escape(m.target)}</strong></span>
          </div>
        </td>
        <td>${R.escape(m.author)}</td>
        <td>${R.statusChip(pipeline.label, pipeline.chip)}</td>
        <td>${R.statusChip(m.securityLabel || R.status(m.security).label, secTone)}</td>
        <td>${R.statusChip(m.reviewLabel || m.review, reviewTone)}</td>
        <td>
          <div class="review-progress">
            <span>${R.escape(m.approved)}/${R.escape(m.required)} Approved</span>
            <div class="progress-bar"><div class="progress-fill ${progressTone(m)}"></div></div>
          </div>
        </td>
        <td>${R.escape(m.comments)}</td>
        <td>${R.statusChip(mrStatus.label, mrStatus.chip)}</td>
      </tr>`;
  }

  function render(){
    const data = R.data().mergeRequests?.list || [];
    const body = document.getElementById('mrTable');
    if (body) body.innerHTML = data.map(row).join('');

    const repoFilter = document.getElementById('repoFilter');
    if (repoFilter && repoFilter.options.length <= 1) {
      [...new Set(data.map(m => m.repo))].forEach(repo => repoFilter.insertAdjacentHTML('beforeend', `<option value="${R.escape(repo)}">${R.escape(repo)}</option>`));
    }
    filterMrRows();
  }

  window.setStatusTab = window.setMrStatusTab = window.setMrTab = function(status){
    currentStatus = status;
    document.querySelectorAll('.status-tab,.tab-button').forEach(tab => {
      const val = tab.dataset.status || tab.dataset.mrStatus;
      if (val) tab.classList.toggle('active', val === status);
    });
    filterMrRows();
  };

  window.filterMrRows = window.filterMrs = function(){
    const keyword = (document.getElementById('mrSearch')?.value || '').trim().toLowerCase();
    const repo = document.getElementById('repoFilter')?.value || 'all';
    const owner = document.getElementById('ownerFilter')?.value || 'all';
    const review = document.getElementById('reviewFilter')?.value || 'all';
    let visible = 0;
    document.querySelectorAll('#mrTable tr, #mrTableBody tr').forEach(row => {
      const matchKeyword = !keyword || row.innerText.toLowerCase().includes(keyword);
      const matchStatus = currentStatus === 'all' || row.dataset.status === currentStatus;
      const matchRepo = repo === 'all' || row.dataset.repo === repo;
      const matchOwner = owner === 'all' || row.dataset.owner === owner;
      const matchReview = review === 'all' || row.dataset.review === review;
      const ok = matchKeyword && matchStatus && matchRepo && matchOwner && matchReview;
      row.style.display = ok ? '' : 'none';
      if (ok) visible += 1;
    });
    const empty = document.getElementById('emptyState');
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };

  window.openMrDetail = function(id){
    const mrId = id || event?.currentTarget?.dataset?.id || 128;
    location.href = `./mr-detail.html?id=${encodeURIComponent(mrId)}`;
  };

  document.addEventListener('DOMContentLoaded', render);
})();
