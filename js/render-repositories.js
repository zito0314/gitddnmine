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
  const R=window.GitddnRender;
  let currentStatus='all';
  function row(repo){ const st=R.status(repo.status); const disabled=repo.status==='approved'?'':' is-disabled';
    const fav=repo.favorite?'active':''; const star=repo.favorite?'★':'☆'; const action=repo.status==='pending'?`<button class="row-action danger" type="button" onclick="cancelRepositoryRequest(event)">요청 취소</button>`:repo.status==='rejected'?`<button class="row-action" type="button" onclick="showRejectReason(event)">반려 사유</button>`:'';
    return `<div class="repository-item${disabled}" data-name="${R.h(repo.name)}" data-group="${repo.groupKey}" data-type="${repo.typeKey}" data-status="${repo.status}" data-favorite="${repo.favorite}" onclick="openRepositoryDetail(event)"><button class="favorite-button ${fav}" type="button" ${repo.status==='approved'?'':'disabled'} onclick="toggleFavorite(event,this)">${star}</button><div class="repo-name"><strong>${R.h(repo.name)}</strong><span class="repo-group">${R.h(repo.group)}</span><span class="repo-description">${R.h(repo.description)}</span></div><span class="chip ${st.chip}">${st.label}</span><div class="repo-meta-line"><strong>${R.h(repo.type)}</strong><span class="repo-cell-note">${R.h(repo.updatedAt)}</span></div><div class="repo-status-action">${action}</div></div>`;
  }
  function renderRepositories(){ const el=document.getElementById('repoList'); if(!el) return; el.innerHTML=GITDDN_MOCK.repositories.list.map(row).join(''); filterRepositories(); }
  window.setStatusTab=function(status){ currentStatus=status; document.querySelectorAll('.status-tab').forEach(t=>t.classList.toggle('active',t.dataset.status===status)); filterRepositories(); };
  window.filterRepositories=function(){ const q=(document.getElementById('repoSearch')?.value||'').toLowerCase().trim(); const group=document.getElementById('groupFilter')?.value||'all'; const type=document.getElementById('typeFilter')?.value||'all'; let cnt=0; document.querySelectorAll('#repoList .repository-item').forEach(row=>{ const ok=(!q||row.innerText.toLowerCase().includes(q))&&(group==='all'||row.dataset.group===group)&&(type==='all'||row.dataset.type===type)&&(currentStatus==='all'||row.dataset.status===currentStatus); row.style.display=ok?'grid':'none'; if(ok) cnt++; }); const empty=document.getElementById('emptyState'); if(empty) empty.style.display=cnt?'none':'block'; };
  window.toggleFavorite=function(event,button){ event.stopPropagation(); button.classList.toggle('active'); button.textContent=button.classList.contains('active')?'★':'☆'; showToast?.(button.classList.contains('active')?'즐겨찾기에 추가되었습니다.':'즐겨찾기가 해제되었습니다.'); };
  window.openRepositoryDetail=function(event){ if(event?.target?.closest('button')) return; const row=event?.currentTarget; if(row?.dataset.status==='approved') location.href='./repository-detail.html'; else showToast?.('승인 완료된 Repository만 상세로 이동할 수 있습니다.'); };
  window.cancelRepositoryRequest=function(event){ event.stopPropagation(); showToast?.('Repository 생성 요청이 취소되었습니다.'); };
  window.showRejectReason=function(event){ event.stopPropagation(); showToast?.('반려 사유: 외부 파트너 SDK 반입 승인 문서가 누락되었습니다.'); };
  document.addEventListener('DOMContentLoaded', renderRepositories);
})();
