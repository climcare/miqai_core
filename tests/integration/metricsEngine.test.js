/**
 * ======================================================================
 * CORE QAI
 * Metrics Engine Integration Test
 * ----------------------------------------------------------------------
 * Arquivo : metricsEngine.test.js
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar a integração completa da Metrics Engine.
 * ======================================================================
 */

import { calculateMetrics }
    from "../../src/metrics/metricsEngine.js";

/*
 * Contexto de teste
 */

const ctx = {

    domain: {

        id: "corporate"

    },

    validation: {

        temperature: {

            passed: true

        },

        humidity: {

            passed: true

        },

        co2: {

            passed: true

        },

        pm25: {

            passed: true

        },

        pm10: {

            passed: true

        },

        vocIndex: {

            passed: true

        },

        noxIndex: {

            passed: true

        }

    }

};

/*
 * Executa a Metrics Engine
 */

calculateMetrics(ctx);

console.log("");
console.log("========================================");
console.log("Metrics Engine");
console.log("========================================");

const metrics = ctx.metrics;

const expected = [

    "thermalComfort",

    "airQuality",

    "particulateLoad",

    "occupancy",

    "qaiScore",

    "healthRisk"

];

let passed = true;

for (const metric of expected) {

    if (metrics[metric]) {

        console.log(`✓ ${metric}`);

    }

    else {

        console.log(`✗ ${metric}`);

        passed = false;

    }

}

console.log("");

if (passed) {

    console.log("✓ METRICS ENGINE PASSED");

}

else {

    console.log("✗ METRICS ENGINE FAILED");

}