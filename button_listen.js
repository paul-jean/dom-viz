// Yanked from "Javascript The Good Parts" p. 38
var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style["border-color"] = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 1000);
    }
  };
  setTimeout(step, 1000);
};

var styleReactor = function(summaries) {
  mutationSummary = summaries[0];
  mutationSummary.valueChanged.forEach(function(changedElement) {
    console.log("styleReactor");
    changedElement.style["border"] = "3px solid";
    var level = 1;
    var intervalId = setInterval(function() {
      var hex = level.toString(16);
      if (level < 15) {
        changedElement.style["border-color"] = '#FFFF' + hex + hex;
        level += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    //changedElement.style["border"] = "0px";
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {attribute: "style"}
  ]
});
