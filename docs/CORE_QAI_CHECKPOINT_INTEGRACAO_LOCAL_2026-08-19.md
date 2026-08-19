# CORE QAI — CHECKPOINT DE INTEGRAÇÃO LOCAL

Data: 2026-08-19
Status: VALIDADO

## Estado

O CORE QAI foi validado em três níveis:

1. CORE isolado pela API pública `AnalisarQualidadeAmbiental()`.
2. `miqai_server` consumindo `core-qai` através de `file:../miqai_core`.
3. Endpoint HTTP real do Server processando telemetria persistida.

## Dependência

O Server apresenta:

    core-qai@1.0.0 -> ..\miqai_core

Portanto, os testes de integração atuais consomem o CORE local.

## Testes CORE

Foram executados os cenários T1–T8:

- T1 NORMAL
- T2 MISSING VOC/NOx
- T3 CO2 HIGH
- T4 VOC HIGH
- T5 NOx HIGH
- T6 PM HIGH
- T7 THERMAL HIGH
- T8 MULTIPLE

Resultado: APROVADOS.

## Regra MISSING

Foi validado que:

- VOC MISSING não gera `elevated_voc`.
- NOx MISSING não gera `elevated_nox`.
- VOC MISSING não gera `highVoc`.
- NOx MISSING não gera `highNox`.
- ausência de leitura não é tratada como anomalia ambiental.

## Integração Server

O processo ativo foi confirmado como:

    node src/server.js

O endpoint:

    GET /?deviceId=10

foi executado com sucesso.

O cenário real apresentou:

- CO2 HIGH
- temperatura HIGH
- humidity HIGH
- PM2.5 NORMAL
- PM10 NORMAL
- VOC MISSING
- NOx MISSING

O CORE produziu as evidências e diagnósticos correspondentes sem produzir falsos positivos para VOC/NOx ausentes.

## Conclusão

A integração:

    Supabase/telemetria
        -> miqai_server
        -> inputMapper
        -> CORE QAI local
        -> Validation
        -> Metrics
        -> Evidence
        -> Diagnosis
        -> Hypothesis
        -> Mitigation
        -> Response

foi validada.

Não foram realizadas novas alterações no código após esta validação.

Próxima etapa autorizada:
revisão final do diff e preparação do commit.
