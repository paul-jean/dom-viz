var effect = 'highlight';

var reactorDispatch = function(type) {
	if (type == 'style') return highlightElement('framed');
	else if (type == 'add') return highlightElement('framed-addremove');
	//else if (type == 'fill') return highlightSVGElement;
	else return null;
};

/*
   var highlightSVGElement = function(changedElement) {
   console.log('[highlightSVGElement] changedElement = ' + changedElement);
   changedElement.style.stroke = "yellow";
   changedElement.style["stroke-width"] = "5";
   };
   */

var highlightElement = function(type) {
	return function(changedElement) {
		/*
		   if (changedElement.constructor.name == 'SVGRectElement') {
		   console.log('[highlightElement] style = ' + changedElement.getAttribute('style'));
		   console.log('[highlightElement] style fill = ' + changedElement.style.fill);
		   console.log('[highlightElement] className = ' + changedElement.getAttribute('className'));
		   console.log('[highlightElement] typeof changedElement = ' + changedElement.constructor.name);
		   console.log('changedElement is an SVGRectElement');
		   }
		   */
		// If I'm currently changing this element, don't do anything:
		if (changedElement.getAttribute('className') && changedElement.className.match(/animating/))
			return;

		// Add my css keyframes tag to the element's classes:
		if (!changedElement.className.match(effect))
			changedElement.className += changedElement.className ? ' ' + effect : effect;
		// Add a solid border so my highlight animation can style it:
		if (!changedElement.className.match(/framed.*/))
		changedElement.className += ' ' + type;

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
			changedElement.className = changedElement.className.replace(type, '');
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
};

var mutationReactor = function(summaries) {

	// SVG element updates
	/*
	   var fillSummaries = summaries[0];
	   var fillReactor = reactorDispatch('fill');
	   fillSummaries.attributeChanged.style.forEach(fillReactor);
	   */

	// DOM element style updates:
	var styleSummaries = summaries[1];
	var styleReactor = reactorDispatch('style');
	styleSummaries.valueChanged.forEach(styleReactor);
	styleSummaries.added.forEach(styleReactor);
	styleSummaries.removed.forEach(styleReactor);


	// DOM elements added:
	var elementSummaries = summaries[2];
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
		{element: 'rect', elementAttributes: 'style'},
		{attribute: 'style'},
		{element: '*'}
		//{characterData: true}
	]
});
