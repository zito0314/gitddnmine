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

(function(){ const R=window.GitddnRender; let currentVStatus='all', currentSeverity='all';
  function counts(sev){ const sum=sev.critical+sev.high+sev.medium+sev.low; if(!sum) return '<span class="vuln-badge none">취약점 없음</span>'; return ['critical','high','medium','low'].filter(k=>sev[k]).map(k=>`<span class="vuln-badge ${k}">${k[0].toUpperCase()} ${sev[k]}</span>`).join(''); }
  function row(s){ const chip=s.vstatus==='pass'?'green':s.vstatus==='failed'?'red':s.vstatus==='running'?'running':'orange'; const pol=s.policy==='blocked'?'blocked':s.policy==='allowed'?'allowed':'orange'; const max=s.severity.critical?'critical':s.severity.high?'high':s.severity.medium?'medium':s.severity.low?'low':'none';
    return `<tr data-vstatus="${s.vstatus}" data-project="${s.projectKey}" data-repo="${s.repo}" data-mr-status="${s.mrStatus}" data-severity="${max}" onclick="goDetail(event)"><td><div class="mr-title-cell"><strong>MR #${s.mrId} ${R.h(s.mrTitle)}</strong><span>${R.h(s.branch)}</span></div></td><td><div class="repo-cell"><strong>${R.h(s.repo)}</strong><span>${R.h(s.project)}</span></div></td><td><span class="chip ${chip}">${R.h(s.vlabel)}</span></td><td><div class="vuln-count-row">${counts(s.severity)}</div></td><td><span class="chip ${pol}">${R.h(s.policyLabel)}</span></td><td>${R.h(s.lastCheckedAt)}</td><td><button class="row-action" type="button" onclick="goDetail(event)">상세 보기</button></td></tr>`; }
  function render(){ const body=document.getElementById('secTable'); if(!body) return; body.innerHTML=GITDDN_MOCK.security.validations.map(row).join(''); filterSec(); }
  window.setVStatusTab=function(status){ currentVStatus=status; document.querySelectorAll('[data-vstatus]').forEach(t=>{ if(t.classList.contains('status-tab')) t.classList.toggle('active',t.dataset.vstatus===status); }); filterSec(); };
  window.toggleSeverity=function(btn){ currentSeverity=btn.dataset.severity||'all'; document.querySelectorAll('.severity-chip').forEach(c=>c.classList.toggle('inactive', c!==btn && currentSeverity!=='all')); filterSec(); };
  window.filterSec=function(){ const q=(document.getElementById('secSearch')?.value||'').toLowerCase(); const project=document.getElementById('projectFilter')?.value||'all'; const repo=document.getElementById('repoFilter')?.value||'all'; const mr=document.getElementById('mrStatusFilter')?.value||'all'; let cnt=0; document.querySelectorAll('#secTable tr').forEach(row=>{ const sevOk=currentSeverity==='all'||row.dataset.severity===currentSeverity; const ok=(!q||row.innerText.toLowerCase().includes(q))&&(project==='all'||row.dataset.project===project)&&(repo==='all'||row.dataset.repo===repo)&&(mr==='all'||row.dataset.mrStatus===mr)&&(currentVStatus==='all'||row.dataset.vstatus===currentVStatus)&&sevOk; row.style.display=ok?'':'none'; if(ok)cnt++; }); const empty=document.getElementById('emptyState'); if(empty) empty.style.display=cnt?'none':'block'; };
  window.goDetail=function(event){ event?.stopPropagation?.(); location.href='./security-detail.html'; };
  document.addEventListener('DOMContentLoaded', render);
})();
