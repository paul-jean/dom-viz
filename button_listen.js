var styleReactor = function(summaries) {
  mutationSummary = summaries[0];
  mutationSummary.valueChanged.forEach(function(changedElement) {
    var oldColor = changedElement.style['border-color'];
    var oldWidth = changedElement.style['border-width'];
    console.log('oldColor = ' + oldColor);
    console.log('oldWidth = ' + oldWidth);
    //changedElement.style['border-color'] = "red";
    //changedElement.style['border-width'] = "5px";

    changedElement.style.webkitTransition = "border-color 2s";
    changedElement.style['border-color'] = "yellow";
    //changedElement.style['border-color'] = oldColor;
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {attribute: "style"}
  ]
});
