const panels = document.querySelectorAll('.panel');
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

function toggleOpen(e) {
  this.classList.toggle('panel-actived');
}

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}
