var styleReactor = function(summaries) {
  mutationSummary = summaries[0];
  mutationSummary.valueChanged.forEach(function(changedElement) {
    // If I'm currently changing this element, don't do anything:
    if (changedElement.className && changedElement.className.match(/animating/))
      return;

    // Add my css keyframes tag to the element's classes:
    if (!changedElement.className.match('highlight'))
      changedElement.className += changedElement.className ? ' highlight': 'highlight';
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
        changedElement.className = changedElement.className.replace('highlight', '');
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
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var observer = new MutationSummary({
  callback: styleReactor,
  queries: [
    {attribute: 'style'}
  ]
});
