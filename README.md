# p5js-testing-demo

This is a work in progress with minimal documentation! Please get in touch if you have questions.

## About
This repo contains a demo to show how automated testing and feedback has been implemented for formative exercises in an introductory programming module in the Interactive Media BSc at the University of York. The module teaches programming using a creative coding approach. The goal of this project is to provide students with some feedback on the prescriptive elements of a task without adding constraints that don't directly relate to the learning objectives. The files can be used as a template to add automated testing and feedback to p5.js exercises.

## Using the template
To use the template, you will need to use p5.js in a standard editor, rather than the p5.js web editor. 

Create an HTML file to display the output of your p5.js sketch and the results of your tests. Link to [the p5.js library](https://p5js.org/get-started/#settingUp) in the head of your HTML file.

Add an element with id "results" to your HTML file. The tests will display the results in this element.

The `p5-testing-library` folder contains two scripts that must also be linked in the HTML. It is recommended that all JavaScript other than p5.js itself is linked at the end of the HTML body element, rather than in the head.
- `p5-testing-library/preload.js` should be linked *after* p5.js and *before* the code for your sketch. `preload.js` overrides the p5.js `preload()` function and turns off the animation loop. This allows tests to control how and when the animation advances, and to test the canvas state at specific frames. Note: this does not prevent `preload()` from being used in the sketch.
- `p5-testing-library/test-utils.js` should be linked *after* the code for your sketch. **Important**: `test-utils.js` is an ES6 module so the linking `<script>` tag should include the attribute `type="module"`.

Finally, create a JavaScript module that will use functionality from `test-utils.js` to test the sketch output. This new file should be linked *after* `test-utils.js`.

See `demo-exercise/lib/demo-tests.js` for an example test file, which you can run by opening `demo-exercise/check-exercise.html` in your browser, ideally with a local server. Here is a template containing the code to set up and run the tests:

```javascript
/**
 * A hacky way to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) { // p5.js has loaded i.e. drawn a canvas
        clearInterval(loadTimer); // Stop the timer
        runTests(canvases[0]); // Run the tests below
    }
}

/**
 * Run all tests.
 * @param {HTMLElement} canvas The HTML canvas created by p5.js
 */
async function runTests(canvas) {
    // SETUP - don't edit
    canvas.style.pointerEvents = "none"; // prevents p5.js from responding to mouse events independent of the tests
    substituteDraw(); 
    // Assumes the HTML file contains an element with the id #results.
    const resultsDiv = document.getElementById("results");
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    // END SETUP

    // YOUR TESTS HERE. Write unit test functions then use TestResults static methods to show test results e.g.:
    // TestResults.addPass("This test passed.");
    // TestResults.addFail("This test failed.");
    // TestResults.addWarning("This is a warning.");

    
    // This statement should be last - displays the messages added above
    TestResults.display(resultsDiv);
}

// Calls waitForP5() every half second until p5.js finishes loading
const loadTimer = setInterval(waitForP5, 500);
```

You will need to familiarise yourself with `test-utils.js` in order to design the tests. Proper documentation is on the way but in the meantime, please reach out for help getting started!

Key information about `test-utils.js`:
- The constants at the top of the file and the contents of the P5.JS MOCKS and MOCK SHAPES regions should not be modified (except to add new functionality). P5.JS MOCKS contains mocks for most of the main p5.js functions, such as `draw()` and the shape drawing functions. MOCK SHAPES contains classes that represent shapes drawn on the canvas by p5.js functions. It is worth getting to know these classes but modifying them will likely break the library.
- The GENERAL PURPOSE FUNCTIONS region contains functions that we have found useful in writing tests for p5.js sketches. They should all be documented (with varying degrees of clarity) but here are some of the key functions:
    - `advanceToFrame(frameNumber)`: Calls the sketch `draw()` function until the specified frame is reached. This is useful when testing how the canvas has changed from frame to frame.
    - `simulateKeyboardEvent()`: Used to run a specific keyboard event function with a given key e.g. simulate pressing "a" then run `keyPressed()`.
    - `runMouseClick()`: Runs mouse event functions that have been implemented.
- The section labelled GENERIC TESTS contains tests that have we used most often in our module. As with the general purpose functions, each test should be documented but it will be helpful to know that:
    - Functions that have the prefix `test` return a boolean that can be used by other code.
    - Functions that have the prefix `check` are for convenience. They call a test function and add pass / fail messages to the test results.
    - `getShapes()` will return an array of all shapes on the canvas at the current frame. 