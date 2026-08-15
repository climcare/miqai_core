/**
 * ======================================================================
 * CORE QAI
 * Test Assert
 * ----------------------------------------------------------------------
 * Objetivo
 * ----------------------------------------------------------------------
 * Comparar valores esperados e obtidos durante os testes.
 * ======================================================================
 */

export function assertEqual(name, expected, received) {

    if (expected === received) {

        console.log(`   ✓ ${name}`);

        return true;

    }

    console.log(`   ✗ ${name}`);

    console.log(`     Expected : ${expected}`);

    console.log(`     Received : ${received}`);

    return false;

}