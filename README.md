# DOM viz
DOM viz is a Chrome extension that visualizes DOM mutations.

It uses the [MutationSummary](https://code.google.com/p/mutation-summary/wiki/APIReference)
API to listen for certain types of DOM mutations
(e.g. changing the style of a DOM element), and highlights the mutated element using
a CSS3 animation.

# Examples
Highlighting updated twitter pods:
![Twitter wobble](images/dom-viz-twitter-20140326.gif "Twitter highlight")

Using the wobble highlight effect:
![Twitter wobble](images/dom-viz-twitter-wobble-20140326.gif "Twitter wobble highlight")

The wobble highlight being triggered when an element changes color:
![Square wobble](images/dom-viz-square-20140326.gif "Square wobble highlight")

# How it works

## MutationSummary observer

The MutationSummary API exposes the `MutationSummary` object, which observes the DOM
for changes and calls your provided callback function.

The `MutationSummary` constructor takes an object specifier with a `callback`
field and a `query` field (among other optional fields):

```javascript
var observer = new MutationSummary({
  callback: mutationReactor,
  queries: [
    {attribute: 'style'},
    {element: '*'}
  ]
});
```
My "mutationReactor" callback is passed an array of mutation summaries, one for
each query specified in the `queries` field. Here I'm querying for style attribute
changes in the `attribute` query, and any element updates using the `element`
query:

```javascript
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
  ...
}
```

My callback consumes the array of mutation summary objects, iterating through
each update type. For the element style mutations, there are `valueChanged`,
`added`, and `removed` update types.


## (A note on creating the above animated gifs)

I did a screen capture using Quicktime, and converted the generated .mov file to a gif using `ffmpeg`:
```bash
[rule146@rule146: Desktop]$ ffmpeg -i twitter-wobble-dom-viz.mov -s 906x466 -f gif - | gifsicle --optimize=3 > dom-viz-twitter-wobble-20140326.gif
```
