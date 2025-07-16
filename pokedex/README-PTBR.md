# Pokédex

> [versão em inglês](README.md)

Uma aplicação completa de Pokédex que permite aos usuários pesquisar, navegar e descobrir Pokémon do universo Pokémon usando a PokeAPI.

## AULA

### Recursos
- **Pesquisa de Pokémon**: Pesquise Pokémon por nome ou número
- **Pokémon Aleatório**: Descubra Pokémon aleatórios com um clique
- **Filtro por Tipo**: Filtre Pokémon por seus tipos
- **Informações Detalhadas**: Visualize detalhes abrangentes dos Pokémon incluindo estatísticas, habilidades e mais
- **Visualizações em Grade/Lista**: Alterne entre modos de visualização em grade e lista
- **Paginação**: Navegue por grandes coleções de Pokémon
- **Design Responsivo**: Funciona perfeitamente em dispositivos desktop e móveis

### Controles
- **Barra de Pesquisa**: Digite o nome ou número do Pokémon para pesquisar
- **Botão de Pesquisa**: Execute a pesquisa
- **Botão Aleatório**: Obtenha um Pokémon aleatório
- **Filtro de Tipo**: Filtre Pokémon por tipo
- **Alternar Visualização**: Mude entre visualizações em grade e lista
- **Paginação**: Navegue pelas páginas de resultados
- **Cartões de Pokémon**: Clique para ver informações detalhadas

### Como Funciona
- Conecta-se à PokeAPI para buscar dados reais de Pokémon
- Exibe Pokémon em um layout de cartão atraente
- Mostra estatísticas detalhadas, tipos, habilidades e imagens
- Fornece navegação e funcionalidade de pesquisa suaves
- Lida com erros graciosamente com mensagens amigáveis ao usuário

## DESAFIO 01

### Recursos Adicionais
- **Sistema de Favoritos**: Salve Pokémon favoritos no armazenamento local
- **Pesquisa Avançada**: Pesquise por múltiplos critérios (tipo, geração, etc.)
- **Cadeias de Evolução**: Exiba informações de evolução para Pokémon
- **Listas de Movimentos**: Mostre movimentos disponíveis para cada Pokémon
- **Comparar Pokémon**: Comparação lado a lado de múltiplos Pokémon

### Melhorias Técnicas
- Implemente armazenamento local para favoritos
- Adicione integração de API de cadeia de evolução
- Crie filtros de pesquisa avançados
- Adicione busca e exibição de dados de movimentos
- Implemente funcionalidade de comparação

## DESAFIO 02

### Recursos Avançados
- **Simulador de Batalha**: Simulação simples de batalha entre Pokémon
- **Construtor de Equipe**: Crie e salve equipes de Pokémon
- **Variantes Shiny**: Exiba variantes shiny de Pokémon
- **Filtragem por Geração**: Filtre por gerações de Pokémon
- **Exportar/Importar**: Salve e compartilhe dados de Pokémon

### UX Aprimorada
- **Animações**: Transições suaves e efeitos de hover
- **Efeitos Sonoros**: Choros de Pokémon e sons de interface
- **Tema Escuro/Claro**: Alternar entre temas
- **Navegação por Teclado**: Suporte completo ao teclado
- **Aplicativo Web Progressivo**: Instalar como app desktop/mobile

### Aprimoramentos Técnicos
- Implemente mecânicas de batalha e cálculos
- Adicione sistema de gerenciamento de equipe
- Integre imagens de variantes shiny
- Crie filtragem baseada em geração
- Adicione funcionalidade de exportar/importar dados

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessibilidade
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript ES6+**: Async/await e recursos modernos do JavaScript
- **PokeAPI**: API RESTful para dados de Pokémon
- **Fetch API**: Requisições HTTP modernas
- **Design Responsivo**: Abordagem mobile-first

## Recursos Principais

### Dados de Pokémon
- **Informações Básicas**: Nome, número, tipos e imagens
- **Estatísticas**: Estatísticas base (HP, Ataque, Defesa, etc.)
- **Atributos Físicos**: Altura, peso e habilidades
- **Informações de Tipo**: Efetividade de tipo e fraquezas
- **Arte Oficial**: Imagens de alta qualidade dos Pokémon

### Pesquisa e Filtragem
- **Pesquisa por Nome**: Pesquise pelo nome do Pokémon
- **Pesquisa por Número**: Pesquise pelo número da Pokédex
- **Filtragem por Tipo**: Filtre por tipos de Pokémon
- **Descoberta Aleatória**: Obtenha Pokémon aleatórios
- **Resultados em Tempo Real**: Resultados de pesquisa instantâneos

### Interface do Usuário
- **Design Moderno**: Interface limpa e atraente
- **Layout Responsivo**: Funciona em todos os tamanhos de tela
- **Elementos Interativos**: Efeitos de hover e animações
- **Estados de Carregamento**: Feedback visual durante carregamento de dados
- **Tratamento de Erros**: Mensagens de erro amigáveis ao usuário

## Integração com API

### Endpoints da PokeAPI
- `/pokemon/{id}`: Obter dados individuais de Pokémon
- `/pokemon`: Obter lista de Pokémon com paginação
- `/type/{type}`: Obter Pokémon por tipo
- `/pokemon-species/{id}`: Obter informações de espécie
- `/evolution-chain/{id}`: Obter dados de evolução

### Estrutura de Dados
```javascript
{
  id: number,
  name: string,
  types: string[],
  stats: Array<{name: string, value: number}>,
  sprites: object,
  height: number,
  weight: number,
  abilities: string[]
}
```

## Como Usar

1. **Pesquisar Pokémon**: Digite um nome ou número na barra de pesquisa
2. **Navegar na Lista**: Visualize a lista paginada de todos os Pokémon
3. **Filtrar por Tipo**: Use o dropdown de tipo para filtrar resultados
4. **Descoberta Aleatória**: Clique em "Random Pokémon" para surpresas
5. **Ver Detalhes**: Clique em qualquer cartão de Pokémon para informações detalhadas
6. **Alternar Visualizações**: Mude entre modos de visualização em grade e lista
7. **Navegar**: Use a paginação para navegar pelos resultados

## Compatibilidade com Navegadores

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Navegadores móveis (iOS Safari, Chrome Mobile)

## Recursos de Performance

- **Carregamento Preguiçoso**: Carregue imagens conforme necessário
- **Cache**: Cache respostas da API para melhor performance
- **Tratamento de Erros**: Fallbacks graciosos para requisições falhadas
- **Imagens Otimizadas**: Use tamanhos de imagem apropriados
- **Animações Suaves**: Animações e transições de 60fps

## Tratamento de Erros

- **Erros de Rede**: Lide com problemas de conexão da API
- **Pesquisas Inválidas**: Forneça mensagens de erro úteis
- **Dados Ausentes**: Imagens de fallback e conteúdo placeholder
- **Limitação de Taxa**: Respeite os limites de taxa da API
- **Feedback do Usuário**: Mensagens de erro claras e opções de tentar novamente

## Melhorias Futuras

- **Suporte Offline**: Cache dados para visualização offline
- **Analytics Avançado**: Rastreie interações do usuário e preferências
- **Recursos Sociais**: Compartilhe descobertas de Pokémon
- **Temas Personalizados**: Esquemas de cores personalizáveis pelo usuário
- **Pesquisa por Voz**: Pesquisa de Pokémon ativada por voz
- **Integração AR**: Visualização de Pokémon em realidade aumentada

## Limitações da API

- **Limitação de Taxa**: PokeAPI tem limites de taxa
- **Disponibilidade de Dados**: Alguns Pokémon podem ter dados incompletos
- **Qualidade da Imagem**: Varia por Pokémon e geração
- **Dependência de Rede**: Requer conexão com a internet
- **Restrições CORS**: API pode ter restrições cross-origin

## Contribuindo

Este projeto usa a PokeAPI, que é gratuita e de código aberto. Para mais informações sobre a API, visite [pokeapi.co](https://pokeapi.co).

---

**Nota**: Esta Pokédex foi projetada para fins educacionais e fãs de Pokémon. Todos os dados de Pokémon são fornecidos pela PokeAPI e são usados de acordo com seus termos de serviço. 