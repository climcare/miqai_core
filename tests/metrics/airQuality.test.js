/**
 * ======================================================================
 * CORE QAI
 * Air Quality Test
 * ======================================================================
 */

import { calculateAirQuality }
    from "../../src/metrics/calculators/airQuality.js";

import { runTest }
    from "../utils/runTest.js";

const ctx = {

    validation: {

        co2: { passed: true },

        vocIndex: { passed: true },

        noxIndex: { passed: true }

    }

};

const result =
    calculateAirQuality(ctx);

runTest({

    title: "Air Quality",

    result,

    expected: {

        score: 100,

        level: "EXCELLENT",

        dominantFactor: null

    }

});