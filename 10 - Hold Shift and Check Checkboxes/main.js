const boxes = document.querySelectorAll('.item input');
boxes.forEach(box => box.addEventListener('click', handleCheck));

// 1
// let lastChecked;
// function handleCheck(e) {
//   let inBetween = false;
// 	if(e.shiftKey && this.checked){
// 		boxes.forEach(input => {
// 			if(input === lastChecked || input ===this) {
// 				inBetween = !inBetween;
// 			}
// 			if(inBetween) {
// 				input.checked = true;
// 			}
// 	});
// 	}
// 	lastChecked = this;
// }

// 2
// const boxesArr = Array.from(boxes);
// let lastChecked;
// let onOff = false;
//
// function handleCheck(e) {
//   if(!lastChecked) lastChecked = this;
// 	onOff = lastChecked.checked ? true : false;
// 	if(e.shiftKey) {
// 		let start = boxesArr.indexOf(this);
// 		let end = boxesArr.indexOf(lastChecked);
// 		boxesArr.slice(Math.min(start, end), Math.max(start, end) + 1)
// 		           .forEach(input => input.checked = onOff);
// 	}
// 	lastChecked = this;
// }

// 3
let click;
let selectClick;
let cancelClick;

function handleCheck(e) {
  if (e.shiftKey && this.checked) {
    selectClick = this;
    selectBox();
  } else if (e.shiftKey && !this.checked) {
    cancelClick = this;
    cancelBox();
  } else if (this.checked) {
    click = this;
    selectClick = undefined;
    cancelClick = undefined;
  } else {
    click = undefined;
    selectClick = undefined;
    cancelClick = undefined;
  }};

  function selectBox(e) {
    let inBetween = false;
    boxes.forEach(box => {
      if (box === click || box === selectClick) inBetween = !inBetween;
      if (inBetween && click !== undefined) box.checked = true;
    })
  };

function cancelBox() {
  let inBetween = false;
  boxes.forEach(box => {
    if (box === selectClick || box === cancelClick) inBetween = !inBetween;
    if (inBetween || box === selectClick) box.checked = false;
})};

window.addEventListener('keyup', e => {
    if (e.keyCode === 16 || e.shiftKey) {
        click = undefined;
    };
})
