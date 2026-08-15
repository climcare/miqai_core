/**
 * ======================================================================
 * CORE QAI
 * QAI Score Test
 * ======================================================================
 */

import { calculateQaiScore }
    from "../../src/metrics/calculators/qaiScore.js";

import { runTest }
    from "../utils/runTest.js";

const ctx = {

    domain: {

        id: "corporate"

    },

    metrics: {

        thermalComfort: {

            score: 100

        },

        airQuality: {

            score: 100

        },

        particulateLoad: {

            score: 100

        },

        occupancy: {

            score: 100

        }

    }

};

const result =
    calculateQaiScore(ctx);

runTest({

    title: "QAI Score",

    result,

    expected: {

        score: 100,

        level: "EXCELLENT",

        dominantFactor: "thermalComfort"

    }

});