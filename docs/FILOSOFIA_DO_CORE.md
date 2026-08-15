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



O CORE passa a seguir um raciocínio técnico.

Leitura


↓


Validação


↓


Norma


↓


Indicadores


↓


Classificação Ambiental


↓


Evidências


↓


Hipóteses Técnicas


↓


Mitigações


↓


Resposta

Isso é muito mais próximo de como um engenheiro ambiental, um higienista ocupacional ou um especialista em HVAC raciocina.



Esteira Oficial do CORE QAI (RC1)
SaaS
│
│  Solicitação de análise
│
▼
AnalisarQualidadeAmbiental()
│
▼
Context
│
▼
Normalize
│
▼
Domain Resolver
│
▼
Regulatory Resolver
│
▼
Validation Engine
│
▼
Metrics Engine
│
▼
Diagnostics Library
│
▼
Evidence Library
│
▼
Hypothesis Library
│
▼
Mitigation Library
│
▼
Response Builder
│
▼
Resposta JSON
│
▼
Dashboard / API / SaaS
O que cada etapa faz
1. Analysis API

Recebe:

{
   "reading":{...},
   "environment":"corporate"
}

Não interpreta nada.

Apenas cria o Context.

2. Context

Organiza toda a memória da execução.

Exemplo:

reading


environment


domain


regulatory


validation


metrics


diagnosis


evidence


hypotheses


mitigation


response
3. Normalize

Padroniza os dados recebidos.

Exemplo:

650


↓


650 ppm

ou

null


↓


undefined

ou

23,5


↓


23.5

Nada de inteligência.

4. Domain Resolver

Pergunta:

Qual ambiente?

Resposta:

Corporate

e carrega:

corporateDomain.js
5. Regulatory Resolver

Pergunta:

Quais critérios regulatórios esse Domain utiliza?

Exemplo:

Corporate


↓


temperature


↓


20–26


ASHRAE55


↓


co2


↓


1000


ASHRAE62.1

Ele apenas resolve o perfil.

Não valida.

6. Validation Engine

Agora começa a análise.

Pergunta:

A leitura atende ao perfil regulatório?

Resultado:

temperature NORMAL


humidity LOW


co2 HIGH


pm25 NORMAL

Essa é a primeira interpretação objetiva do CORE.

7. Metrics Engine

Não olha mais para a leitura.

Olha para:

Validation

e produz indicadores derivados.

Exemplo:

Thermal Comfort


Air Quality


Occupancy


QAI Score


Health Risk
8. Diagnostics Library

Agora começa o conhecimento.

Ela recebe:

Validation


+


Metrics

e responde:

Como classifico este ambiente?

Exemplo:

Elevação da concentração de CO₂.


Temperatura acima da faixa recomendada.


Qualidade do ar comprometida.

Ela não sabe norma.

Ela não sabe fabricante.

Ela apenas classifica.

9. Evidence Library

Recebe:

Validation


Metrics


Diagnosis

e responde:

Quais evidências sustentam essa classificação?

Aqui entram as referências normativas.

10. Hypothesis Library

Recebe tudo anterior.

Pergunta:

Quais cenários técnicos são compatíveis?

Exemplo:

Baixa renovação do ar.


Elevada ocupação.


Fontes internas de VOC.


...

Nunca afirma.

Sempre evidencia.

11. Mitigation Library

Recebe:

Diagnosis


Evidence


Hypotheses

Pergunta:

O que pode ser recomendado?

Sempre como apoio à decisão.

Nunca como obrigação.

12. Response Builder

Não calcula absolutamente nada.

Ele apenas monta:

metadata


domain


validation


metrics


diagnosis


evidence


hypotheses


mitigation
A regra de ouro

Cada biblioteca só conhece o que veio antes dela.

Validation
        │
        ▼
Metrics
        │
        ▼
Diagnostics
        │
        ▼
Evidence
        │
        ▼
Hypotheses
        │
        ▼
Mitigations

Nenhuma biblioteca deve "olhar para frente".