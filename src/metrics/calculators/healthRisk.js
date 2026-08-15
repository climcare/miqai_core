/**
 * ======================================================================
 * CORE QAI
 * Health Risk Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : healthRisk.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular um indicador agregado de risco potencial à saúde
 * utilizando os parâmetros críticos identificados durante a
 * Validation Engine.
 *
 * Entrada:
 *      ctx.validation
 *
 * Saída:
 *      {
 *          score,
 *          level,
 *          dominantFactor
 *      }
 * ======================================================================
 */

import { resolveScoreLevel } from "../utils/scoreLevel.js";

export function calculateHealthRisk(ctx) {

    const validation = ctx.validation || {};

    const factors = [

        {
            name: "co2",
            result: validation.co2,
            penalty: 30
        },

        {
            name: "pm25",
            result: validation.pm25,
            penalty: 30
        },

        {
            name: "pm10",
            result: validation.pm10,
            penalty: 20
        },

        {
            name: "vocIndex",
            result: validation.vocIndex,
            penalty: 10
        },

        {
            name: "noxIndex",
            result: validation.noxIndex,
            penalty: 10
        }

    ];

    let score = 100;

    let dominantFactor = null;

    let highestPenalty = 0;

    for (const factor of factors) {

        if (!factor.result) {

            continue;

        }

        if (!factor.result.passed) {

            score -= factor.penalty;

            if (factor.penalty > highestPenalty) {

                highestPenalty = factor.penalty;

                dominantFactor = factor.name;

            }

        }

    }

    score = Math.max(
        0,
        Math.min(100, score)
    );

    return {

        score,

        level: resolveScoreLevel(score),

        dominantFactor

    };

}