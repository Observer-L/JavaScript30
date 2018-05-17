const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
const output = document.getElementById('bands');

// 去前缀函数，排序用
const delPrefix = item => item.replace(/^(The|A|An)\s{1}/,'');

//数组排序
const sortedbands = bands.sort((a,b) => delPrefix(a) > delPrefix(b) ? 1 : -1);

//展示至HTML页面
document.querySelector('#bands').innerHTML = '<li>'+sortedbands.join('</li><li>')+'</li>';

console.table(sortedbands);
