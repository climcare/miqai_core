import assert from "node:assert/strict";

import EvidenceLibrary from "../src/evidences/index.js";

console.log();
console.log("========================================");
console.log("Evidence Library");
console.log("========================================");

const ctx = {

    validation: {

        temperature: {

            passed: true

        },

        humidity: {

            passed: true

        },

        co2: {

            passed: false

        },

        pm25: {

            passed: false

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

EvidenceLibrary.execute(ctx);

assert.ok(ctx.evidence);

console.log("✓ Context");

assert.equal(

    ctx.evidence.primary.id,

    "elevated_co2"

);

console.log("✓ Primary evidence");

assert.equal(

    ctx.evidence.records.length,

    2

);

console.log("✓ Records");

assert.equal(

    ctx.evidence.secondary[0].id,

    "elevated_particulate"

);

console.log("✓ Secondary");

console.log();
console.log("✓ EVIDENCE LIBRARY PASSED");