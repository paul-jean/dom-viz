var greeting = "hola, ";
var button = document.getElementById("mybutton");
button.person_name = "Roberto";
button.addEventListener("click", function() {
  button.style["background-color"] = "lightblue";
  console.log(button.name);
  alert(greeting + button.person_name + ".");
}, false);

