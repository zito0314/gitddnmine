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
  const R=window.GitddnRender; let currentStatus='all';
  const progCls=(p)=> p>=100?'green is-100':p>=50?'orange is-50':'red is-0';
  function mrRow(m, full=true){ const pipeline=R.status(m.pipeline); const status=R.status(m.status); const secCls=m.security==='passed'?'green':m.security==='failed'?'red':''; const revCls=m.review==='approved'?'green':m.review==='rejected'?'red':m.review==='need-review'?'orange':''; const pct=Math.round(m.approved/m.required*100);
    return `<tr data-status="${m.status}" data-repo="${m.repo}" data-owner="${m.owner}" data-review="${m.review}" onclick="openMrDetail('repository')"><td>${R.h(m.updatedAt)}</td><td><div class="mr-title"><strong>MR #${m.id} ${R.h(m.title)}</strong><span>${R.h(m.summary)}</span></div></td>${full?`<td><div class="repo-info"><strong>${R.h(m.repo)}</strong><span>${R.h(m.repoGroup)}</span></div></td>`:''}<td><div class="branch-flow"><span><strong class="mono">${R.h(m.source)}</strong></span><span>→ <strong class="mono">${R.h(m.target)}</strong></span></div></td><td>${R.h(m.author)}</td><td><span class="chip ${pipeline.chip}">${R.h(pipeline.label)}</span></td><td><span class="chip ${secCls}">${R.h(m.securityLabel)}</span></td><td><span class="chip ${revCls}">${R.h(m.reviewLabel)}</span></td><td><div class="review-progress"><span>${m.approved}/${m.required} Approved</span><div class="progress-bar"><div class="progress-fill ${progCls(pct)}"></div></div></div></td><td>${m.comments}</td><td><span class="chip ${status.chip}">${status.label}</span></td></tr>`;
  }
  function renderMrList(){ const body=document.getElementById('mrTable'); if(body){ body.innerHTML=GITDDN_MOCK.mergeRequests.list.map(m=>mrRow(m,true)).join(''); filterMrs(); }
    const repoBody=document.getElementById('mrTableBody'); if(repoBody && document.body.classList.contains('page-repository-detail')){ repoBody.innerHTML=GITDDN_MOCK.mergeRequests.list.slice(0,4).map(m=>`<tr class="mr-clickable-row" data-status="${m.status}" onclick="openMrDetail()"><td>${R.h(m.updatedAt)}</td><td><strong>MR #${m.id} ${R.h(m.title)}</strong><br><small>${R.h(m.source)} → ${R.h(m.target)}</small></td><td>${R.h(m.author)}</td><td><span class="status-chip ${R.status(m.pipeline).chip}">${R.status(m.pipeline).label}</span></td><td><span class="status-chip ${m.security==='passed'?'green':m.security==='failed'?'red':'gray'}">${R.h(m.securityLabel)}</span></td><td><span class="status-chip ${m.review==='approved'?'green':m.review==='rejected'?'red':m.review==='need-review'?'orange':'gray'}">${R.h(m.reviewLabel)}</span></td><td>${m.approved}/${m.required} Approved</td><td>${m.comments}</td><td><span class="status-chip ${R.status(m.status).chip}">${R.status(m.status).label}</span></td></tr>`).join(''); }
  }
  window.setStatusTab=function(status){ currentStatus=status; document.querySelectorAll('.status-tab').forEach(t=>t.classList.toggle('active',t.dataset.status===status)); filterMrs(); };
  window.filterMrs=function(keyword){ const q=(keyword || document.getElementById('mrSearch')?.value || '').toLowerCase().trim(); const repo=document.getElementById('repoFilter')?.value||'all'; const owner=document.getElementById('ownerFilter')?.value||'all'; const review=document.getElementById('reviewFilter')?.value||'all'; let cnt=0; document.querySelectorAll('#mrTable tr, #mrTableBody tr').forEach(row=>{ const ok=(!q||row.innerText.toLowerCase().includes(q))&&(repo==='all'||row.dataset.repo===repo)&&(owner==='all'||row.dataset.owner===owner)&&(review==='all'||row.dataset.review===review)&&(currentStatus==='all'||row.dataset.status===currentStatus); row.style.display=ok?'':'none'; if(ok)cnt++; }); const empty=document.getElementById('emptyState'); if(empty) empty.style.display=cnt?'none':'block'; };
  window.openMrDetail=function(){ location.href='./mr-detail.html'; };
  document.addEventListener('DOMContentLoaded', renderMrList);
})();
