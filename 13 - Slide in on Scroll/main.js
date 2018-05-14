function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
      };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll('.slide-in');
function checkSlide(e) {
  sliderImages.forEach(img => {
    // 滑动页面的底部距离扣除图片一半的高
    const slideInAt = (window.scrollY + window.innerHeight) - (img.height / 2);
    // 图片底部距离顶端的距离
    const imageBottom = img.offsetTop + img.height;
    // 已滑过了图片的一半
    const isHalfShown = slideInAt > img.offsetTop;
    // 未完全滑过图片
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  })
}
window.addEventListener('scroll', debounce(checkSlide));
