# CORE QAI
# RC1_FROZEN.md

Versão: RC1
Status: CONGELADO
Data: Agosto/2026

---

# OBJETIVO

Este documento congela oficialmente a arquitetura da RC1 do CORE QAI.

A partir deste ponto:

- NÃO redesenhar arquitetura.
- NÃO recriar pipeline.
- NÃO substituir o Context.
- NÃO alterar o contrato da API.
- NÃO criar novos Engines.
- NÃO fragmentar módulos existentes.
- NÃO reinventar o fluxo do CORE.

Toda evolução futura deve preservar esta arquitetura.

---

# ARQUITETURA OFICIAL

A arquitetura oficial do CORE QAI é composta pelos módulos:

Core Engine

    analysis.js
    context.js
    normalize.js
    pipeline.js
    responseBuilder.js
    constants.js

Domains

    Domain Resolver
    Domain Profiles

Regulatory

    Regulatory Resolver
    Regulatory Catalog

Validation

    Validation Engine

Metrics

    Metrics Engine

        Thermal Comfort
        Air Quality
        Particulate Load
        Occupancy
        QAI Score
        Health Risk

Knowledge Libraries

    Diagnostics
    Evidences
    Hypotheses
    Mitigations

Response Builder

API Pública

---

# PIPELINE OFICIAL

Reading

↓

Normalize

↓

Domain Resolver

↓

Regulatory Resolver

↓

Validation Engine

↓

Metrics Engine

↓

Diagnostics Library

↓

Evidence Library

↓

Hypothesis Library

↓

Mitigation Library

↓

Response Builder

↓

API Pública

Nenhuma etapa deve ser removida.

Nenhuma etapa deve ser reordenada.

---

# API OFICIAL

A única entrada pública do CORE é:

AnalisarQualidadeAmbiental()

Nenhum consumidor externo deve acessar módulos internos.

---

# CONTRATO DA RESPOSTA

A resposta oficial possui exatamente:

metadata

domain

validation

metrics

diagnosis

evidence

hypotheses

mitigation

Não adicionar informações internas do Context.

Não expor objetos temporários.

---

# O QUE ESTÁ CONGELADO

Context

Pipeline

Metrics Engine

Response Builder

Validation Engine

Domain Resolver

Regulatory Resolver

API Pública

Estrutura das Libraries

Fluxo do CORE

---

# O QUE PODE EVOLUIR

É permitido adicionar:

Novos Domains

Novas normas regulatórias

Novos diagnósticos

Novas evidências

Novas hipóteses

Novas mitigações

Novas métricas derivadas

Novos testes

Novos fixtures

Sem alterar a arquitetura.

---

# O QUE NÃO FAZER

Não criar novos pipelines.

Não criar versões paralelas.

Não mover responsabilidades entre módulos.

Não reescrever o Metrics Engine.

Não criar novos Contexts.

Não alterar a API pública.

Não substituir a arquitetura por outra abordagem.

Não modificar o fluxo oficial.

---

# TESTES APROVADOS

Testes Unitários

✓ Thermal Comfort

✓ Air Quality

✓ Particulate Load

✓ Occupancy

✓ QAI Score

✓ Health Risk

Testes de Integração

✓ Metrics Engine

✓ Diagnostics

✓ Evidence

✓ Hypothesis

✓ Mitigation

✓ Pipeline

Teste End-to-End

✓ API Pública

✓ Fluxo completo

✓ Response Builder

---

# DIRETRIZ PARA FUTURAS SESSÕES

Ao iniciar uma nova sessão:

1. Ler este documento antes de propor alterações.

2. Assumir que a arquitetura está correta.

3. Evoluir apenas por expansão do conhecimento.

4. Evitar refatorações sem justificativa técnica objetiva.

5. Preservar compatibilidade com todos os testes existentes.

---

# ESTADO DA RC1

Arquitetura validada.

Pipeline validado.

API validada.

Contratos validados.

Testes unitários aprovados.

Testes de integração aprovados.

Teste End-to-End aprovado.

A RC1 é considerada estável e congelada.

Toda evolução futura deverá respeitar esta base.


# FILOSOFIA DO PROJETO

O CORE QAI é um motor de análise ambiental.

A inteligência do sistema deve crescer pelo aumento da base de conhecimento
(Domains, Regulatory, Diagnostics, Evidences, Hypotheses e Mitigations),
e não pela alteração recorrente da arquitetura.

Arquitetura estável.
Conhecimento evolutivo.

Esta é a diretriz permanente do projeto.


Filosofia do CORE

Eu escreveria isso no manifesto do projeto:

O CORE QAI não afirma causas.

O CORE identifica evidências objetivas, correlaciona indicadores ambientais, compara resultados com normas e regulamentos aplicáveis e apresenta hipóteses técnicas acompanhadas de recomendações de mitigação.

O CORE é um sistema de apoio à decisão e não substitui a avaliação de profissionais habilitados.

Minha recomendação

Antes de escrevermos o próximo diagnóstico, eu faria uma pequena atualização no "contrato" dos diagnósticos.

Em vez de pensar em "afirmações", cada item do catálogo deve responder a quatro perguntas:

O que foi observado? (classificação técnica do estado ambiental)
Quais evidências sustentam essa classificação?
Quais hipóteses técnicas são compatíveis com essas evidências?
Quais ações são recomendadas pelas normas e boas práticas?

Essa filosofia está totalmente alinhada com o objetivo do CORE QAI como um sistema de apoio à decisão e dá uma base técnica sólida para toda a expansão da inteligência do projeto.