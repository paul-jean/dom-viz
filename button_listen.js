var styleReactor = function(summaries) {
  mutationSummary = summaries[0];
  mutationSummary.valueChanged.forEach(function(changedElement) {
    console.log("styleReactor");
    if (changedElement.getAttribute("myUpdateQ")) return;
    var myAttr = document.createAttribute("myUpdateQ");
    myAttr.value = true;
    changedElement.setAttributeNode(myAttr);
    console.log("element name = " + changedElement.id);
    console.log("myUpdateQ = " + changedElement.getAttribute("myUpdateQ"));
    var oldBorder = changedElement.style["border"];
    var oldColor = changedElement.style["border-color"];
    changedElement.style["border"] = "3px solid";
    var level = 1;
    var fade = function() {
      console.log("level = " + level);
      var hex = level.toString(16);
      //changedElement.style["border-color"] = '#FFFF' + hex + hex;
      if (level == 14) {
        myAttr.value = false;
        changedElement.setAttributeNode(myAttr);
        clearInterval(intId);
      }
      level ++;
    };
    setInterval(fade, 1000);
    changedElement.style["border"] = oldBorder;
    changedElement.style["border-color"] = oldColor;
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {attribute: "style"}
  ]
});
