/**
 * ======================================================================
 * CORE QAI
 * Reference Resolver Test
 * ======================================================================
 */

import resolveReferences from "../src/references/resolver.js";

console.log("");
console.log("========================================");
console.log("Reference Resolver");
console.log("========================================");

/* ======================================================================
 * ASSERT
 * ======================================================================
 */

function assert(condition, message) {

    if (!condition) {

        throw new Error(message);

    }

}

/* ======================================================================
 * TEST 1 — NORMAL ENVIRONMENT
 * ======================================================================
 */

const normalContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        temperature: {
            value: 23,
            passed: true
        },

        humidity: {
            value: 50,
            passed: true
        },

        co2: {
            value: 650,
            passed: true
        },

        pm25: {
            value: 6,
            passed: true
        }

    },

    diagnosis: {

        primary: {
            id: "normal_environment"
        }

    },

    evidence: {

        primary: {

            id: "normal_environment",

            referenceIds: [

                "ashrae55",
                "ashrae62_1",
                "abnt_nbr_16401"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {
            id: "normal_operation"
        }

    }

};

const normalResult =
    resolveReferences(normalContext);

assert(

    normalResult &&
    Array.isArray(normalResult.matches),

    "Resolver não retornou matches."

);

console.log("✓ Normal environment");

/* ======================================================================
 * TEST 2 — CO2
 * ======================================================================
 */

const co2Context = {

    domain: {
        id: "corporate"
    },

    validation: {

        co2: {

            value: 1450,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "insufficient_ventilation"

        }

    },

    evidence: {

        primary: {

            id: "elevated_co2",

            parameter: "co2",

            referenceIds: [

                "ashrae62_1",
                "abnt_nbr_16401"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "insufficient_air_renewal"

        }

    }

};

const co2Result =
    resolveReferences(co2Context);

assert(

    co2Result.primary !== null,

    "CO2: Resolver não encontrou referência primária."

);

assert(

    co2Result.primary.reference.id ===
        "abnt_nbr_16401",

    `CO2: referência primária incorreta: ${
        co2Result.primary.reference.id
    }`

);

assert(

    co2Result.secondary.some(

        match =>
            match.reference.id ===
            "ashrae62_1"

    ),

    "CO2: ASHRAE 62.1 deveria permanecer como referência secundária."

);

assert(

    co2Result.primary.section !== null,

    "CO2: seção não resolvida."

);

console.log("✓ CO2 reference");

/* ======================================================================
 * TEST 3 — PARTICULATE MATTER
 * ======================================================================
 */

const particulateContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        pm25: {

            value: 35,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "elevated_particulate"

        }

    },

    evidence: {

        primary: {

            id: "elevated_particulate",

            parameter: "pm25",

            referenceIds: [

                "abnt_nbr_17037",
                "who_aqg_2021"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "outdoor_pollution"

        }

    }

};

const particulateResult =
    resolveReferences(particulateContext);

assert(

    particulateResult.primary !== null,

    "PM2.5: Resolver não encontrou referência primária."

);

assert(

    particulateResult.primary.section !== null,

    "PM2.5: seção não resolvida."

);

console.log("✓ Particulate matter");

/* ======================================================================
 * TEST 4 — THERMAL COMFORT
 * ======================================================================
 */

const thermalContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        temperature: {

            value: 29,

            passed: false

        },

        humidity: {

            value: 70,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "thermal_discomfort"

        }

    },

    evidence: {

        primary: {

            id: "thermal_discomfort",

            parameter: "temperature",

            referenceIds: [

                "ashrae55",
                "iso_7730",
                "abnt_nbr_16401"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "hvac_failure"

        }

    }

};

const thermalResult =
    resolveReferences(thermalContext);

assert(

    thermalResult.primary !== null,

    "Thermal: Resolver não encontrou referência primária."

);

assert(

    thermalResult.primary.reference.id ===
        "abnt_nbr_16401",

    `Thermal: referência primária incorreta: ${
        thermalResult.primary.reference.id
    }`

);

assert(

    thermalResult.secondary.some(

        match =>
            match.reference.id ===
            "ashrae55"

    ),

    "Thermal: ASHRAE 55 deveria permanecer como referência secundária."

);

assert(

    thermalResult.primary.section !== null,

    "Thermal: seção não resolvida."

);

console.log("✓ Thermal comfort");

/* ======================================================================
 * TEST 5 — VOC
 * ======================================================================
 */

const vocContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        vocIndex: {

            value: 220,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "chemical_contamination"

        }

    },

    evidence: {

        primary: {

            id: "elevated_voc",

            parameter: "vocIndex",

            referenceIds: [

                "sensirion_voc"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "chemical_contamination"

        }

    }

};

const vocResult =
    resolveReferences(vocContext);

assert(

    vocResult.primary !== null,

    "VOC: Resolver não encontrou referência primária."

);

assert(

    vocResult.primary.reference.id ===
        "sensirion_voc",

    "VOC: referência Sensirion não resolvida."

);

assert(

    vocResult.primary.section !== null,

    "VOC: seção não resolvida."

);

console.log("✓ VOC");

/* ======================================================================
 * TEST 6 — NOX
 * ======================================================================
 */

const noxContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        noxIndex: {

            value: 220,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "chemical_contamination"

        }

    },

    evidence: {

        primary: {

            id: "elevated_nox",

            parameter: "noxIndex",

            referenceIds: [

                "sensirion_nox"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "chemical_contamination"

        }

    }

};

const noxResult =
    resolveReferences(noxContext);

assert(

    noxResult.primary !== null,

    "NOx: Resolver não encontrou referência primária."

);

assert(

    noxResult.primary.reference.id ===
        "sensirion_nox",

    "NOx: referência Sensirion não resolvida."

);

assert(

    noxResult.primary.section !== null,

    "NOx: seção não resolvida."

);

console.log("✓ NOx");

/* ======================================================================
 * TEST 7 — RESIDENTIAL APPLICABILITY
 * ======================================================================
 */

const residentialContext = {

    domain: {
        id: "residential"
    },

    validation: {

        temperature: {

            value: 29,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "thermal_discomfort"

        }

    },

    evidence: {

        primary: {

            id: "thermal_discomfort",

            parameter: "temperature",

            referenceIds: [

                "ashrae55",
                "nr17"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "hvac_failure"

        }

    }

};

const residentialResult =
    resolveReferences(residentialContext);

assert(

    residentialResult.primary !== null,

    "Residential: nenhuma referência aplicável encontrada."

);

assert(

    residentialResult.primary.reference.id ===
        "ashrae55",

    `Residential: referência incorreta: ${
        residentialResult.primary.reference.id
    }`

);

console.log("✓ Domain applicability");

/* ======================================================================
 * TEST 8 — ORPHAN REFERENCE
 * ======================================================================
 */

const orphanContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        co2: {

            value: 1500,

            passed: false

        }

    },

    diagnosis: {

        primary: {

            id: "insufficient_ventilation"

        }

    },

    evidence: {

        primary: {

            id: "elevated_co2",

            parameter: "co2",

            referenceIds: [

                "reference_that_does_not_exist"

            ]

        },

        records: []

    }

};

const orphanResult =
    resolveReferences(orphanContext);

assert(

    orphanResult.primary === null,

    "Orphan reference deveria ser ignorada."

);

assert(

    orphanResult.matches.length === 0,

    "Orphan reference produziu match inválido."

);

console.log("✓ Orphan reference protection");

/* ======================================================================
 * TEST 9 — RESULT CONTRACT
 * ======================================================================
 */

assert(

    Object.prototype.hasOwnProperty.call(
        co2Result,
        "primary"
    ),

    "Resultado sem primary."

);

assert(

    Object.prototype.hasOwnProperty.call(
        co2Result,
        "secondary"
    ),

    "Resultado sem secondary."

);

assert(

    Object.prototype.hasOwnProperty.call(
        co2Result,
        "matches"
    ),

    "Resultado sem matches."

);

assert(

    Array.isArray(co2Result.secondary),

    "secondary deve ser Array."

);

assert(

    Array.isArray(co2Result.matches),

    "matches deve ser Array."

);

console.log("✓ Result contract");

/* ======================================================================
 * FINAL
 * ======================================================================
 */

console.log("");
console.log("✓ REFERENCE RESOLVER PASSED");
console.log("");