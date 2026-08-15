/**
 * ======================================================================
 * CORE QAI
 * References Library Test
 * ======================================================================
 */

import REFERENCE_CATALOG from "../src/references/index.js";

console.log("");
console.log("========================================");
console.log("References Library");
console.log("========================================");

/* ======================================================================
 * CONTEXT
 * ======================================================================
 */

if (!Array.isArray(REFERENCE_CATALOG)) {

    throw new Error(
        "REFERENCE_CATALOG deve ser um Array."
    );

}

console.log("✓ Catalog");

/* ======================================================================
 * QUANTITY
 * ======================================================================
 */

if (REFERENCE_CATALOG.length !== 9) {

    throw new Error(
        `Quantidade inválida de referências: ${REFERENCE_CATALOG.length}. Esperado: 9.`
    );

}

console.log("✓ Reference count");

/* ======================================================================
 * IDS
 * ======================================================================
 */

const ids = REFERENCE_CATALOG.map(
    reference => reference.id
);

const uniqueIds = new Set(ids);

if (uniqueIds.size !== ids.length) {

    throw new Error(
        "Existem IDs duplicados no Reference Catalog."
    );

}

console.log("✓ Unique IDs");

/* ======================================================================
 * REQUIRED REFERENCES
 * ======================================================================
 */

const requiredIds = [

    "abnt_nbr_16401",

    "abnt_nbr_17037",

    "ashrae55",

    "ashrae62_1",

    "iso_7730",

    "nr17",

    "sensirion_nox",

    "sensirion_voc",

    "who_aqg_2021"

];

for (const id of requiredIds) {

    if (!ids.includes(id)) {

        throw new Error(
            `Referência obrigatória ausente: ${id}`
        );

    }

}

console.log("✓ Required references");

/* ======================================================================
 * REFERENCE STRUCTURE
 * ======================================================================
 */

for (const reference of REFERENCE_CATALOG) {

    if (!reference.id) {

        throw new Error(
            "Referência sem id."
        );

    }

    if (!reference.code) {

        throw new Error(
            `Referência ${reference.id} sem code.`
        );

    }

    if (!reference.title) {

        throw new Error(
            `Referência ${reference.id} sem title.`
        );

    }

    if (!reference.organization) {

        throw new Error(
            `Referência ${reference.id} sem organization.`
        );

    }

    if (!reference.status) {

        throw new Error(
            `Referência ${reference.id} sem status.`
        );

    }

    if (!Array.isArray(reference.applicability)) {

        throw new Error(
            `Referência ${reference.id} sem applicability válida.`
        );

    }

    if (!reference.sections) {

        throw new Error(
            `Referência ${reference.id} sem sections.`
        );

    }

}

console.log("✓ Reference structure");

/* ======================================================================
 * SECTION CONTRACT
 * ======================================================================
 */

for (const reference of REFERENCE_CATALOG) {

    for (const section of Object.values(
        reference.sections
    )) {

        if (!section.id) {

            throw new Error(
                `Seção sem id na referência ${reference.id}.`
            );

        }

        if (!section.key) {

            throw new Error(
                `Seção ${section.id} sem key na referência ${reference.id}.`
            );

        }

        if (!section.title) {

            throw new Error(
                `Seção ${section.id} sem title na referência ${reference.id}.`
            );

        }

        if (!Array.isArray(section.topics)) {

            throw new Error(
                `Seção ${section.id} sem topics na referência ${reference.id}.`
            );

        }

        if (!Array.isArray(section.applicability)) {

            throw new Error(
                `Seção ${section.id} sem applicability na referência ${reference.id}.`
            );

        }

    }

}

console.log("✓ Section contract");

/* ======================================================================
 * FINAL
 * ======================================================================
 */

console.log("");
console.log("✓ REFERENCES LIBRARY PASSED");
console.log("");