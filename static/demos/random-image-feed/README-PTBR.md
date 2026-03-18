# Feed de Imagens Aleatórias

> [versão em inglês](README.md)

Uma bela aplicação de descoberta de imagens que permite aos usuários pesquisar, navegar e explorar imagens de alta qualidade do Unsplash com filtros avançados e recursos interativos.

## AULA

### Recursos
- **Pesquisa de Imagens**: Pesquise imagens específicas usando palavras-chave
- **Descoberta Aleatória**: Obtenha imagens aleatórias com um clique
- **Filtragem por Categoria**: Filtre imagens por categorias (natureza, arquitetura, pessoas, etc.)
- **Filtragem por Orientação**: Filtre por orientação da imagem (paisagem, retrato, quadrado)
- **Visualizações em Grade/Lista**: Alterne entre diferentes modos de visualização
- **Modal de Imagem**: Clique nas imagens para ver em tamanho completo com detalhes
- **Download e Compartilhamento**: Baixe imagens ou compartilhe-as com outros
- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos

### Controles
- **Barra de Pesquisa**: Digite palavras-chave para pesquisar imagens específicas
- **Botão de Pesquisa**: Execute a pesquisa
- **Botão Aleatório**: Obtenha uma imagem aleatória
- **Filtro de Categoria**: Filtre por categorias de imagem
- **Filtro de Orientação**: Filtre por orientação da imagem
- **Alternar Visualização**: Mude entre visualizações em grade e lista
- **Carregar Mais**: Carregue imagens adicionais
- **Cartões de Imagem**: Clique para ver imagens em tamanho completo

### Como Funciona
- Conecta-se à API do Unsplash para buscar imagens de alta qualidade
- Exibe imagens em um layout de cartão atraente
- Mostra detalhes da imagem incluindo fotógrafo, curtidas e downloads
- Fornece navegação e funcionalidade de pesquisa suaves
- Lida com erros graciosamente com mensagens amigáveis ao usuário

## DESAFIO 01

### Recursos Adicionais
- **Sistema de Favoritos**: Salve imagens favoritas no armazenamento local
- **Pesquisa Avançada**: Pesquise por cor, tamanho e outros critérios
- **Coleções**: Navegue por coleções de imagens curadas
- **Perfis de Usuário**: Visualize perfis de fotógrafos e seus trabalhos
- **Detalhes da Imagem**: Mostre configurações da câmera, localização e tags

### Melhorias Técnicas
- Implemente armazenamento local para favoritos
- Adicione funcionalidade de pesquisa baseada em cor
- Crie sistema de navegação de coleções
- Adicione integração de perfil de fotógrafo
- Implemente exibição detalhada de metadados da imagem

## DESAFIO 02

### Recursos Avançados
- **Rolagem Infinita**: Carregue automaticamente mais imagens conforme você rola
- **Edição de Imagem**: Ferramentas básicas de edição de imagem (corte, filtro, etc.)
- **Recursos Sociais**: Curta, comente e compartilhe imagens
- **Coleções Personalizadas**: Crie e compartilhe coleções pessoais de imagens
- **Analytics Avançado**: Rastreie imagens populares e tendências

### UX Aprimorada
- **Carregamento Preguiçoso**: Carregue imagens conforme elas entram na visualização
- **Animações Suaves**: Transições e efeitos de hover
- **Navegação por Teclado**: Suporte completo ao teclado
- **Tema Escuro/Claro**: Alternar entre temas
- **Aplicativo Web Progressivo**: Instalar como app desktop/mobile

### Aprimoramentos Técnicos
- Implemente intersection observer para carregamento preguiçoso
- Adicione capacidades de edição de imagem com Canvas API
- Crie sistema de interação social
- Construa recursos de gerenciamento de coleções
- Adicione analytics e rastreamento

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessibilidade
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript ES6+**: Async/await e recursos modernos do JavaScript
- **API do Unsplash**: API RESTful para imagens de alta qualidade
- **Fetch API**: Requisições HTTP modernas
- **Design Responsivo**: Abordagem mobile-first

## Recursos Principais

### Descoberta de Imagens
- **Funcionalidade de Pesquisa**: Encontre imagens por palavras-chave
- **Imagens Aleatórias**: Descubra fotos belas inesperadas
- **Navegação por Categoria**: Explore imagens por categoria
- **Filtragem por Orientação**: Encontre imagens em orientações específicas
- **Paginação**: Carregue mais imagens conforme necessário

### Exibição de Imagens
- **Layout em Grade**: Grade de imagens estilo masonry
- **Visualização em Lista**: Layout alternativo baseado em lista
- **Visualização Modal**: Visualização de imagem em tamanho completo
- **Informações da Imagem**: Fotógrafo, localização, estatísticas
- **Imagens Responsivas**: Otimizadas para todos os tamanhos de tela

### Interação do Usuário
- **Clique na Imagem**: Abrir modal em tamanho completo
- **Download**: Salvar imagens no dispositivo
- **Compartilhamento**: Compartilhar imagens via compartilhamento nativo
- **Alternar Visualização**: Mude entre grade e lista
- **Estados de Carregamento**: Feedback visual durante operações

## Integração com API

### Endpoints da API do Unsplash
- `/photos`: Obter fotos curadas
- `/search/photos`: Pesquisar imagens específicas
- `/photos/random`: Obter imagens aleatórias
- `/photos/{id}`: Obter detalhes de imagem específica
- `/users/{username}`: Obter perfil do usuário

### Estrutura de Dados
```javascript
{
  id: string,
  urls: {
    raw: string,
    full: string,
    regular: string,
    small: string,
    thumb: string
  },
  description: string,
  alt_description: string,
  user: {
    name: string,
    username: string,
    portfolio_url: string
  },
  likes: number,
  downloads: number,
  location: {
    title: string,
    name: string
  }
}
```

## Como Usar

1. **Pesquisar Imagens**: Digite palavras-chave na barra de pesquisa
2. **Descoberta Aleatória**: Clique em "Random Image" para surpresas
3. **Filtrar Resultados**: Use filtros de categoria e orientação
4. **Navegar na Grade**: Visualize imagens em formato de grade ou lista
5. **Ver Detalhes**: Clique em qualquer imagem para visualização em tamanho completo
6. **Download/Compartilhar**: Use controles do modal para baixar ou compartilhar
7. **Carregar Mais**: Clique em "Load More" para imagens adicionais

## Compatibilidade com Navegadores

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Navegadores móveis (iOS Safari, Chrome Mobile)

## Recursos de Performance

- **Carregamento Preguiçoso**: Imagens carregam conforme se tornam visíveis
- **Imagens Otimizadas**: Use tamanhos de imagem apropriados
- **Cache**: Cache respostas da API para melhor performance
- **Tratamento de Erros**: Fallbacks graciosos para requisições falhadas
- **Animações Suaves**: Animações e transições de 60fps

## Tratamento de Erros

- **Erros de Rede**: Lide com problemas de conexão da API
- **Pesquisas Inválidas**: Forneça mensagens de erro úteis
- **Imagens Ausentes**: Imagens de fallback e conteúdo placeholder
- **Limitação de Taxa**: Respeite os limites de taxa da API
- **Feedback do Usuário**: Mensagens de erro claras e opções de tentar novamente

## Melhorias Futuras

- **Suporte Offline**: Cache imagens para visualização offline
- **Pesquisa Avançada**: Pesquisa de imagem alimentada por IA
- **Recursos Sociais**: Contas de usuário e interações
- **Temas Personalizados**: Esquemas de cores personalizáveis pelo usuário
- **Pesquisa por Voz**: Pesquisa de imagem ativada por voz
- **Integração AR**: Visualização de imagem em realidade aumentada

## Limitações da API

- **Limitação de Taxa**: API do Unsplash tem limites de taxa
- **Autenticação**: Requer chave de API para uso em produção
- **Qualidade da Imagem**: Varia por fotógrafo e configurações
- **Dependência de Rede**: Requer conexão com a internet
- **Restrições CORS**: API pode ter restrições cross-origin

## Contribuindo

Este projeto usa a API do Unsplash. Para uso em produção, você precisará se registrar para uma chave de API em [unsplash.com/developers](https://unsplash.com/developers).

---

**Nota**: Este Feed de Imagens Aleatórias foi projetado para fins educacionais e descoberta de imagens. Todas as imagens são fornecidas pelo Unsplash e são usadas de acordo com seus termos de serviço. 