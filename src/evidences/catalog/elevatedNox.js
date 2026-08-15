/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : elevatedNox.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de índice elevado de óxidos de nitrogênio (NOx),
 * identificada pela Validation Engine.
 *
 * Esta evidência representa exclusivamente um fato observado durante
 * a análise.
 *
 * Não interpreta causas.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const ELEVATED_NOX = Object.freeze({

    /*
     * Identificador único.
     */

    id: "elevated_nox",

    /*
     * Parâmetro relacionado.
     */

    parameter: "noxIndex",

    /*
     * Título para apresentação.
     */

    title: "Índice elevado de NOx",

    /*
     * Descrição técnica da evidência.
     */

    description:
        "Foi identificado índice de óxidos de nitrogênio (NOx) acima do limite de referência aplicável ao ambiente analisado.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "sensirion_nox"

    ],

    /*
     * Prioridade.
     */

    priority: 60,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.validation.noxIndex &&

            !ctx.validation.noxIndex.passed

        );

    }

});

export default ELEVATED_NOX;