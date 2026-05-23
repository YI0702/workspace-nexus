// ===== 项目 Hub 交互逻辑 =====

function switchTab(tabName) {
  // 切换导航高亮
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  if (target) target.classList.add('active');

  // 切换内容
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const content = document.getElementById('tab-' + tabName);
  if (content) content.classList.add('active');

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 决策档案折叠 / 展开
function toggleDecision(cardId) {
  const card = document.getElementById(cardId);
  if (card) card.classList.toggle('expanded');
}

// 复制 SOUL prompt 到剪贴板
function copyPrompt() {
  const text = document.getElementById('soulPromptContent').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✓ 项目上下文已复制到剪贴板。\n粘贴到任何 AI 工具的对话开头使用。');
  }).catch(() => {
    alert('复制失败，请手动选中复制。');
  });
}

// 复制上下文卡片到剪贴板
function copyCtxCard(cardId) {
  const text = document.getElementById(cardId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✓ 上下文卡片已复制到剪贴板。');
  }).catch(() => {
    alert('复制失败，请手动选中复制。');
  });
}

// 支持 URL hash 直接定位
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('tab-' + hash)) {
    switchTab(hash);
  }
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('tab-' + hash)) {
    switchTab(hash);
  }
});
