/**
 * ======================================================================
 * CORE QAI
 * Reference Integrity Test
 * ----------------------------------------------------------------------
 * Arquivo   : referenceIntegrity.test.js
 * Módulo    : Tests
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Garantir a integridade das referências utilizadas pelos módulos
 * analíticos do CORE QAI.
 *
 * Este teste verifica:
 *
 * 1. Todo referenceId utilizado por Evidence existe no catálogo.
 * 2. Todo referenceId utilizado por Hypothesis existe no catálogo.
 * 3. Todo referenceId utilizado por Mitigation existe no catálogo.
 * 4. Nenhuma referência inexistente permanece nos módulos.
 * 5. Referências desabilitadas não podem ser utilizadas.
 *
 * Este teste não altera o catálogo.
 * Não executa o Reference Resolver.
 * Não executa o Pipeline.
 * ======================================================================
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as ReferenceModule
    from "../src/references/index.js";


/* ======================================================================
 * PATHS
 * ====================================================================== */

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);

const PROJECT_ROOT =
    path.resolve(__dirname, "..");

const SRC_ROOT =
    path.join(PROJECT_ROOT, "src");


/* ======================================================================
 * ASSERT
 * ====================================================================== */

function assert(condition, message) {

    if (!condition) {

        throw new Error(message);

    }

}


/* ======================================================================
 * REFERENCE CATALOG
 * ======================================================================
 *
 * O teste aceita as estruturas atualmente utilizadas pelo catálogo
 * e também estruturas compatíveis com a futura Reference Library
 * de registro.
 * ======================================================================
 */

function extractReferenceEntries(value) {

    if (!value) {

        return [];

    }

    if (Array.isArray(value)) {

        return value.filter(

            item =>
                item &&
                typeof item === "object" &&
                typeof item.id === "string"

        );

    }

    if (
        typeof value === "object" &&
        typeof value.id === "string"
    ) {

        return [value];

    }

    if (
        typeof value === "object" &&
        value.catalog
    ) {

        return extractReferenceEntries(

            value.catalog

        );

    }

    if (
        typeof value === "object" &&
        value.references
    ) {

        return extractReferenceEntries(

            value.references

        );

    }

    if (typeof value === "object") {

        return Object.values(value).flatMap(

            item => {

                if (
                    item &&
                    typeof item === "object" &&
                    typeof item.id === "string"
                ) {

                    return [item];

                }

                return [];

            }

        );

    }

    return [];

}


/* ======================================================================
 * LOAD REFERENCE CATALOG
 * ======================================================================
 */

const catalogCandidates = [

    ReferenceModule.default,

    ReferenceModule.catalog,

    ReferenceModule.references,

    ReferenceModule.REFERENCE_CATALOG,

    ReferenceModule.REFERENCES

];

let references = [];

for (const candidate of catalogCandidates) {

    const entries =
        extractReferenceEntries(candidate);

    if (entries.length > 0) {

        references = entries;

        break;

    }

}

assert(

    references.length > 0,

    "Reference Integrity: catálogo de referências não encontrado."

);


/* ======================================================================
 * BUILD REFERENCE INDEX
 * ======================================================================
 */

const referenceMap =
    new Map();

for (const reference of references) {

    assert(

        typeof reference.id === "string" &&
        reference.id.trim().length > 0,

        "Reference Integrity: referência encontrada sem ID válido."

    );

    assert(

        !referenceMap.has(reference.id),

        `Reference Integrity: ID duplicado no catálogo: ${reference.id}`

    );

    referenceMap.set(

        reference.id,

        reference

    );

}


/* ======================================================================
 * MODULE DIRECTORIES
 * ======================================================================
 */

const moduleDirectories = [

    {
        name: "Evidence",
        path:
            path.join(
                SRC_ROOT,
                "evidences",
                "catalog"
            )
    },

    {
        name: "Hypothesis",
        path:
            path.join(
                SRC_ROOT,
                "hypotheses",
                "catalog"
            )
    },

    {
        name: "Mitigation",
        path:
            path.join(
                SRC_ROOT,
                "mitigations",
                "catalog"
            )
    }

];


/* ======================================================================
 * REFERENCE ID EXTRACTION
 * ======================================================================
 */

function extractReferenceIds(content) {

    const ids = [];

    /*
     * Captura estruturas como:
     *
     * referenceIds: [
     *
     *     "ashrae55",
     *     "ashrae62_1"
     *
     * ]
     */

    const blockPattern =
        /referenceIds\s*:\s*\[([\s\S]*?)\]/g;

    let blockMatch;

    while (
        (blockMatch =
            blockPattern.exec(content)) !== null
    ) {

        const block =
            blockMatch[1];

        const idPattern =
            /["'`]([^"'`]+)["'`]/g;

        let idMatch;

        while (
            (idMatch =
                idPattern.exec(block)) !== null
        ) {

            ids.push({

                id: idMatch[1],

                position:
                    blockMatch.index

            });

        }

    }

    return ids;

}


/* ======================================================================
 * TEST EXECUTION
 * ======================================================================
 */

console.log("");
console.log("========================================");
console.log("Reference Integrity");
console.log("========================================");


const usedReferences = [];


/* ======================================================================
 * SCAN MODULES
 * ======================================================================
 */

for (const module of moduleDirectories) {

    assert(

        fs.existsSync(module.path),

        `${module.name}: diretório de catálogo não encontrado: ${module.path}`

    );

    const files =
        fs.readdirSync(module.path)

            .filter(

                file =>
                    file.endsWith(".js")

            )

            .sort();


    for (const file of files) {

        const filePath =
            path.join(
                module.path,
                file
            );

        const content =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        const referenceIds =
            extractReferenceIds(content);


        for (const item of referenceIds) {

            usedReferences.push({

                module: module.name,

                file,

                id: item.id

            });


            /*
             * ==========================================================
             * EXISTENCE
             * ==========================================================
             */

            assert(

                referenceMap.has(item.id),

                `${module.name} ${file}: referência inexistente no catálogo: ${item.id}`

            );


            /*
             * ==========================================================
             * ENABLED
             * ==========================================================
             *
             * O campo ainda não é obrigatório na RC atual.
             *
             * Quando existir e estiver explicitamente como false,
             * a referência não poderá ser utilizada.
             */

            const reference =
                referenceMap.get(item.id);

            assert(

                reference.enabled !== false,

                `${module.name} ${file}: referência desabilitada sendo utilizada: ${item.id}`

            );

        }

    }

}


/* ======================================================================
 * RESULT
 * ======================================================================
 */

const uniqueUsedReferences =

    new Set(

        usedReferences.map(

            item => item.id

        )

    );


console.log(
    `✓ Catalog loaded (${references.length} references)`
);

console.log(
    `✓ References used (${uniqueUsedReferences.size} unique IDs)`
);

console.log(
    `✓ Evidence references`
);

console.log(
    `✓ Hypothesis references`
);

console.log(
    `✓ Mitigation references`
);

console.log(
    `✓ Reference existence`
);

console.log(
    `✓ No disabled references in use`
);

console.log(
    `✓ Reference integrity`
);

console.log("");
console.log("✓ REFERENCE INTEGRITY PASSED");