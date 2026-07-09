(function(){
  const style = document.createElement('style');
  style.textContent = 'img{-webkit-user-drag:none;-webkit-touch-callout:none;}';
  document.head.appendChild(style);

  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
})();
