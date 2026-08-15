/**
 * ======================================================================
 * CORE QAI
 * Particulate Load Test
 * ======================================================================
 */

import { calculateParticulateLoad }
    from "../../src/metrics/calculators/particulateLoad.js";

import { runTest }
    from "../utils/runTest.js";

const ctx = {

    validation: {

        pm25: { passed: true },

        pm10: { passed: true }

    }

};

const result =
    calculateParticulateLoad(ctx);

runTest({

    title: "Particulate Load",

    result,

    expected: {

        score: 100,

        level: "EXCELLENT",

        dominantFactor: null

    }

});