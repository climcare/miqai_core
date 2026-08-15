import assert from "node:assert/strict";

import AnalisarQualidadeAmbiental
    from "../src/engine/analysis.js";

console.log();
console.log("========================================");
console.log("CORE QAI E2E");
console.log("========================================");

const response = AnalisarQualidadeAmbiental({

    environment: "corporate",

    reading: {

        temperature: 23,

        humidity: 50,

        co2: 650,

        pm25: 6,

        pm10: 12,

        vocIndex: 90,

        noxIndex: 1

    }

});

assert.ok(response);

console.log("✓ Response");


/* ======================================================================
 * METADATA
 * ====================================================================== */

assert.equal(

    response.metadata.engine,

    "CORE QAI"

);

console.log("✓ Metadata");


/* ======================================================================
 * DOMAIN
 * ====================================================================== */

assert.equal(

    response.domain.id,

    "corporate"

);

console.log("✓ Domain");


/* ======================================================================
 * QAI SCORE
 * ====================================================================== */

assert.equal(

    response.metrics.qaiScore.score,

    100

);

console.log("✓ QAI Score");


/* ======================================================================
 * QAI LEVEL
 * ====================================================================== */

assert.equal(

    response.metrics.qaiScore.level,

    "EXCELLENT"

);

console.log("✓ QAI Level");


/* ======================================================================
 * DIAGNOSIS
 * ====================================================================== */

assert.equal(

    response.diagnosis.primary.id,

    "normal_environment"

);

console.log("✓ Diagnosis");


/* ======================================================================
 * HYPOTHESIS
 * ====================================================================== */

assert.equal(

    response.hypotheses.primary.id,

    "normal_operation"

);

console.log("✓ Hypothesis");


/* ======================================================================
 * MITIGATION
 * ====================================================================== */

assert.equal(

    response.mitigation.primary.id,

    "maintain_current_operation"

);

console.log("✓ Mitigation");


/* ======================================================================
 * REFERENCES
 * ======================================================================
 *
 * O E2E deve garantir que a resposta final do CORE QAI não apenas
 * produza diagnóstico, hipótese e mitigação, mas também apresente
 * a fundamentação normativa correspondente.
 *
 * A referência primária deve possuir:
 *
 * - referência;
 * - seção;
 * - match.
 * ====================================================================== */

assert.ok(

    response.references,

    "References ausentes na resposta."

);

console.log("✓ References");


assert.ok(

    response.references.primary,

    "Referência primária ausente."

);


assert.ok(

    response.references.primary.reference,

    "Objeto da referência primária ausente."

);


assert.ok(

    response.references.primary.section,

    "Seção da referência primária ausente."

);


assert.ok(

    response.references.primary.match,

    "Match da referência primária ausente."

);


/* ======================================================================
 * PRIMARY REFERENCE
 * ====================================================================== */

assert.equal(

    response.references.primary.reference.id,

    "abnt_nbr_16401",

    `Referência primária inesperada: ${
        response.references.primary.reference.id
    }`

);

console.log("✓ Primary Reference");


/* ======================================================================
 * PRIMARY SECTION
 * ====================================================================== */

assert.equal(

    response.references.primary.section.id,

    "part2",

    `Seção primária inesperada: ${
        response.references.primary.section.id
    }`

);

console.log("✓ Primary Section");


/* ======================================================================
 * PRIMARY MATCH
 * ====================================================================== */

assert.equal(

    response.references.primary.match.topic,

    "thermalComfort",

    `Topic da referência primária inesperado: ${
        response.references.primary.match.topic
    }`

);


assert.equal(

    response.references.primary.match.applicability,

    "corporate",

    `Aplicabilidade da referência primária inesperada: ${
        response.references.primary.match.applicability
    }`

);


assert.equal(

    response.references.primary.match.jurisdiction,

    "BR",

    `Jurisdição da referência primária inesperada: ${
        response.references.primary.match.jurisdiction
    }`

);

console.log("✓ Primary Match");


/* ======================================================================
 * SECONDARY REFERENCES
 * ====================================================================== */

assert.ok(

    Array.isArray(
        response.references.secondary
    ),

    "References.secondary deve ser um array."

);


assert.ok(

    response.references.secondary.length >= 1,

    "Nenhuma referência secundária foi encontrada."

);

console.log("✓ Secondary References");


/* ======================================================================
 * REFERENCE MATCHES
 * ====================================================================== */

assert.ok(

    Array.isArray(
        response.references.matches
    ),

    "References.matches deve ser um array."

);


assert.ok(

    response.references.matches.length >= 1,

    "Nenhum match de referência foi produzido."

);

console.log("✓ Reference Matches");


/* ======================================================================
 * PROCESSING TIME
 * ====================================================================== */

assert.ok(

    response.metadata.processingTime >= 0

);

console.log("✓ Processing Time");


console.log();
console.log("✓ CORE QAI E2E PASSED");