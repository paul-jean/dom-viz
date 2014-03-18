var button = document.getElementById("mybutton");
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
  });
});
var config = {attributes:true, childList:true, characterData:true};
observer.observe(button, config);

button.style["background-color"] = "lightblue";

//observer.disconnect();
