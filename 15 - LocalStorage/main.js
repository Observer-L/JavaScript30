const form = document.querySelector('.add-items');
const itemInput = form.querySelector('input[name="item"]');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const selectAll = document.querySelector('.select-all');



function addItem(e) {
  e.preventDefault();
  const text = itemInput.value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done
      ? 'checked'
      : ''} >
            <label for="item${i}">${plate.text}</label>
        </li>
      `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleSelect(e) {
  this.checked ? items.forEach(i => i.done = true) : items.forEach(i => i.done = false);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

form.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
selectAll.addEventListener('click', toggleSelect);
populateList(items, itemsList);
