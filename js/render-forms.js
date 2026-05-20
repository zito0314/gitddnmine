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

(function(){ const R=window.GitddnRender;
  const getForms = () => window.GITDDN_MOCK?.forms || {};
  function renderRepositoryForm(){ const f=getForms(); R.setOptions(document.getElementById('policyTemplate'), f.repositoryTemplates || [], '선택'); const list=document.getElementById('memberList'); if(list && f.repositoryMembers){ list.innerHTML=f.repositoryMembers.map(email=>`<div class="member-row"><input type="email" placeholder="member@company.com" value="${R.h(email)}" /><button class="remove-button" type="button" onclick="removeMemberRow(this)">×</button></div>`).join('') + `<div class="member-row"><input type="email" placeholder="member@company.com" /><button class="remove-button" type="button" onclick="removeMemberRow(this)">×</button></div>`; } }
  function renderMrForm(){ const f=getForms(); R.setOptions(document.getElementById('repository'), f.mrRepositories || []); R.setOptions(document.getElementById('sourceBranch'), f.sourceBranches || []); R.setOptions(document.getElementById('targetBranch'), f.targetBranches || []); const list=document.getElementById('reviewerList'); if(list && f.reviewers){ list.innerHTML=f.reviewers.map(r=>`<div class="reviewer-row"><input type="email" value="${R.h(r.email)}" placeholder="reviewer@company.com" /><select><option ${r.role==='리뷰어'?'selected':''}>리뷰어</option><option ${r.role==='승인자'?'selected':''}>승인자</option><option ${r.role==='리뷰어 + 승인자'?'selected':''}>리뷰어 + 승인자</option></select><button class="remove-button" type="button" onclick="removeReviewerRow(this)">×</button></div>`).join(''); }
    window.branchCommitData=f.branchCommits; if(window.updateBranchCommitInfo) updateBranchCommitInfo(); }
  document.addEventListener('DOMContentLoaded', ()=>{ renderRepositoryForm(); renderMrForm(); });
})();
