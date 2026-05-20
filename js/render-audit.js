// render-audit.js
// audit-log.html의 하드코딩 데이터를 mock-data.js에서 가져와 렌더링합니다.

let currentSeverity = "all";

function getAuditData() {
  return window.GITDDN_MOCK?.audit || {
    summaryCards: [],
    actors: [],
    targets: [],
    logs: []
  };
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTimeOnly(time) {
  return String(time || "").split(" ")[1] || time || "-";
}

function renderAuditSummary() {
  const container = document.getElementById("auditSummary");
  if (!container) return;

  const { summaryCards } = getAuditData();

  container.innerHTML = summaryCards.map((card) => `
    <article class="summary-card">
      <div class="summary-label">${escapeHTML(card.label)}</div>
      <div class="summary-value ${escapeHTML(card.valueClass)}">${escapeHTML(card.value)}</div>
      <div class="summary-note">${escapeHTML(card.note)}</div>
    </article>
  `).join("");
}

function renderAuditFilterOptions() {
  const { actors, targets } = getAuditData();
  const actorFilter = document.getElementById("actorFilter");
  const targetFilter = document.getElementById("targetFilter");

  if (actorFilter) {
    actorFilter.innerHTML = `
      <option value="all">전체 사용자</option>
      ${actors.map((actor) => `<option value="${escapeHTML(actor.value)}">${escapeHTML(actor.label)}</option>`).join("")}
    `;
  }

  if (targetFilter) {
    targetFilter.innerHTML = `
      <option value="all">전체 대상</option>
      ${targets.map((target) => `<option value="${escapeHTML(target.value)}">${escapeHTML(target.label)}</option>`).join("")}
    `;
  }
}

function renderAuditRows() {
  const table = document.getElementById("auditTable");
  if (!table) return;

  const { logs } = getAuditData();

  table.innerHTML = logs.map((log, index) => `
    <tr
      data-index="${index}"
      data-severity="${escapeHTML(log.severity)}"
      data-actor="${escapeHTML(log.actor)}"
      data-target="${escapeHTML(log.target)}"
      data-date="${escapeHTML(String(log.time).slice(0, 10))}"
      onclick="selectAuditLog(this)"
    >
      <td>
        <div class="event-title">
          <strong>${escapeHTML(log.title)}</strong>
          <span class="mono">${escapeHTML(log.id)} · ${escapeHTML(log.eventCode)}</span>
        </div>
      </td>
      <td>
        <div class="actor-info">
          <strong>${escapeHTML(log.actorName)}</strong>
          <span>${escapeHTML(log.actorRole)}</span>
        </div>
      </td>
      <td>
        <div class="target-info">
          <strong>${escapeHTML(log.targetName)}</strong>
          <span>${escapeHTML(log.targetDetail)}</span>
        </div>
      </td>
      <td><span class="chip ${escapeHTML(log.resultClass)}">${escapeHTML(log.result)}</span></td>
      <td class="mono">${escapeHTML(getTimeOnly(log.time))}</td>
      <td class="mono">${escapeHTML(log.ip)}</td>
    </tr>
  `).join("");
}

function getLogFromRow(row) {
  const { logs } = getAuditData();
  const index = Number(row?.dataset?.index);
  return logs[index] || null;
}

function setSeverityTab(severity) {
  currentSeverity = severity;

  document.querySelectorAll(".status-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.severity === severity);
  });

  filterAuditLogs();
}

function filterAuditLogs() {
  const keyword = document.getElementById("auditSearch")?.value.trim().toLowerCase() || "";
  const actor = document.getElementById("actorFilter")?.value || "all";
  const target = document.getElementById("targetFilter")?.value || "all";
  const date = document.getElementById("dateFilter")?.value || "";
  const rows = Array.from(document.querySelectorAll("#auditTable tr"));
  let visibleCount = 0;

  rows.forEach((row) => {
    const log = getLogFromRow(row);
    if (!log) return;

    const keywordText = [
      log.id,
      log.eventCode,
      log.title,
      log.message,
      log.actorName,
      log.actorRole,
      log.targetName,
      log.targetDetail,
      log.result,
      log.ip
    ].join(" ").toLowerCase();

    const matchesKeyword = !keyword || keywordText.includes(keyword);
    const matchesSeverity = currentSeverity === "all" || log.severity === currentSeverity;
    const matchesActor = actor === "all" || log.actor === actor;
    const matchesTarget = target === "all" || log.target === target;
    const matchesDate = !date || String(log.time).startsWith(date);
    const isVisible = matchesKeyword && matchesSeverity && matchesActor && matchesTarget && matchesDate;

    row.style.display = isVisible ? "" : "none";
    if (isVisible) visibleCount += 1;
  });

  const emptyState = document.getElementById("emptyState");
  if (emptyState) emptyState.style.display = visibleCount === 0 ? "block" : "none";

  const selected = document.querySelector("#auditTable tr.selected");
  if (!selected || selected.style.display === "none") {
    const firstVisible = rows.find((row) => row.style.display !== "none");
    if (firstVisible) {
      selectAuditLog(firstVisible);
    } else {
      clearAuditDetail();
    }
  }
}

function selectAuditLog(row) {
  const log = getLogFromRow(row);
  if (!log) return;

  document.querySelectorAll("#auditTable tr").forEach((item) => item.classList.remove("selected"));
  row.classList.add("selected");

  const detailSeverity = document.getElementById("detailSeverity");
  if (detailSeverity) {
    detailSeverity.className = `chip ${log.resultClass}`;
    detailSeverity.textContent = log.result;
  }

  document.getElementById("detailTitle").textContent = log.title;
  document.getElementById("detailMessage").textContent = log.message;
  document.getElementById("detailId").textContent = log.id;
  document.getElementById("detailTime").textContent = log.time;
  document.getElementById("detailIp").textContent = log.ip;
  document.getElementById("detailResult").textContent = log.result;
}

function clearAuditDetail() {
  const detailSeverity = document.getElementById("detailSeverity");
  if (detailSeverity) {
    detailSeverity.className = "chip";
    detailSeverity.textContent = "-";
  }

  document.getElementById("detailTitle").textContent = "선택된 로그가 없습니다.";
  document.getElementById("detailMessage").textContent = "검색어나 필터 조건을 변경해보세요.";
  document.getElementById("detailId").textContent = "-";
  document.getElementById("detailTime").textContent = "-";
  document.getElementById("detailIp").textContent = "-";
  document.getElementById("detailResult").textContent = "-";
}

function initAuditPage() {
  renderAuditSummary();
  renderAuditFilterOptions();
  renderAuditRows();
  filterAuditLogs();
}

document.addEventListener("DOMContentLoaded", initAuditPage);

window.setSeverityTab = setSeverityTab;
window.filterAuditLogs = filterAuditLogs;
window.selectAuditLog = selectAuditLog;
