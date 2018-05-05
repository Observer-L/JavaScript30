const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  // 根据自定义的 data-sizing 获取参数的后缀
  const suffix = this.dataset.sizing || '';
  // 设置页面 CSS 变量的值
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  // 页面参数实时显示
  document.querySelector(`.${this.name}`).innerText = this.value + suffix;
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
// 在滑块拖动过程中也实时变化
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
