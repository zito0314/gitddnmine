// gitddn detail pages renderer
// 상세 화면의 hero / summary / activity / gate 영역을 mock-data.js에서 가져와 렌더링합니다.
(function(){
  const root = window.GITDDN_MOCK || {};
  const q = (s, c=document) => c.querySelector(s);
  const qa = (s, c=document) => Array.from(c.querySelectorAll(s));
  const esc = (v='') => String(v ?? '').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  const chip = (label, tone='') => `<span class="chip ${tone}">${esc(label)}</span>`;
  const statusChip = (label, tone='') => `<span class="status-chip ${tone}">${esc(label)}</span>`;
  const cls = (...v) => v.filter(Boolean).join(' ');

  const details = root.details || {};

  function renderMrDetail(){
    const data = details.mergeRequest || {};
    if (!q('.page-mr-detail') || !data.id) return;

    const hero = q('.mr-overview-hero');
    if (hero) hero.innerHTML = `
      <div class="mr-hero-main">
        <div class="mr-kicker">${esc(data.breadcrumb)}</div>
        <div class="mr-heading-line">
          <span class="mr-state ${esc(data.stateKey)}"><span class="state-dot"></span>${esc(data.state)}</span>
          <h1>MR #${esc(data.id)} ${esc(data.title)}</h1>
        </div>
        <p class="mr-hero-desc">${esc(data.description)}</p>
        <div class="mr-meta-row">${data.meta.map(esc).map(v=>`<span>${v}</span>`).join('')}</div>
      </div>
      <div class="mr-action-group">
        <button class="secondary-button" type="button" onclick="location.href='./mr-list.html'">MR 목록</button>
        <button class="secondary-button" type="button" onclick="showToast('파이프라인을 다시 실행합니다.')">Retry Pipeline</button>
        <button class="primary-button" type="button" onclick="tryMerge()">Merge</button>
      </div>`;

    const branch = q('.mr-branch-card');
    if (branch) branch.innerHTML = `
      <span class="branch-tag source">${esc(data.sourceBranch)}</span>
      <span class="branch-arrow">→</span>
      <span class="branch-tag target">${esc(data.targetBranch)}</span>
      <span class="branch-diff"><strong>${esc(data.diff.added)}</strong> / <em>${esc(data.diff.removed)}</em> · 파일 ${esc(data.diff.files)}개</span>`;

    const summary = q('.mr-summary-strip');
    if (summary) summary.innerHTML = data.summary.map(item => `
      <article><span>${esc(item.label)}</span><strong class="${esc(item.tone)}">${esc(item.value)}</strong><small>${esc(item.note)}</small></article>
    `).join('');

    const main = q('.mr-main-column');
    if (main) main.innerHTML = `
      <div class="mr-section-label">병합 가능 여부</div>
      ${data.gates.map(renderMrGate).join('')}
      <div class="mr-section-label activity-label">액티비티</div>
      ${renderMrActivity(data.activity)}
    `;
  }

  function renderMrGate(gate){
    const items = gate.items || [];
    const body = gate.type === 'pipeline' ? `
      <div class="pipeline-flow">${items.map(i=>`<div class="pipeline-stage ${esc(i.status)}"><span></span><div><strong>${esc(i.title)}</strong><small>${esc(i.desc)}</small></div></div>`).join('')}</div>`
      : `<div class="gate-check-list">${items.map(i=>`<div class="gate-check"><span class="${esc(i.iconClass)}">${esc(i.icon)}</span><span><strong>${esc(i.title)}</strong><small>${esc(i.desc)}</small></span><b class="${esc(i.tone)}">${esc(i.result)}</b></div>`).join('')}</div>`;
    const approverBody = gate.type === 'approval' ? `
      <div class="approver-grid">${items.map(i=>`<div class="approver-card"><span class="person-avatar ${esc(i.avatarTone)}">${esc(i.avatar)}</span><span><strong>${esc(i.name)}</strong><small>${esc(i.role)}</small></span><b class="${esc(i.tone)}">${esc(i.result)}</b></div>`).join('')}</div>` : body;
    return `
      <article class="mr-gate-card">
        <button class="mr-gate-header" type="button" onclick="toggleMrSection(this)">
          <span class="gate-icon ${esc(gate.iconTone)}">${esc(gate.icon)}</span>
          <span class="gate-title"><strong>${esc(gate.title)}</strong><small>${esc(gate.subtitle)}</small></span>
          <span class="gate-status ${esc(gate.tone)}"><span class="state-dot"></span>${esc(gate.status)}</span>
          <span class="gate-chevron open">⌄</span>
        </button>
        <div class="mr-gate-body is-open">${approverBody}</div>
      </article>`;
  }

  function renderMrActivity(activity){
    const tabs = [
      ['review','코드 리뷰'], ['line','라인 댓글'], ['general','일반 댓글'], ['history','히스토리']
    ];
    return `<article class="mr-activity-card">
      <div class="activity-tabs">${tabs.map(([key,label], idx)=>`<button class="activity-tab ${idx===0?'active':''}" type="button" data-activity="${key}" onclick="switchActivity(this, '${key}')">${label} <span>${(activity[key]||[]).length}</span></button>`).join('')}</div>
      ${tabs.map(([key], idx)=>`<div class="activity-panel ${idx===0?'active':''}" id="activity-${key}">${(activity[key]||[]).map(item=>renderActivityItem(key,item)).join('')}${key==='general'?'<div class="comment-compose"><textarea id="reviewComment" placeholder="댓글을 입력하세요."></textarea><button class="primary-button" type="button" onclick="addReviewComment()">댓글 등록</button></div>':''}</div>`).join('')}
    </article>`;
  }

  function renderActivityItem(type, item){
    if (type === 'history') return `<div class="history-item"><span>${esc(item.time)}</span><strong>${esc(item.title)}</strong><small>${esc(item.desc)}</small></div>`;
    if (type === 'line') return `<div class="line-comment"><span class="person-avatar ${esc(item.tone)}">${esc(item.avatar)}</span><div><strong>${esc(item.author)}</strong><small>${esc(item.file)} · ${esc(item.time)}</small><p>${esc(item.comment)}</p></div></div>`;
    return `<div class="review-comment ${esc(item.state||'')}"><span class="person-avatar ${esc(item.tone)}">${esc(item.avatar)}</span><div><strong>${esc(item.author)}</strong><small>${esc(item.time)}${item.stateLabel?' · '+esc(item.stateLabel):''}</small><p>${esc(item.comment)}</p></div></div>`;
  }

  function renderRepositoryDetail(){
    const data = details.repository || {};
    if (!q('.page-repository-detail') || !data.name) return;
    const hero = q('#repoHero');
    if (hero) hero.innerHTML = `<div class="repo-title-row"><div><div class="repo-kicker">Repository Overview</div><h1>${esc(data.name)}</h1><p class="repo-description">${esc(data.description)}</p></div><div class="repo-header-actions"><button class="secondary-button" type="button" onclick="showToast('Clone URL이 복사되었습니다.')">Clone</button><button class="secondary-button" type="button" onclick="showRepoView(null, 'settings')">Settings</button></div></div>`;
    const metrics = q('.repo-metrics');
    if (metrics) metrics.innerHTML = data.metrics.map(m=>`<article class="repo-metric"><span>${esc(m.label)}</span><strong class="${esc(m.tone||'')}">${esc(m.value)}</strong></article>`).join('');
    const next = q('.next-list');
    if (next) next.innerHTML = data.nextUp.map(i=>`<div class="next-item"><span class="item-main"><strong>${esc(i.title)}</strong><small>${esc(i.desc)}</small></span>${statusChip(i.status, i.tone)}</div>`).join('');
    const tickets = q('.ticket-list');
    if (tickets) tickets.innerHTML = data.tickets.map(i=>`<div class="ticket-item"><span class="item-main"><strong>${esc(i.title)}</strong><small>${esc(i.desc)}</small></span>${statusChip(i.status, i.tone)}</div>`).join('');
  }

  function renderPipelineDetail(){
    const data = details.pipeline || {};
    if (!q('.pipeline-detail-page') || !data.id) return;
    const hero = q('.pipeline-hero');
    if (hero) hero.innerHTML = `<div class="pipeline-title-row"><div><div class="pipeline-kicker">Pipeline Detail</div><h1>#${esc(data.id)}</h1><p class="pipeline-hero-desc">${esc(data.description)}</p><div class="pipeline-meta">${data.meta.map(m=>`<span class="detail-chip ${esc(m.tone||'')}">${esc(m.label)}</span>`).join('')}</div></div><div class="pipeline-actions"><button class="secondary-button" type="button" onclick="location.href='./pipeline-list.html'">Pipeline 목록</button><button class="primary-button" type="button" onclick="showToast('Pipeline을 다시 실행합니다.')">Retry Pipeline</button></div></div><div class="pipeline-ref-flow">${data.refs.map(r=>`<span class="branch-pill">${esc(r.label)} <strong class="mono">${esc(r.value)}</strong></span>`).join('')}${data.chips.map(c=>`<span class="detail-chip ${esc(c.tone||'')}">${esc(c.label)}</span>`).join('')}</div>`;
    const summary = q('.pipeline-summary');
    if (summary) summary.innerHTML = data.summary.map(i=>`<article class="summary-card"><div class="summary-label">${esc(i.label)}</div><div class="summary-value ${esc(i.tone||'')}">${esc(i.value)}</div><div class="summary-note">${esc(i.note)}</div></article>`).join('');
    const stageBoard = q('.stage-board');
    if (stageBoard) stageBoard.innerHTML = data.stages.map(s=>`<article class="stage-card"><h3><span class="pipeline-status-icon ${esc(s.status)}"></span>${esc(s.name)}</h3>${s.jobs.map(j=>`<a class="stage-job" href="./job-detail.html"><span class="pipeline-status-icon ${esc(j.status)}"></span>${esc(j.name)}</a>`).join('')}</article>`).join('');
    const jobsBody = q('.pipeline-jobs-table tbody');
    if (jobsBody) jobsBody.innerHTML = data.jobs.map(j=>`<tr onclick="location.href='./job-detail.html'"><td>${statusChip(j.statusLabel,j.tone)}</td><td><strong>${esc(j.name)}</strong><br><small>${esc(j.stage)}</small></td><td>${esc(j.duration)}</td><td>${esc(j.runner)}</td><td>${esc(j.startedAt)}</td></tr>`).join('');
  }

  function renderSecurityDetail(){
    const data = details.security || {};
    if (!q('.page-security-detail') || !data.title) return;
    const hero = q('.sec-overview-hero');
    if (hero) hero.innerHTML = `<a class="hero-back" href="./security-list.html">← Security Validation 목록</a><div class="hero-top-row"><div><div class="hero-kicker">Security Validation · MR #${esc(data.mrId)}</div><div class="hero-title-row"><h1>${esc(data.title)}</h1><span class="sec-status-badge ${esc(data.statusKey)}"><span class="badge-dot"></span> ${esc(data.status)}</span><span class="policy-badge ${esc(data.policyKey)}">⛔ ${esc(data.policy)}</span></div><div class="hero-meta-row">${data.meta.map(m=>`<span>${esc(m)}</span>`).join('')}</div></div><div class="hero-actions"><button class="secondary-button" type="button" onclick="location.href='./mr-detail.html'">MR로 돌아가기</button><button class="primary-button" type="button" onclick="showToast('보안 검증을 재실행합니다.')">↺ 재검증</button></div></div>`;
    const notice = q('.status-notice');
    if (notice) notice.innerHTML = `<span class="status-notice-icon">⛔</span><div class="status-notice-text"><strong>${esc(data.notice.title)}</strong><span>${esc(data.notice.desc)}</span></div>`;
    const sev = q('.severity-summary-grid');
    if (sev) sev.innerHTML = data.severity.map(i=>`<div class="severity-card"><div class="severity-icon ${esc(i.key)}">${esc(i.label[0])}</div><div class="severity-info"><div class="severity-label">${esc(i.label)}</div><div class="severity-count ${esc(i.key)}">${esc(i.count)}</div></div></div>`).join('');
  }

  function renderCommitDetail(){
    const data = details.commit || {};
    if (!q('.page-commit-detail') || !data.title) return;
    const hero = q('.commit-hero');
    if (hero) hero.innerHTML = `<div class="commit-title-row"><div><div class="commit-kicker">Commit Detail</div><div style="display:flex;align-items:center;gap:10px"><button class="small-icon-button" type="button" aria-label="커밋 목록으로 돌아가기" onclick="location.href='./repository-detail.html#commits'">‹</button><h1 id="commitTitle">${esc(data.title)}</h1></div><p class="commit-desc">${esc(data.description)}</p><div class="commit-meta">${data.meta.map(m=>`<span class="detail-chip ${esc(m.tone||'')}">${esc(m.label)}</span>`).join('')}</div></div><div class="commit-actions"><button class="secondary-button" type="button" onclick="showToast('Commit SHA가 복사되었습니다.')">Copy SHA</button><button class="primary-button" type="button" onclick="location.href='./pipeline-detail.html'">Pipeline 보기</button></div></div><div class="commit-ref-flow">${data.refs.map(r=>`<span class="commit-ref-item"><span class="commit-ref-label">${esc(r.label)}</span><a class="commit-ref-link mono" href="${esc(r.href)}">${esc(r.value)}</a></span>`).join('')}</div>`;
  }

  function renderJobDetail(){
    const data = details.job || {};
    if (!q('.job-detail-page') || !data.name) return;
    const heading = q('.page-hero h1') || q('main h1');
    if (heading) heading.textContent = data.name;
    const desc = q('.page-hero p');
    if (desc) desc.textContent = data.description;
    const log = q('.job-log, .log-screen, pre');
    if (log) log.textContent = data.logs.join('\n');
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderMrDetail();
    renderRepositoryDetail();
    renderPipelineDetail();
    renderSecurityDetail();
    renderCommitDetail();
    renderJobDetail();
  });
})();
