# CORE QAI — Automatizando Normas

## Proposta de evolução da Reference Library

### 1. Objetivo

Evoluir a biblioteca de References do CORE QAI para uma **Reference Library of Record**, funcionando como fonte única de verdade para o cadastro, estado e manutenção das referências normativas e técnicas utilizadas pelo CORE.

A proposta não altera o contrato atual do Resolver na RC em andamento. Trata-se de uma evolução arquitetural planejada para uma próxima etapa, após a estabilização e validação do fluxo atual.

---

## 2. Princípio central

O conteúdo de uma referência e o estado de utilização dessa referência pelo CORE devem ser tratados como coisas diferentes.

A referência não deve precisar ser apagada fisicamente quando deixar de ser utilizada.

Em vez disso, o registro permanece preservado e recebe um campo de controle:

```javascript
enabled: true
```

ou:

```javascript
enabled: false
```

### Interpretação

```text
enabled: true
    ↓
Referência disponível para o CORE

enabled: false
    ↓
Referência preservada no acervo,
mas não utilizada pelo Resolver
```

Isso permite preservar histórico, rastreabilidade e metadados mesmo quando uma referência é retirada da operação.

---

## 3. Estrutura conceitual da Reference

Cada referência deverá continuar armazenando seus dados documentais e técnicos, incluindo:

```text
id
code
name
title
organization
publisher
country
type
category
scope
version
year
status
enabled
applicability
sections
description
citation
url
```

### Separação importante

`enabled` e `status` não representam a mesma coisa.

### `enabled`

Responde:

> O CORE QAI deve utilizar esta referência?

Exemplos:

```javascript
enabled: true
```

ou:

```javascript
enabled: false
```

### `status`

Representa a situação documental da referência.

Exemplos:

```javascript
status: "CURRENT"
```

```javascript
status: "SUPERSEDED"
```

```javascript
status: "REVIEW"
```

Assim podemos ter, por exemplo:

```javascript
{
    enabled: false,
    status: "SUPERSEDED"
}
```

Isso significa que a referência continua registrada no acervo, mas não deve mais participar da resolução porque foi substituída.

---

## 4. Reference Library of Record

A evolução proposta é separar claramente:

```text
REFERENCE CATALOG
        ↓
conteúdo completo das referências

REFERENCE REGISTRY
        ↓
estado e governança das referências
```

Conceitualmente:

```text
                  REFERENCE LIBRARY
                         │
              ┌──────────┴──────────┐
              │                     │
          CATALOG                REGISTRY
              │                     │
       dados da norma        estado da norma
              │                     │
              └──────────┬──────────┘
                         ↓
                 REFERENCE RESOLVER
                         ↓
                     RESPONSE
```

---

## 5. Registry

O Registry poderá controlar a disponibilidade operacional de cada referência.

Exemplo conceitual:

```javascript
const REFERENCE_REGISTRY = Object.freeze({

    ashrae55: {
        enabled: true
    },

    ashrae62_1: {
        enabled: true
    },

    abnt_nbr_16401: {
        enabled: true
    },

    abnt_nbr_17037: {
        enabled: true
    },

    who_aqg_2021: {
        enabled: true
    },

    iso_7730: {
        enabled: true
    },

    nr17: {
        enabled: true
    },

    sensirion_voc: {
        enabled: true
    },

    sensirion_nox: {
        enabled: true
    },

    anvisa_re09: {
        enabled: false
    }

});
```

A vantagem é que uma referência pode ser desativada sem apagar seu arquivo ou seus dados.

---

## 6. Manutenção simplificada

A manutenção operacional poderá ser feita alterando apenas o estado:

### Desativar

```javascript
anvisa_re09: {
    enabled: false
}
```

### Reativar

```javascript
anvisa_re09: {
    enabled: true
}
```

O conteúdo da referência permanece preservado.

Isso reduz a necessidade de procurar manualmente a referência em diversos componentes do CORE.

---

## 7. Resolver

O Reference Resolver deverá considerar o Registry antes de incluir uma referência nos candidatos.

Conceitualmente:

```javascript
if (!reference.enabled) {

    return false;

}
```

Ou, na arquitetura futura, o Resolver poderá consultar o Registry diretamente:

```text
Evidence
    ↓
Reference Resolver
    ↓
Reference Registry
    ↓
somente referências enabled
    ↓
jurisdição
    ↓
aplicabilidade
    ↓
precedência
    ↓
section matching
    ↓
PRIMARY / SECONDARY
```

---

## 8. Benefício para inserção de novas normas

A inclusão de uma nova referência passa a ser um processo controlado:

```text
1. Criar o registro da referência
        ↓
2. Registrar no Catalog
        ↓
3. Registrar no Registry
        ↓
4. Definir enabled
        ↓
5. Definir applicability
        ↓
6. Definir sections
        ↓
7. Definir topics
        ↓
8. Executar testes
```

Depois disso, o Resolver poderá utilizá-la sem alteração da arquitetura central.

---

## 9. Benefício para retirada de normas

A retirada operacional deixa de exigir exclusão física.

Processo:

```text
Referência atual
       ↓
enabled: false
       ↓
Resolver ignora
       ↓
registro permanece preservado
```

Isso mantém:

- histórico;
- identificação;
- versão;
- ano;
- organização;
- origem;
- descrição;
- seções;
- tópicos;
- URL;
- rastreabilidade.

---

## 10. Possível interface de manutenção

Como evolução futura, a manutenção poderá deixar de depender diretamente da edição dos arquivos JavaScript.

Poderá existir uma interface administrativa simples:

```text
┌─────────────────────────────────────────────┐
│       CORE QAI — REFERENCE LIBRARY          │
├─────────────────────────────────────────────┤
│                                             │
│ ABNT NBR 16401              ● ATIVA         │
│ ASHRAE 55                   ● ATIVA         │
│ ASHRAE 62.1                 ● ATIVA         │
│ WHO AQG 2021                ● ATIVA         │
│ ABNT NBR 17037              ● ATIVA         │
│ ANVISA RE-09                ○ INATIVA       │
│                                             │
│ [Adicionar referência]                      │
│                                             │
└─────────────────────────────────────────────┘
```

A interface poderá permitir manutenção de:

```text
Código
Nome
Versão
Ano
Organização
País
Categoria
Aplicabilidade
Seções
Tópicos
Status
URL
Ativa / Inativa
```

---

## 11. Governança normativa

A separação entre `enabled` e `status` permite uma governança mais precisa.

Exemplos:

### Referência vigente e ativa

```javascript
{
    enabled: true,
    status: "CURRENT"
}
```

### Referência substituída

```javascript
{
    enabled: false,
    status: "SUPERSEDED"
}
```

### Referência em revisão

```javascript
{
    enabled: false,
    status: "REVIEW"
}
```

### Referência preservada historicamente

```javascript
{
    enabled: false,
    status: "ARCHIVED"
}
```

Esses estados devem ser definidos formalmente antes de serem incorporados ao contrato definitivo.

---

## 12. Princípio arquitetural

A evolução deve preservar a separação de responsabilidades:

```text
Reference Catalog
    ↓
armazena o conteúdo da referência

Reference Registry
    ↓
controla estado e governança

Reference Resolver
    ↓
seleciona a referência pertinente

Response Builder
    ↓
expõe o resultado

Dashboard
    ↓
apresenta ao usuário
```

Nenhuma dessas camadas deve assumir a responsabilidade da outra.

---

## 13. Relação com a RC atual

Esta proposta **não deve alterar a RC atual sem decisão explícita**.

O estado atualmente validado permanece:

```text
Reference Library       ✓
Reference Resolver      ✓
Pipeline Integration    ✓
Response Builder        ✓
Pipeline Test           ✓
```

A Reference Library of Record é uma evolução planejada para uma etapa posterior.

---

## 14. Próxima evolução

Quando a arquitetura estiver pronta para essa mudança, a implementação deverá considerar:

1. criação do Reference Registry;
2. inclusão de `enabled`;
3. definição formal dos valores de `status`;
4. alteração do catálogo para consultar o Registry;
5. alteração do Resolver para ignorar referências desabilitadas;
6. testes de ativação e desativação;
7. testes de inserção de novas referências;
8. testes de referências substituídas;
9. eventual interface administrativa;
10. documentação do processo de manutenção.

---

## 15. Resultado esperado

A arquitetura futura deverá permitir:

```text
ADICIONAR NORMA
       ↓
REGISTRAR
       ↓
ATIVAR
       ↓
RESOLVER AUTOMATICAMENTE
```

e:

```text
RETIRAR NORMA
       ↓
DESATIVAR
       ↓
PRESERVAR HISTÓRICO
       ↓
RESOLVER IGNORA
```

Sem necessidade de apagar fisicamente o registro e sem espalhar a manutenção da referência por diversas partes do CORE.

---

## 16. Conceito final

A **Reference Library of Record** será a fonte única de verdade das referências utilizadas pelo CORE QAI.

Seu objetivo é permitir que o sistema evolua de uma biblioteca estática de normas para uma **biblioteca normativa administrável, rastreável e governada**, mantendo o conteúdo documental separado do estado operacional.

A manutenção das referências deverá ser simples, centralizada e segura, sem comprometer a arquitetura analítica do CORE QAI.
