const activeBackground = document.createElement('span');
const links = document.getElementsByTagName('a');
activeBackground.setAttribute('class', 'highlight');
document.body.appendChild(activeBackground);

//避免第一次激活时跳动,如果没有此句，可以看到第一次标签被激活时，块元素会从左上角移动至对应标签处。
activeBackground.style.display = 'none';

function lightOn(e) {
    const activeLink = e.target.getBoundingClientRect();
    const coords = {
        height: activeLink.height,
        width: activeLink.width,
        left: window.pageXOffset + activeLink.left,
        top: window.pageYOffset + activeLink.top
    }
    activeBackground.style.height = `${coords.height}px`;
    activeBackground.style.width = `${coords.width}px`;
    activeBackground.style.left = `${coords.left}px`;
    activeBackground.style.top = `${coords.top}px`;
    activeBackground.style.display = 'inline';
}

[].forEach.call(links, link => link.onmouseenter = lightOn);