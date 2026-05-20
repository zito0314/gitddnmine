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

// dashboard.html은 현재 index.html로 redirect되는 파일이라 별도 렌더링은 하지 않습니다.
