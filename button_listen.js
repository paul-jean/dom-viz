var styleReactor = function(summaries) {
  console.log("event fired");
  mutationSummary = summaries[0];
  mutationSummary.valueChanged.forEach(function(changedElement) {
    var oldBorder = changedElement.style["border"];
    console.log(oldBorder);

    changedElement.style["border"] = "thick solid yellow";
    changedElement.style.webkitTransition = "border-color 2s";

    setTimeout(function() {
      changedElement.style["border"] = oldBorder;
    }, 2000);

  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {attribute: "style"}
  ]
});
