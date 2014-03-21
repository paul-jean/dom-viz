var styleReactor = function(summaries) {
  console.log(summaries);
  mutationSummary = summaries[0];
  console.log(mutationSummary);
  mutationSummary.attributeChanged.forEach(function(changedElement) {
    console.log(changedElement);
    changedElement.style["border"] = "5px solid";
    changedElement.style["border-color"] = "red";
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {all: true}
  ]
});
