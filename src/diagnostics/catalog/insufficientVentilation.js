/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : insufficientVentilation.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar ambientes com indícios de ventilação insuficiente.
 *
 * Este diagnóstico representa exclusivamente uma classificação técnica
 * baseada nas informações produzidas pela Validation Engine e pelo
 * Metrics Engine.
 *
 * Não identifica causas.
 * Não confirma falhas em sistemas HVAC.
 * Não interpreta normas.
 * Não gera evidências.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const INSUFFICIENT_VENTILATION = Object.freeze({

    id: "insufficient_ventilation",

    name: "Ventilação Insuficiente",

    priority: 100,

    when(ctx) {

        const validation = ctx.validation ?? {};
        const metrics = ctx.metrics ?? {};

        /*
         * Evidência proveniente da Validation:
         * concentração de CO₂ fora da faixa regulatória.
         */

        if (
            validation.co2 &&
            !validation.co2.passed
        ) {

            return true;

        }

        /*
         * Evidência proveniente das Metrics:
         * ocupação estimada elevada.
         */

        if (
            metrics.occupancy &&
            (
                metrics.occupancy.level === "HIGH" ||
                metrics.occupancy.level === "VERY_HIGH"
            )
        ) {

            return true;

        }

        /*
         * Evidência proveniente das Metrics:
         * qualidade geral do ar comprometida.
         */

        if (
            metrics.airQuality &&
            (
                metrics.airQuality.level === "MODERATE" ||
                metrics.airQuality.level === "POOR"
            )
        ) {

            return true;

        }

        return false;

    }

});

export default INSUFFICIENT_VENTILATION;