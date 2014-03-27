var effect = 'highlight';

var reactorDispatch = function(type) {
  if (type == 'style') return highlightElement;
  else if (type == 'add') return highlightElement;
  else if (type == 'character') return highlightElement;
  else return undefined;
};

var highlightElement = function(changedElement) {
  console.log(changedElement.className);
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
  // All DOM element style updates:
  var mutationSummaries = summaries[0];
  var mutationReactor = reactorDispatch('style');
  mutationSummaries.added.forEach(mutationReactor);
  mutationSummaries.removed.forEach(mutationReactor);
  mutationSummaries.reparented.forEach(mutationReactor);
  mutationSummaries.reordered.forEach(mutationReactor);
  var att = mutationSummaries.attributeChanged;
  for (var k in att) {
    if (!k.match('class')) {
      console.log(k);
      att[k].forEach(mutationReactor);
    }
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: mutationReactor,
  queries: [
    {all: true}
  ]
});
