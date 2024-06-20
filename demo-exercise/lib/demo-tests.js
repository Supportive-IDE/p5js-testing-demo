import { TestResults, advanceToFrame, canvasStatus, getShapes, substituteDraw } from "../../p5js-testing-library/test-utils.js";

/*** EXERCISE-SPECIFIC TEST FUNCTIONS. These functions are called from runTests() below. */

function getDistances(shapes, startX, startY) {
    const distances = [];
    for (const shape of shapes) {
        distances.push({x: startX - shape.x, y: startY - shape.y});
    }
    return distances;
}

function testFrame1() {
    advanceToFrame(1);
    const startX = 0;
    const startY = 200;
    mouseX = startX;
    mouseY = startY;
    advanceToFrame(2);
    const shapes = getShapes();
    if (shapes.length === 0) {
        TestResults.addFail("No shapes have been drawn on the canvas. Try again when you have designed your character.");
    }
    
    return getDistances(shapes, startX, startY);
}

function testMoveRight(expectedDistances) {
    const newX = 150;
    const newY = 200;
    mouseX = newX;
    mouseY = newY;
    advanceToFrame(frameCount + 1);
    const shapes = getShapes();
    if (shapes.length > expectedDistances.length) {
        TestResults.addFail(`Frame ${frameCount} has more shapes than there were in the first frame. Did you forget to draw the background?`);
    } else if (shapes.length === expectedDistances.length) {
        const newDistances = getDistances(shapes, newX, newY);
        let matches = 0;
        let mismatches = 0;
        for (let i = 0; i < expectedDistances.length; i++) {
            if (expectedDistances[i].x === newDistances[i].x && expectedDistances[i].y === newDistances[i].y) {
                matches++;
            } else {
                mismatches++;
            }
        }
        if (matches === expectedDistances.length) {
            TestResults.addPass(`When the mouse moves right, the character moves right.`);
        } else if (mismatches === expectedDistances.length) {
            console.log(expectedDistances);
            console.log(newDistances);
            TestResults.addFail(`When the mouse moves right, the character does not move right.`);
        } else {
            TestResults.addFail(`When the mouse moves right, some shapes move right but some do not. Did you forget to make some shape coordinates relative to the mouse position?`)
        }
    } else {
        TestResults.addFail(`Frame ${frameCount} has fewer shapes than there were in the first frame.`)
    }
}

function testMoveLeft(expectedDistances) {
    const newX = 100;
    const newY = 200;
    mouseX = newX;
    mouseY = newY;
    advanceToFrame(frameCount + 1);
    const shapes = getShapes();
    if (shapes.length > expectedDistances.length) {
        TestResults.addFail(`Frame ${frameCount} has more shapes than there were in the first frame. Did you forget to draw the background?`);
    } else if (shapes.length === expectedDistances.length) {
        const newDistances = getDistances(shapes, newX, newY);
        let matches = 0;
        let mismatches = 0;
        for (let i = 0; i < expectedDistances.length; i++) {
            if (expectedDistances[i].x === newDistances[i].x && expectedDistances[i].y === newDistances[i].y) {
                matches++;
            } else {
                mismatches++;
            }
        }
        if (matches === expectedDistances.length) {
            TestResults.addPass(`When the mouse moves left, the character moves left.`);
        } else if (mismatches === expectedDistances.length) {
            TestResults.addFail(`When the mouse moves left, the character does not move left.`);
        } else {
            TestResults.addFail(`When the mouse moves left, some shapes move left but some do not. Did you forget to make some shape coordinates relative to the mouse position?`)
        }
    } else {
        TestResults.addFail(`Frame ${frameCount} has fewer shapes than there were in the first frame.`)
    }
}

function testMoveUp(expectedDistances) {
    const newX = 100;
    const newY = 100;
    mouseX = newX;
    mouseY = newY;
    advanceToFrame(frameCount + 1);
    const shapes = getShapes();
    if (shapes.length > expectedDistances.length) {
        TestResults.addFail(`Frame ${frameCount} has more shapes than there were in the first frame. Did you forget to draw the background?`);
    } else if (shapes.length === expectedDistances.length) {
        const newDistances = getDistances(shapes, newX, newY);
        let matches = 0;
        let mismatches = 0;
        for (let i = 0; i < expectedDistances.length; i++) {
            if (expectedDistances[i].x === newDistances[i].x && expectedDistances[i].y === newDistances[i].y) {
                matches++;
            } else {
                mismatches++;
            }
        }
        if (matches === expectedDistances.length) {
            TestResults.addPass(`When the mouse moves up, the character moves up.`);
        } else if (mismatches === expectedDistances.length) {
            TestResults.addFail(`When the mouse moves up, the character does not move up.`);
        } else {
            TestResults.addFail(`When the mouse moves up, some shapes move up but some do not. Did you forget to make some shape coordinates relative to the mouse position?`)
        }
    } else {
        TestResults.addFail(`Frame ${frameCount} has fewer shapes than there were in the first frame.`)
    }
}

function testMoveDown(expectedDistances) {
    const newX = 100;
    const newY = 150;
    mouseX = newX;
    mouseY = newY;
    advanceToFrame(frameCount + 1);
    const shapes = getShapes();
    if (shapes.length > expectedDistances.length) {
        TestResults.addFail(`Frame ${frameCount} has more shapes than there were in the first frame. Did you forget to draw the background?`);
    } else if (shapes.length === expectedDistances.length) {
        const newDistances = getDistances(shapes, newX, newY);
        let matches = 0;
        let mismatches = 0;
        for (let i = 0; i < expectedDistances.length; i++) {
            if (expectedDistances[i].x === newDistances[i].x && expectedDistances[i].y === newDistances[i].y) {
                matches++;
            } else {
                mismatches++;
            }
        }
        if (matches === expectedDistances.length) {
            TestResults.addPass(`When the mouse moves down, the character moves down.`);
        } else if (mismatches === expectedDistances.length) {
            TestResults.addFail(`When the mouse moves down, the character does not move down.`);
        } else {
            TestResults.addFail(`When the mouse moves down, some shapes move down but some do not. Did you forget to make some shape coordinates relative to the mouse position?`)
        }
    } else {
        TestResults.addFail(`Frame ${frameCount} has fewer shapes than there were in the first frame.`)
    }
}

/*** END EXERCISE-SPECIFIC TEST FUNCTIONS */

/** REQUIRED FUNCTIONS */

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

    const expectedDistances = testFrame1();
    if (expectedDistances.length > 0) {
        testMoveRight(expectedDistances);
        testMoveLeft(expectedDistances);
        testMoveUp(expectedDistances);
        testMoveDown(expectedDistances);
    }
    // This statement should be last - displays the messages added above
    TestResults.display(resultsDiv);
}

// Calls waitForP5() every half second until p5.js finishes loading
const loadTimer = setInterval(waitForP5, 500);
