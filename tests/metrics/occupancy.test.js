/**
 * ======================================================================
 * CORE QAI
 * Occupancy Test
 * ======================================================================
 */

import { calculateOccupancy }
    from "../../src/metrics/calculators/occupancy.js";

import { runTest }
    from "../utils/runTest.js";

const ctx = {

    validation: {

        co2: {

            passed: true

        }

    }

};

const result =
    calculateOccupancy(ctx);

runTest({

    title: "Occupancy",

    result,

    expected: {

        score: 100,

        level: "LOW",

        dominantFactor: null

    }

});