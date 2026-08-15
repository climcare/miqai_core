/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highOccupancy.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highOccupancy",

    title: "Ocupação elevada",

    description:
        "Foi observada elevada ocupação estimada para o ambiente.",

    priority: 65,

    when(ctx) {

        return (
            ctx.metrics?.occupancy?.level === "HIGH"
        );

    }

});