var button = document.getElementById("mybutton");
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
    console.log(mutation.target.firstChild.data);
    console.log(mutation.target.style["background-color"]);
    mutation.target.style["background-color"] = "lightred";
    console.log(mutation.target.style["background-color"]);
  });
});
var config = {attributes:true, childList:true, characterData:true};
observer.observe(button, config);

button.firstChild.data = "click me !!!";

//observer.disconnect();
