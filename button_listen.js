var styleReactor = function(summaries) {
  mutationSummary = summaries[0];
  console.log(mutationSummary);
  mutationSummary.valueChanged.forEach(function(changedElement) {

    var oldBorderStyle;
    changedElement.className = 'highlight';
      changedElement.style['border-style'] = 'solid';

    var beginAnimListen = function() {
      oldBorderStyle = changedElement.style['border-style'];
      console.log('oldBorderStyle = ' + oldBorderStyle);
      changedElement.style['border-style'] = 'solid';
    };

    var endAnimListen = function() {
      changedElement.style['border-style'] = oldBorderStyle;
    };

    changedElement.addEventListener('animationstart', beginAnimListen, false);
    changedElement.addEventListener('animationend', endAnimListen, false);

    changedElement.style.webkitAnimationName = 'highlight';
    changedElement.style.webkitAnimationDuration = '1s';
    changedElement.style.webkitAnimationDirection = 'normal';
    changedElement.style.webkitAnimationIterationCount = '1';

  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {attribute: "style"}
  ]
});
