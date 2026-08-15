import assert from "node:assert/strict";

import MitigationLibrary from "../src/mitigations/index.js";

console.log();
console.log("========================================");
console.log("Mitigation Library");
console.log("========================================");

const ctx = {

    hypotheses: {

        primary: {

            id: "insufficient_air_renewal"

        },

        matches: [

            {

                id: "insufficient_air_renewal"

            },

            {

                id: "excessive_occupancy"

            },

            {

                id: "outdoor_pollution"

            }

        ]

    },

    evidence: {

        records: [

            {

                id: "elevated_particulate"

            }

        ]

    }

};

MitigationLibrary.execute(ctx);

assert.ok(ctx.mitigation);

console.log("✓ Context");

assert.equal(

    ctx.mitigation.primary.id,

    "increase_ventilation"

);

console.log("✓ Primary mitigation");

assert.equal(

    ctx.mitigation.actions.length,

    4

);

console.log("✓ Actions");

assert.equal(

    ctx.mitigation.secondary[0].id,

    "reduce_occupancy"

);

console.log("✓ Secondary");

console.log();
console.log("✓ MITIGATION LIBRARY PASSED");