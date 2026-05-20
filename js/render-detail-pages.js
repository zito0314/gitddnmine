
(function(){
  window.GitddnRender = window.GitddnRender || {};
  const R = window.GitddnRender;

  R.data = R.data || (() => window.GITDDN_MOCK || {});
  R.escape = R.escape || ((v='') => String(v ?? '').replace(/[&<>"]/g, m => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'
  }[m])));
  R.param = R.param || ((name) => new URLSearchParams(window.location.search).get(name));
  R.status = R.status || ((key) => {
    const status = R.data().common?.status?.[key];
    return status || { label: key || '-', chip: '' };
  });
  R.statusChip = R.statusChip || ((label, tone='') => {
    return `<span class="status-chip ${R.escape(tone)}">${R.escape(label)}</span>`;
  });

  const $ = (selector, ctx=document) => ctx.querySelector(selector);
  const $$ = (selector, ctx=document) => Array.from(ctx.querySelectorAll(selector));
  const h = R.escape;

  function tone(value) {
    const v = String(value || '').toLowerCase();
    if (['passed','pass','success','approved','merged','ready','allowed','완료','정상','통과'].some(x => v.includes(x))) return 'success';
    if (['failed','danger','blocked','critical','red','차단','불가','반려','확인 필요'].some(x => v.includes(x))) return 'danger';
    if (['running','warning','pending','review','orange','대기','필요','진행','확인 중'].some(x => v.includes(x))) return 'warning';
    return '';
  }

  function getRepoData() {
    const id = R.param('id') || R.param('repo') || 'mobile-banking-api';
    const list = R.data().repositories?.list || [];
    const detail = R.data().details?.repository || {};
    const repo = list.find(item => String(item.id) === String(id) || String(item.name) === String(id)) || {};
    return Object.assign({}, detail, repo, {
      id: repo.id || id,
      name: repo.name || detail.name || id,
      group: repo.group || detail.group || 'Digital Banking / Mobile',
      description: repo.description || detail.description || ''
    });
  }

  function getMrData() {
    const id = Number(R.param('id') || 128);
    const list = R.data().mergeRequests?.list || [];
    const fallback = R.data().details?.mergeRequest || {};
    const mr = list.find(item => Number(item.id) === id) || list[0] || {};
    const pipelineStatus = R.status(mr.pipeline);
    const mrStatus = R.status(mr.status);
    return Object.assign({}, fallback, mr, {
      id: mr.id || fallback.id,
      title: mr.title || fallback.title,
      description: mr.summary || fallback.description || '',
      breadcrumb: `${mr.repoGroup || 'Digital Banking / Mobile'} / ${mr.repo || 'mobile-banking-api'} / Merge Requests / #${mr.id || fallback.id}`,
      state: mrStatus.label,
      stateKey: mr.status || fallback.stateKey || 'open',
      sourceBranch: mr.source || fallback.sourceBranch,
      targetBranch: mr.target || fallback.targetBranch,
      diff: fallback.diff || { added: '+0', removed: '-0', files: '0개' },
      summary: [
        {
          label: 'Approvals',
          value: `${mr.approved ?? 0}/${mr.required ?? 0}`,
          note: `필수 승인자 ${Math.max((mr.required || 0) - (mr.approved || 0), 0)}명 대기`,
          tone: (mr.approved >= mr.required) ? 'success' : 'warning'
        },
        {
          label: 'Pipeline',
          value: pipelineStatus.label,
          note: '최근 Pipeline 기준',
          tone: tone(mr.pipeline)
        },
        {
          label: 'Security',
          value: mr.securityLabel || R.status(mr.security).label,
          note: '보안 검증 결과',
          tone: tone(mr.securityLabel || mr.security)
        },
        {
          label: 'Release Gate',
          value: (mr.pipeline === 'passed' && mr.security === 'passed') ? 'Ready' : 'Blocked',
          note: '운영 이관 조건',
          tone: (mr.pipeline === 'passed' && mr.security === 'passed') ? 'success' : 'danger'
        }
      ]
    });
  }

  function getPipelineData() {
    const id = R.param('id') || '2847502395';
    const list = R.data().pipelines?.list || [];
    const detail = R.data().details?.pipeline || {};
    const item = list.find(p => String(p.id) === String(id)) || list[0] || {};
    return Object.assign({}, detail, item, {
      id: item.id || detail.id,
      description: detail.description || item.title || '',
      result: item.status === 'finished' ? item.result : item.status
    });
  }

  function getSecurityData() {
    const id = R.param('id') || 'SEC-204';
    const list = R.data().security?.validations || [];
    const detail = R.data().details?.security || {};
    const item = list.find(s => String(s.id) === String(id)) || list[0] || {};
    const severity = Object.entries(item.severity || {}).map(([key, count]) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      count
    }));
    return Object.assign({}, detail, item, {
      title: item.mrTitle || detail.title,
      status: R.status(item.vstatus || detail.statusKey).label,
      statusKey: item.vstatus || detail.statusKey,
      policy: item.policy === 'blocked' ? '병합 불가' : '병합 가능',
      policyKey: item.policy || detail.policyKey,
      meta: [
        item.repo,
        item.project,
        `MR #${item.mrId}`,
        `마지막 검증 ${item.lastCheckedAt}`
      ].filter(Boolean),
      severity: severity.length ? severity : detail.severity
    });
  }

  function renderMrDetail() {
    if (!$('.page-mr-detail')) return;
    const mr = getMrData();

    const hero = $('.mr-overview-hero');
    if (hero) {
      hero.innerHTML = `
        <div class="mr-hero-main">
          <div class="mr-kicker">${h(mr.breadcrumb)}</div>
          <div class="mr-heading-line">
            <span class="mr-state ${h(mr.stateKey)}"><span class="state-dot"></span>${h(mr.state)}</span>
            <h1>MR #${h(mr.id)} ${h(mr.title)}</h1>
          </div>
          <p class="mr-hero-desc">${h(mr.description)}</p>
          <div class="mr-meta-line">
            ${(mr.meta || [`${mr.author || 'Jito'} 요청`, mr.updatedAt || '', `댓글 ${mr.comments || 0}`]).map(v => `<span>${h(v)}</span>`).join('')}
          </div>
        </div>
        <div class="mr-action-group">
          <button class="secondary-button" type="button" onclick="location.href='./mr-list.html'">MR 목록</button>
          <button class="secondary-button" type="button" onclick="showToast('파이프라인을 다시 실행합니다.')">Retry Pipeline</button>
          <button class="primary-button" type="button" onclick="tryMerge()">Merge</button>
        </div>`;
    }

    const branch = $('.mr-branch-card');
    if (branch) {
      branch.innerHTML = `
        <span class="branch-tag source">${h(mr.sourceBranch)}</span>
        <span class="branch-arrow">→</span>
        <span class="branch-tag target">${h(mr.targetBranch)}</span>
        <span class="branch-diff"><strong>${h(mr.diff?.added)}</strong> / <em>${h(mr.diff?.removed)}</em> · 파일 ${h(mr.diff?.files)}</span>`;
    }

    const summary = $('.mr-summary-strip');
    if (summary) {
      summary.innerHTML = (mr.summary || []).map(item => `
        <article>
          <span>${h(item.label)}</span>
          <strong class="${h(item.tone || '')}">${h(item.value)}</strong>
          <small>${h(item.note)}</small>
        </article>`).join('');
    }

    const main = $('.mr-main-column');
    if (main) {
      const gates = (mr.gates || []).map(gate => {
        const items = (gate.items || []).map(item => `
          <div class="gate-check">
            <span class="check-main">
              <strong>${h(item.title)}</strong>
              <small>${h(item.desc || item.subtitle || '')}</small>
            </span>
            <b class="${h(item.tone || tone(item.result || item.status))}">${h(item.result || item.status || '')}</b>
          </div>`).join('');

        return `
          <article class="mr-gate-card">
            <button class="mr-gate-header" type="button" onclick="toggleMrSection(this)">
              <span class="gate-icon ${h(gate.iconTone || 'blue')}">${h(gate.icon || 'GT')}</span>
              <span class="gate-title"><strong>${h(gate.title)}</strong><small>${h(gate.subtitle || '')}</small></span>
              <span class="gate-status ${h(gate.tone || tone(gate.status))}"><span class="state-dot"></span>${h(gate.status)}</span>
              <span class="gate-chevron open">⌄</span>
            </button>
            <div class="mr-gate-body is-open">
              <div class="gate-check-list">${items}</div>
            </div>
          </article>`;
      }).join('');

      const activity = mr.activity || {};
      const tabs = [
        ['review', '코드 리뷰'],
        ['line', '라인 댓글'],
        ['general', '일반 댓글'],
        ['history', '히스토리']
      ];

      const tabButtons = tabs.map(([key, label], index) => `
        <button class="activity-tab ${index === 0 ? 'active' : ''}" type="button" data-activity="${key}" onclick="switchActivity(this, '${key}')">
          ${label} <span>${(activity[key] || []).length}</span>
        </button>`).join('');

      const panels = tabs.map(([key], index) => {
        const items = (activity[key] || []).map(item => `
          <div class="review-comment">
            <span class="person-avatar ${h(item.tone || '')}">${h(item.avatar || (item.author || 'U').charAt(0))}</span>
            <div>
              <strong>${h(item.author || 'System')}</strong> <small>${h(item.time || '')}</small>
              ${item.file ? `<p><b>${h(item.file)}</b></p>` : ''}
              <p>${h(item.comment || item.message || item.title || '')}</p>
            </div>
          </div>`).join('');

        return `
          <div class="activity-panel ${index === 0 ? 'active' : ''}" id="activity-${key}">
            ${items || '<div class="empty-state" style="display:block;">표시할 활동이 없습니다.</div>'}
          </div>`;
      }).join('');

      main.innerHTML = `
        <div class="mr-section-label">병합 가능 여부</div>
        ${gates}
        <div class="mr-section-label activity-label">액티비티</div>
        <article class="mr-activity-card">
          <div class="activity-tabs">${tabButtons}</div>
          ${panels}
        </article>`;
    }
  }

  function renderRepositoryDetail() {
    if (!$('.page-repository-detail')) return;
    const repo = getRepoData();

    $$('.repo-context-name').forEach(el => { el.textContent = repo.name; });
    $$('.repo-context-path').forEach(el => { el.textContent = repo.group; });

    const hero = $('#repoHero');
    if (hero) {
      hero.innerHTML = `
        <div class="repo-title-row">
          <div>
            <div class="repo-kicker">Repository Overview</div>
            <h1>${h(repo.name)}</h1>
            <p class="repo-description">${h(repo.group)} ${h(repo.description)}</p>
          </div>
          <div class="repo-header-actions">
            <button class="secondary-button" type="button" onclick="showToast('Clone URL이 복사되었습니다.')">Clone</button>
            <button class="secondary-button" type="button" onclick="showRepoView(null, 'settings')">Settings</button>
          </div>
        </div>`;
    }

    const metrics = $('.repo-metrics');
    if (metrics && repo.metrics) {
      metrics.innerHTML = repo.metrics.map(item => `
        <article class="repo-metric">
          <span>${h(item.label)}</span>
          <strong class="${h(item.tone || '')}">${h(item.value)}</strong>
        </article>`).join('');
    }

    const next = $('.next-list');
    if (next && repo.nextUp) {
      next.innerHTML = repo.nextUp.map(item => `
        <div class="next-item">
          <span class="item-main"><strong>${h(item.title)}</strong><small>${h(item.desc)}</small></span>
          ${R.statusChip(item.status, item.tone)}
        </div>`).join('');
    }

    const tickets = $('.ticket-list');
    if (tickets && repo.tickets) {
      tickets.innerHTML = repo.tickets.map(item => `
        <div class="ticket-item">
          <span class="item-main"><strong>${h(item.title)}</strong><small>${h(item.desc)}</small></span>
          ${R.statusChip(item.status, item.tone)}
        </div>`).join('');
    }

    const mrBody = $('#mrTableBody');
    if (mrBody) {
      const mrs = (R.data().mergeRequests?.list || []).filter(m => m.repo === repo.name);
      if (mrs.length) {
        mrBody.innerHTML = mrs.map(m => {
          const pipe = R.status(m.pipeline);
          return `
            <tr class="mr-clickable-row" data-status="${h(m.status)}" onclick="location.href='./mr-detail.html?id=${encodeURIComponent(m.id)}&repo=${encodeURIComponent(repo.id)}'">
              <td>${h(m.updatedAt)}</td>
              <td><strong>MR #${h(m.id)} ${h(m.title)}</strong><br><small>${h(m.source)} → ${h(m.target)}</small></td>
              <td>${h(m.author)}</td>
              <td>${R.statusChip(pipe.label, pipe.chip)}</td>
              <td>${R.statusChip(m.securityLabel, tone(m.securityLabel || m.security))}</td>
              <td>${R.statusChip(m.reviewLabel, tone(m.reviewLabel || m.review))}</td>
              <td>${h(m.approved)}/${h(m.required)} Approved</td>
              <td>${h(m.comments)}</td>
              <td>${R.statusChip(R.status(m.status).label, R.status(m.status).chip)}</td>
            </tr>`;
        }).join('');
      }
    }
  }

  function renderPipelineDetail() {
    if (!$('.pipeline-detail-page')) return;
    const pipe = getPipelineData();

    const hero = $('.pipeline-hero');
    if (hero) {
      const refs = (pipe.refs || []).map(item => `<span>${h(item.label)}: ${h(item.value)}</span>`).join('');
      const meta = (pipe.meta || []).map(item => `<span class="${h(item.tone || '')}">${h(item.label)}</span>`).join('');
      hero.innerHTML = `
        <div>
          <a class="hero-back" href="./pipeline-list.html">← Pipeline 목록</a>
          <div class="hero-kicker">Pipeline #${h(pipe.id)}</div>
          <h1>${h(pipe.title || pipe.description)}</h1>
          <p class="pipeline-hero-desc">${h(pipe.description)}</p>
          <div class="hero-meta-row">${meta}${refs}</div>
        </div>`;
    }

    const summary = $('.pipeline-summary');
    if (summary) {
      summary.innerHTML = (pipe.summary || []).map(item => `
        <article class="summary-card">
          <div class="summary-label">${h(item.label)}</div>
          <div class="summary-value ${h(item.tone || '')}">${h(item.value)}</div>
          <div class="summary-note">${h(item.note)}</div>
        </article>`).join('');
    }

    const board = $('.stage-board');
    if (board) {
      board.innerHTML = (pipe.stages || []).map(stage => `
        <article class="stage-card ${h(stage.status)}">
          <div class="stage-head">
            <strong>${h(stage.name)}</strong>
            ${R.statusChip(R.status(stage.status).label, R.status(stage.status).chip)}
          </div>
          <div class="stage-job-list">
            ${(stage.jobs || []).map(job => `
              <a class="stage-job" href="./job-detail.html?pipelineId=${encodeURIComponent(pipe.id)}&job=${encodeURIComponent(job.name)}">
                <span class="pipeline-status-icon ${h(job.status)}"></span>${h(job.name)}
              </a>`).join('')}
          </div>
        </article>`).join('');
    }

    const jobsBody = $('.pipeline-jobs-table tbody');
    if (jobsBody) {
      jobsBody.innerHTML = (pipe.jobs || []).map(job => `
        <tr class="clickable-row" onclick="location.href='./job-detail.html?pipelineId=${encodeURIComponent(pipe.id)}&job=${encodeURIComponent(job.name)}'">
          <td>${R.statusChip(R.status(job.status).label, R.status(job.status).chip)}<small class="table-meta">${h(job.duration || '')}<br>${h(job.startedAt || '')}</small></td>
          <td><a class="table-link" href="./job-detail.html?pipelineId=${encodeURIComponent(pipe.id)}&job=${encodeURIComponent(job.name)}">#${h(job.id || pipe.id)}: ${h(job.name)}</a></td>
          <td><span class="code-chip">${h(pipe.branch || '')}</span></td>
          <td><span class="code-chip">~ ${h(pipe.commit || '')}</span></td>
          <td>${h(job.stage || '')}</td>
        </tr>`).join('');
    }
  }

  function renderSecurityDetail() {
    if (!$('.page-security-detail')) return;
    const sec = getSecurityData();

    const hero = $('.sec-overview-hero');
    if (hero) {
      hero.innerHTML = `
        <a class="hero-back" href="./security-list.html">← Security Validation 목록</a>
        <div class="hero-top-row">
          <div>
            <div class="hero-kicker">Security Validation · MR #${h(sec.mrId)}</div>
            <div class="hero-title-row">
              <h1>${h(sec.title)}</h1>
              <span class="sec-status-badge ${h(sec.statusKey)}"><span class="badge-dot"></span>${h(sec.status)}</span>
              <span class="policy-badge ${h(sec.policyKey)}">${sec.policyKey === 'blocked' ? '⛔ ' : ''}${h(sec.policy)}</span>
            </div>
            <div class="hero-meta-row">${(sec.meta || []).map(item => `<span>${h(item)}</span>`).join('')}</div>
          </div>
          <div class="hero-actions">
            <button class="secondary-button" type="button" onclick="location.href='./mr-detail.html?id=${encodeURIComponent(sec.mrId || 128)}'">MR로 돌아가기</button>
            <button class="primary-button" type="button" onclick="showToast('보안 검증을 재실행합니다.')">↺ 재검증</button>
          </div>
        </div>`;
    }

    const notice = $('.status-notice');
    if (notice && sec.notice) {
      notice.innerHTML = `
        <span class="status-notice-icon">⛔</span>
        <div class="status-notice-text">
          <strong>${h(sec.notice.title)}</strong>
          <span>${h(sec.notice.desc)}</span>
        </div>`;
    }

    const severity = $('.severity-summary-grid');
    if (severity) {
      severity.innerHTML = (sec.severity || []).map(item => `
        <div class="severity-card">
          <div class="severity-icon ${h(item.key)}">${h((item.label || item.key || 'S').charAt(0).toUpperCase())}</div>
          <div class="severity-info">
            <div class="severity-label">${h(item.label)}</div>
            <div class="severity-count ${h(item.key)}">${h(item.count)}</div>
          </div>
        </div>`).join('');
    }
  }

  function renderCommitDetail() {
    if (!$('.page-commit-detail')) return;
    const id = R.param('id') || R.param('commit') || '7e14d754';
    const commit = R.data().details?.commit || {};
    const hero = $('.commit-hero');
    if (hero) {
      hero.innerHTML = `
        <div>
          <a class="hero-back" href="./repository-detail.html">← Repository로 돌아가기</a>
          <div class="hero-kicker">Commit Detail</div>
          <h1>${h(commit.title || id)}</h1>
          <p>${h(commit.description || '')}</p>
          <div class="hero-meta-row">
            ${(commit.meta || [{label:id, tone:'blue'}]).map(item => `<span class="${h(item.tone || '')}">${h(item.label)}</span>`).join('')}
          </div>
        </div>`;
    }
  }

  function renderJobDetail() {
    if (!$('.job-detail-page')) return;
    const job = R.data().details?.job || {};
    const name = R.param('job') || job.name || 'unit-test';
    const heading = $('.job-detail-page h1');
    if (heading) heading.textContent = name;
    const log = $('.job-log pre') || $('.job-log') || $('pre');
    if (log && job.logs) log.textContent = job.logs.join('\n');
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderRepositoryDetail();
    renderMrDetail();
    renderPipelineDetail();
    renderSecurityDetail();
    renderCommitDetail();
    renderJobDetail();
  });
})();
