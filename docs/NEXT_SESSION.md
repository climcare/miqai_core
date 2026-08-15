# CORE QAI
# NEXT_SESSION.md

Status: Pós RC1
Data: Agosto/2026

=========================================================
ONDE PARAMOS
=========================================================

A RC1 encontra-se funcionalmente concluída.

Toda a arquitetura principal do CORE foi implementada e validada.

Não iniciar nova arquitetura.

Não recriar módulos.

Não propor reorganizações estruturais.

Não dividir arquivos existentes.

Não alterar o contrato da API.

=========================================================
VALIDADO
=========================================================

CORE ENGINE

✔ analysis
✔ context
✔ normalize
✔ pipeline
✔ responseBuilder
✔ constants

DOMAINS

✔ Resolver
✔ Profiles

REGULATORY

✔ Resolver
✔ Catálogo

VALIDATION

✔ Validation Engine

METRICS

✔ Thermal Comfort
✔ Air Quality
✔ Particulate Load
✔ Occupancy
✔ QAI Score
✔ Health Risk
✔ Metrics Engine

KNOWLEDGE

✔ Diagnostics Library
✔ Evidence Library
✔ Hypothesis Library
✔ Mitigation Library

API

✔ AnalisarQualidadeAmbiental()

=========================================================
TESTES EXECUTADOS
=========================================================

Unitários

✔ thermal

✔ airQuality

✔ particulate

✔ occupancy

✔ qaiScore

✔ healthRisk

Integração

✔ metricsEngine

✔ diagnostics

✔ evidences

✔ hypotheses

✔ mitigations

✔ pipeline

End-to-End

✔ pipeline.e2e

Todos aprovados.

=========================================================
NÃO MODIFICAR
=========================================================

Pipeline

Context

Metrics Engine

Response Builder

Validation Engine

API Pública

Contrato da Response

Estrutura das Libraries

Arquitetura RC1

=========================================================
PRÓXIMO PASSO
=========================================================

Agora iniciaremos a evolução do conhecimento.

A arquitetura NÃO muda.

O motor NÃO muda.

A API NÃO muda.

O pipeline NÃO muda.

=========================================================
FASE 1
EXPANSÃO DOS DIAGNÓSTICOS
=========================================================

Adicionar novos diagnósticos.

Exemplos:

- Alta concentração de CO₂
- Excesso de PM2.5
- Excesso de PM10
- Ambiente seco
- Ambiente úmido
- Temperatura elevada
- Temperatura baixa
- VOC elevado
- NOx elevado
- Ocupação elevada
- Ventilação inadequada
- Múltiplas causas simultâneas

=========================================================
FASE 2
EXPANSÃO DAS EVIDÊNCIAS
=========================================================

Criar evidências específicas para cada diagnóstico.

=========================================================
FASE 3
EXPANSÃO DAS HIPÓTESES
=========================================================

Criar hipóteses cada vez mais inteligentes.

Relacionar múltiplas métricas.

Permitir causas combinadas.

=========================================================
FASE 4
EXPANSÃO DAS MITIGAÇÕES
=========================================================

Adicionar recomendações específicas.

Priorizar ações.

Criar mitigação por ambiente.

Corporate

Healthcare

Education

Residential

Datacenter

=========================================================
FASE 5
NOVOS TESTES
=========================================================

Criar regressão automática utilizando todas as fixtures.

excellent.json

corporate.json

hospital.json

critical.json

Adicionar novos cenários sempre que novos diagnósticos forem criados.

=========================================================
OBJETIVO DA PRÓXIMA SESSÃO
=========================================================

Não trabalhar na arquitetura.

Não reorganizar arquivos.

Não criar novas Engines.

Não criar novos Pipelines.

Todo o esforço será concentrado em aumentar a inteligência do CORE.

O CORE deve evoluir por conhecimento.

Nunca por reconstrução da arquitetura.

=========================================================
MISSÃO
=========================================================

Transformar o CORE QAI em um motor especialista em Qualidade do Ar Interno.

A arquitetura está pronta.

Agora começa a construção da inteligência.