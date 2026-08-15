/**
 * ======================================================================
 * CORE QAI
 * Pipeline Integration Test
 * ----------------------------------------------------------------------
 * Arquivo : pipeline.test.js
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar a execução completa do CORE QAI através da API pública.
 * ======================================================================
 */

import AnalisarQualidadeAmbiental
    from "../src/engine/analysis.js";

console.log("");
console.log("========================================");
console.log("CORE QAI PIPELINE");
console.log("========================================");
console.log("");

try {

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

    console.log("✓ Pipeline executado.");
    console.log("");

    console.log("Resposta produzida:");
    console.dir(response, { depth: null });

    console.log("");

    console.log("✓ PIPELINE TEST PASSED");

}
catch (error) {

    console.log("");

    console.log("✗ PIPELINE TEST FAILED");
    console.log("");

    console.error(error);

}