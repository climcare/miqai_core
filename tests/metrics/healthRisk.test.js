/**
 * ======================================================================
 * CORE QAI
 * Health Risk Test
 * ======================================================================
 */

import { calculateHealthRisk }
    from "../../src/metrics/calculators/healthRisk.js";

import { runTest }
    from "../utils/runTest.js";

const ctx = {

    validation: {

        co2: { passed: true },

        pm25: { passed: true },

        pm10: { passed: true },

        vocIndex: { passed: true },

        noxIndex: { passed: true }

    }

};

const result =
    calculateHealthRisk(ctx);

runTest({

    title: "Health Risk",

    result,

    expected: {

        score: 100,

        level: "EXCELLENT",

        dominantFactor: null

    }

});