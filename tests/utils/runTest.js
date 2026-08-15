/**
 * ======================================================================
 * CORE QAI
 * Test Runner
 * ======================================================================
 */

import { assertEqual } from "./assert.js";

export function runTest({

    title,

    result,

    expected

}) {

    console.log("");
    console.log("========================================");
    console.log(title);
    console.log("========================================");

    let passed = true;

    passed &= assertEqual(
        "Score",
        expected.score,
        result.score
    );

    passed &= assertEqual(
        "Level",
        expected.level,
        result.level
    );

    passed &= assertEqual(
        "Dominant Factor",
        expected.dominantFactor,
        result.dominantFactor
    );

    console.log("");

    if (passed) {

        console.log("✓ TEST PASSED");

    }

    else {

        console.log("✗ TEST FAILED");

    }

    return Boolean(passed);

}