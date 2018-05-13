const container = [];
const key = "ELPSYCONGROO";
const input = document.querySelector('#pressed');
window.addEventListener('keyup', handleKey);

function handleKey(e) {
  container.push(e.key);
  container.splice(-key.length -1, container.length - key.length);

  if (container.join('').toUpperCase() == key) {
    console.log('DING DING!');
  	cornify_add();
  }

  input.innerText += e.key;
}
