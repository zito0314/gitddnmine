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

(function(){ const R=window.GitddnRender; let currentPipelineFilter='all';
  function row(p){ const result=p.result||p.status; const chip=result==='passed'?'green':result==='failed'?'red':result==='canceled'?'orange':p.status==='running'?'orange':''; const jobs=p.jobs.map(j=>`<span class="pipeline-status-icon ${j}"></span>`).join(''); const action=p.action==='cancel'?`<button class="secondary-button small danger-text" type="button" data-pipeline-action="cancel" onclick="togglePipelineRun(event,this)">실행 취소</button>`:p.action==='rerun'?`<button class="secondary-button small" type="button" data-pipeline-action="rerun" onclick="togglePipelineRun(event,this)">재실행</button>`:`<span class="table-action-placeholder">-</span>`;
    return `<tr data-status="${p.status}" onclick="location.href='./pipeline-detail.html'"><td>${R.h(p.updatedAt)}</td><td><div class="mr-title"><strong>#${p.id}</strong><span>${R.h(p.title)}</span><div class="chip-row"><span class="chip ${chip}">${R.h(result[0].toUpperCase()+result.slice(1))}</span><span class="chip blue">${R.h(p.trigger)}</span></div></div></td><td><div class="repo-info"><strong>${R.h(p.repo)}</strong><span>${R.h(p.repoGroup)}</span></div></td><td><div class="branch-flow"><a href="./repository-detail.html#files" onclick="event.preventDefault();event.stopPropagation();window.location.assign('./repository-detail.html#files');"><strong class="mono">${R.h(p.branch)}</strong></a><span>→ <strong class="mono">${R.h(p.target)}</strong></span></div></td><td>${R.h(p.author)}</td><td><a class="code-chip" href="./commit-detail.html" onclick="event.preventDefault();event.stopPropagation();window.location.assign('./commit-detail.html');">${R.h(p.commit)}</a></td><td><div class="stage-status-row">${jobs}</div></td><td>${action}</td></tr>`; }
  function render(){ const body=document.getElementById('pipelineTableBody'); if(body){ body.innerHTML=GITDDN_MOCK.pipelines.list.map(row).join(''); updatePipelineCounts(); filterPipelineRows(currentPipelineFilter); } }
  window.updatePipelineCounts=function(){ const rows=[...document.querySelectorAll('#pipelineTableBody tr')]; const counts={all:rows.length,running:0,failed:0,finished:0}; rows.forEach(r=>counts[r.dataset.status]=(counts[r.dataset.status]||0)+1); Object.entries(counts).forEach(([k,v])=>{ const el=document.querySelector(`[data-count="${k}"]`); if(el) el.textContent=v; }); };
  window.filterPipelineRows=function(status='all'){ currentPipelineFilter=status; window.currentPipelineFilter=status; document.querySelectorAll('[data-pipeline-filter]').forEach(t=>t.classList.toggle('active',t.dataset.pipelineFilter===status)); const q=(document.getElementById('pipelineSearch')?.value||'').toLowerCase(); let cnt=0; document.querySelectorAll('#pipelineTableBody tr').forEach(row=>{ const ok=(status==='all'||row.dataset.status===status)&&(!q||row.innerText.toLowerCase().includes(q)); row.style.display=ok?'':'none'; if(ok)cnt++; }); const empty=document.getElementById('pipelineEmptyState'); if(empty) empty.style.display=cnt?'none':'block'; };
  window.togglePipelineRun=function(event,button){ event.stopPropagation(); showToast?.(button.dataset.pipelineAction==='cancel'?'Pipeline 실행이 취소되었습니다.':'Pipeline을 재실행합니다.'); };
  document.addEventListener('DOMContentLoaded', render);
})();
