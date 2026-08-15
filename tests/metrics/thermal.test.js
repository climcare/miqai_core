/**
 * ======================================================================
 * CORE QAI
 * Thermal Comfort Test
 * ----------------------------------------------------------------------
 * Arquivo : thermal.test.js
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar o cálculo de Thermal Comfort.
 * ======================================================================
 */

import { calculateThermalComfort }
    from "../../src/metrics/calculators/thermalComfort.js";

import { runTest }
    from "../utils/runTest.js";

/*
 * Contexto de teste
 */

const ctx = {

    validation: {

        temperature: {

            passed: true

        },

        humidity: {

            passed: true

        }

    }

};

/*
 * Executa o cálculo
 */

const result =
    calculateThermalComfort(ctx);

/*
 * Resultado esperado
 */

runTest({

    title: "Thermal Comfort",

    result,

    expected: {

        score: 100,

        level: "EXCELLENT",

        dominantFactor: null

    }

});