var effect = 'highlight';

var reactorDispatch = function(type) {
  if (type == 'style') return highlightElement;
  else if (type == 'add') return highlightElement;
  else if (type == 'character') return highlightElement;
  else return undefined;
};

var highlightElement = function(changedElement) {
  // If I'm currently changing this element, don't do anything:
  if (changedElement.className && changedElement.className.match(/animating/))
    return;

  // Add my css keyframes tag to the element's classes:
  if (!changedElement.className.match(effect))
    changedElement.className += changedElement.className ? ' ' + effect : effect;
  // Add a solid border so my highlight animation can style it:
  if (!changedElement.className.match('framed'))
    changedElement.className += ' framed';

  // When the animation starts ...
  var beginAnimListen = function() {
    // ... add a class to flag it as currently animating:
    changedElement.className += changedElement.className ? ' animating': 'animating';
  };

  // When the animation ends ...
  var endAnimListen = function() {
    // ... remove the classes I added:
    if (changedElement.className) {
      // TODO this may leave some whitespace in the class name
      changedElement.className = changedElement.className.replace('animating', '');
      changedElement.className = changedElement.className.replace(effect, '');
      changedElement.className = changedElement.className.replace('framed', '');
    }
    // ... remove animation event listeners:
    changedElement.removeEventListener('webkitAnimationStart', beginAnimListen);
    changedElement.removeEventListener('webkitAnimationEnd', endAnimListen);
  };

  // Add animation event listeners:
  // http://www.sitepoint.com/css3-animation-javascript-event-handlers/
  changedElement.addEventListener('webkitAnimationStart', beginAnimListen, false);
  changedElement.addEventListener('webkitAnimationEnd', endAnimListen, false);
};

var mutationReactor = function(summaries) {
  // DOM element style updates:
  var styleSummaries = summaries[0];
  var styleReactor = reactorDispatch('style');
  styleSummaries.valueChanged.forEach(styleReactor);
  styleSummaries.added.forEach(styleReactor);
  styleSummaries.removed.forEach(styleReactor);

  // DOM elements added:
  var elementSummaries = summaries[1];
  var addReactor = reactorDispatch('add');
  elementSummaries.added.forEach(addReactor);
  elementSummaries.removed.forEach(addReactor);
  elementSummaries.reparented.forEach(addReactor);

  // CharacterData elements changed:
  /*
  var characterSummaries = summaries[2];
  var characterReactor = reactorDispatch('character');
  characterSummaries.valueChanged.forEach(characterReactor);
  */
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: mutationReactor,
  queries: [
    {attribute: 'style'},
    {element: '*'}
    //{characterData: true}
  ]
});
