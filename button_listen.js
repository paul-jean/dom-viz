// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log("style background-color = " + mutation.target.style["background-color"]);
  });
});
var config = {attributes:true, childList:true, characterData:true};
var square = document.getElementById("square");
observer.observe(square, config);


//observer.disconnect();
