const poetrys = [];
const endpoint = 'https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json';

fetch(endpoint).then(r => r.json()).then(data => poetrys.push(...data))

const searchInput = document.querySelector('.search');
const lists = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);
function displayMatches() {
  if (this.value.trim() == '') return;

  const inputValue = this.value.replace(/\s+/g, "");
  const matches = findMatches(inputValue, poetrys);
  const regex = new RegExp(inputValue, 'gi');
  const html = matches.map(poet => {
    const text = poet.detail_text.replace(regex, `<span class="hl">${inputValue}</span>`);
    const title = poet.title.replace(regex, `<span class="hl">${inputValue}</span>`);
    const author = poet.detail_author[0] ? poet.detail_author.join('').replace(regex, `<span class="hl">${inputValue}</span>`) : '无名';

    return `
          <li>
            <span class="poet">${text}</span>
            <span class="detail">
              <span class="title">${title}</span>
              <span class="author">${author}</span>
            </span>
          </li>
          `
  }).join('');
  lists.innerHTML = html;
};

function findMatches(wordToMatch, poetrys) {
  const regex = new RegExp(wordToMatch, 'gi');
  const matches = poetrys.filter(poet => poet.detail_text.match(regex) || poet.title.match(regex) || poet.detail_author.join('').match(regex));
  return matches
};
