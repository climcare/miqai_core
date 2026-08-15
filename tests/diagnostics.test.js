import assert from "node:assert/strict";

import DiagnosticLibrary from "../src/diagnostics/index.js";

console.log();
console.log("========================================");
console.log("Diagnostics Library");
console.log("========================================");

const ctx = {

    validation: {

        temperature: { passed: true },

        humidity: { passed: true },

        co2: { passed: false },

        pm25: { passed: true },

        pm10: { passed: true },

        vocIndex: { passed: true },

        noxIndex: { passed: true }

    },

    metrics: {

        thermalComfort: {

            score: 100,

            level: "EXCELLENT"

        },

        airQuality: {

            score: 60,

            level: "MODERATE"

        },

        particulateLoad: {

            score: 100,

            level: "EXCELLENT"

        },

        occupancy: {

            score: 40,

            level: "HIGH"

        },

        healthRisk: {

            score: 90,

            level: "GOOD"

        }

    }

};

DiagnosticLibrary.execute(ctx);

assert.ok(ctx.diagnosis);

assert.equal(

    ctx.diagnosis.primary.id,

    "insufficient_ventilation"

);

console.log("✓ Primary diagnosis");

assert.ok(

    ctx.diagnosis.matches.length > 0

);

console.log("✓ Matches");

assert.ok(

    ctx.diagnosis.secondary.length >= 1

);

console.log("✓ Secondary");

console.log();
console.log("✓ DIAGNOSTICS PASSED");