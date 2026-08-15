import assert from "node:assert/strict";

import HypothesisLibrary from "../src/hypotheses/index.js";

console.log();
console.log("========================================");
console.log("Hypothesis Library");
console.log("========================================");

const ctx = {

    diagnosis: {

        primary: {

            id: "insufficient_ventilation"

        }

    },

    evidence: {

        records: [

            {

                id: "elevated_co2"

            },

            {

                id: "elevated_particulate"

            }

        ]

    },

    metrics: {

        occupancy: {

            level: "VERY_HIGH"

        }

    }

};

HypothesisLibrary.execute(ctx);

assert.ok(ctx.hypotheses);

console.log("✓ Context");

assert.equal(

    ctx.hypotheses.primary.id,

    "insufficient_air_renewal"

);

console.log("✓ Primary hypothesis");

assert.equal(

    ctx.hypotheses.matches.length,

    3

);

console.log("✓ Matches");

assert.equal(

    ctx.hypotheses.secondary[0].id,

    "excessive_occupancy"

);

console.log("✓ Secondary");

console.log();
console.log("✓ HYPOTHESIS LIBRARY PASSED");