# DOM viz
DOM viz is a Chrome extension that visualizes DOM transformations.

It uses the [MutationSummary](https://code.google.com/p/mutation-summary/wiki/APIReference)
API to listen for certain types of DOM mutations
(e.g. changes to DOM element style), and highlights the mutated element using
a CSS3 animation.

# Examples
Highlighting updated twitter pods:
![Twitter wobble](images/dom-viz-twitter-20140326.gif "Twitter highlight")

Using the wobble highlight effect:
![Twitter wobble](images/dom-viz-twitter-wobble-20140326.gif "Twitter wobble highlight")

The wobble highlight being triggered when an element changes color:
![Square wobble](images/dom-viz-square-20140326.gif "Square wobble highlight")

## (A note on creating the above animated gifs)

I did a screen capture using Quicktime, and converted the generated .mov file to a gif using `ffmpeg`:
```bash
[rule146@rule146: Desktop]$ ffmpeg -i twitter-wobble-dom-viz.mov -s 906x466 -f gif - | gifsicle --optimize=3 > dom-viz-twitter-wobble-20140326.gif
```
