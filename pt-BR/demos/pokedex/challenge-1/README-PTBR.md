# Pokedex

> [versão em inglês](README.md)

Um aplicativo de busca de Pokemon que permite aos usuários pesquisar Pokemon por nome ou ID e exibe suas informações incluindo estatísticas, tipos e arte oficial.

## CLASS

Funcionalidade básica de busca de Pokemon com integração de API.

### Funcionalidades:
- Pesquisar Pokemon por nome ou ID
- Exibir informações do Pokemon (nome, ID, tipos, estatísticas)
- Mostrar arte oficial do Pokemon
- Design responsivo com interface moderna
- Tratamento de erros para buscas inválidas
- Estados de carregamento

### Tecnologias:
- HTML5
- CSS3 (com gradientes e animações)
- JavaScript (ES6+)
- Integração com PokeAPI

## CHALLENGE 01

Busca de Pokemon aprimorada com funcionalidades adicionais e UX melhorada.

### Funcionalidades Adicionais:
- Codificação de cores baseada em tipos para Pokemon
- Exibição detalhada de estatísticas (HP, Ataque, Defesa, Velocidade)
- Animações e transições suaves
- Melhor tratamento de erros e feedback do usuário
- Design responsivo para dispositivos móveis
- Busca pressionando a tecla Enter
- Exibição de Pokemon padrão no carregamento da página

### Melhorias Técnicas:
- Async/await para chamadas de API
- Manipulação dinâmica do DOM
- CSS Grid para layout de estatísticas
- Efeitos hover e feedback visual
- Animação de spinner de carregamento

## CHALLENGE 02

Funcionalidades avançadas e funcionalidade adicional.

### Funcionalidades Planejadas:
- Gerador de Pokemon aleatório
- Exibição da cadeia evolutiva do Pokemon
- Descrições de habilidades
- Listas de movimentos e detalhes
- Ferramenta de comparação de Pokemon
- Sistema de favoritos
- Opções de filtragem avançada
- Histórico de busca
- Suporte offline com cache

### Funcionalidades Avançadas:
- Simulador de batalha Pokemon
- Funcionalidade de construtor de equipe
- Calculadora de eficácia de tipos
- Variantes Shiny de Pokemon
- Filtragem por geração
- Filtros de busca avançados

## Navegação

- [Projeto Principal](../README.md)
- [Challenge 1](README-PTBR.md) ← Você está aqui
- [Challenge 2](../challenge-2/README-PTBR.md)

## Demo

O aplicativo permite aos usuários:
1. Inserir um nome ou ID de Pokemon no campo de busca
2. Clicar em "Buscar" ou pressionar Enter para encontrar o Pokemon
3. Visualizar informações detalhadas incluindo:
   - Arte oficial
   - Nome e ID do Pokemon
   - Badges de tipo com codificação de cores
   - Estatísticas base (HP, Ataque, Defesa, Velocidade)
4. Tratar erros graciosamente com mensagens amigáveis ao usuário

## API Utilizada

Este projeto usa a [PokeAPI](https://pokeapi.co/) para buscar dados de Pokemon, fornecendo acesso a informações abrangentes de Pokemon incluindo estatísticas, tipos, sprites e muito mais. 