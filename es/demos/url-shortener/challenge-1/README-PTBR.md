# Encurtador de URL - Desafio 1

> [versão em inglês](README.md)

## AULA

Serviço básico de encurtamento de URLs com funcionalidade simples.

### Funcionalidades:
- Converter URLs longas em URLs curtas
- Copiar URLs encurtadas para a área de transferência
- Validação básica de URL
- Interface simples

### Controles:
- **Input de URL**: Digite a URL longa para encurtar
- **Botão Encurtar**: Gerar URL curta
- **Botão Copiar**: Copiar URL encurtada para área de transferência
- **Botão Limpar**: Limpar todos os inputs

---

## DESAFIO 01

Encurtador de URL aprimorado com aliases personalizados, datas de expiração e rastreamento de cliques.

### Novas Funcionalidades:
- **Aliases Personalizados**: Criar códigos curtos memoráveis
- **Datas de Expiração**: Definir datas de expiração para URLs
- **Rastreamento de Cliques**: Monitorar quantas vezes as URLs são clicadas
- **Histórico de URLs**: Visualizar e gerenciar URLs encurtadas anteriormente
- **Painel de Estatísticas**: Acompanhar total de URLs, cliques e atividade
- **Ações em Lote**: Selecionar múltiplas URLs para operações em lote
- **Exportação de Dados**: Exportar dados de URL
- **Validação Aprimorada**: Melhor validação de URL e alias

### Opções de URL:
- **URL Longa**: A URL original para encurtar
- **Alias Personalizado**: Código curto opcional (letras, números, hífens, underscores)
- **Data de Expiração**: Data de expiração opcional
- **Alias Gerado Automaticamente**: Código curto aleatório se nenhum alias for fornecido

### Controles:
- **Input de URL**: Digite a URL longa para encurtar
- **Input de Alias Personalizado**: Criar código curto personalizado
- **Seletor de Data de Expiração**: Definir data de expiração
- **Botão Encurtar**: Gerar URL curta
- **Botão Copiar**: Copiar URL encurtada para área de transferência
- **Botão Limpar**: Limpar todos os inputs
- **Limpar Histórico**: Remover todas as URLs salvas
- **Botão Exportar**: Exportar dados de URL como JSON

### Exibição de Informações da URL:
- **URL Original**: A URL completa original
- **Data de Criação**: Quando a URL foi encurtada
- **Informações de Expiração**: Quando a URL expira (ou "Nunca")
- **Contagem de Cliques**: Número de vezes que a URL foi acessada
- **Status**: Status ativo ou expirado

### Estatísticas:
- **Total de URLs**: Número de URLs criadas
- **Total de Cliques**: Cliques combinados em todas as URLs
- **URLs Ativas**: URLs atualmente ativas
- **URLs Expiradas**: URLs que expiraram

### Gerenciamento de Dados:
- **Armazenamento Local**: URLs e dados persistem entre sessões
- **Gerenciamento de Histórico**: Visualizar e gerenciar todas as URLs encurtadas
- **Exportação de Dados**: Exportar todos os dados de URL como arquivo JSON
- **Importação de Dados**: Importar dados exportados anteriormente

### Recursos de Validação:
- **Formato de URL**: Valida formato adequado de URL
- **Formato de Alias**: Permite apenas letras, números, hífens e underscores
- **Validação de Expiração**: Garante que a data de expiração seja no futuro
- **Prevenção de Duplicatas**: Verifica aliases existentes

---

## DESAFIO 02

Encurtador de URL avançado com analytics, códigos QR, acesso à API e recursos profissionais.

### Novas Funcionalidades:
- **Geração de Códigos QR**: Gerar códigos QR para URLs encurtadas
- **Analytics Avançados**: Rastreamento detalhado de cliques e relatórios
- **Acesso à API**: API RESTful para acesso programático
- **Proteção por Senha**: URLs seguras com senhas
- **Limites de Cliques**: Definir número máximo de cliques
- **Interface com Abas**: Seções organizadas para diferentes recursos
- **Gráficos e Gráficos**: Analytics visual com Chart.js
- **Configurações Avançadas**: Opções padrão personalizáveis

### Opções Avançadas de URL:
- **Proteção por Senha**: Senha opcional para acesso à URL
- **Limites de Cliques**: Número máximo de vezes que a URL pode ser acessada
- **Código QR**: Geração automática de código QR
- **Analytics Avançados**: Rastreamento e relatórios detalhados

### Recursos de Analytics:
- **Rastreamento de Cliques**: Monitorar performance da URL ao longo do tempo
- **Filtros por Período**: Visualizar analytics para períodos específicos
- **Gráficos Visuais**: Gráficos interativos mostrando tendências de cliques
- **URLs Principais**: Identificar URLs encurtadas mais populares
- **Relatórios Detalhados**: Tabela abrangente de analytics

### Recursos da API:
- **API RESTful**: Acesso programático ao encurtamento de URLs
- **Documentação da API**: Documentação completa de endpoints
- **Teste da API**: Interface de teste da API integrada
- **Respostas JSON**: Respostas de API padronizadas

### Gerenciamento de Configurações:
- **Domínio Padrão**: Personalizar o domínio curto padrão
- **Expiração Padrão**: Definir período de expiração padrão
- **Geração Automática**: Alternar geração automática de alias
- **Opções de Analytics**: Configurar preferências de rastreamento
- **Gerenciamento de Dados**: Importar/exportar e limpar dados

### Recursos Profissionais:
- **Interface com Abas**: Seções organizadas (Encurtador, Analytics, API, Configurações)
- **Design Responsivo**: Funciona em todos os tamanhos de dispositivo
- **Interface Profissional**: Interface moderna e limpa
- **Tratamento de Erros**: Gerenciamento abrangente de erros
- **Estados de Carregamento**: Feedback visual para operações

### Controles:
- **Todos os controles anteriores do Desafio 1**
- **Navegação por Abas**: Alternar entre diferentes seções
- **Download de Código QR**: Baixar códigos QR gerados
- **Teste da API**: Testar endpoints da API diretamente
- **Configuração de Configurações**: Personalizar comportamento da aplicação
- **Exportação/Importação de Dados**: Gerenciar dados da aplicação

### Analytics Avançados:
- **Gráficos Baseados em Tempo**: Representação visual de tendências de cliques
- **Dados Geográficos**: Rastrear cliques por país (se habilitado)
- **Rastreamento de Dispositivos**: Monitorar cliques por tipo de dispositivo
- **Rastreamento de Referenciadores**: Rastrear origem dos cliques
- **Métricas de Performance**: Análise detalhada de performance

---

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e elementos de formulário
- **CSS3**: Estilização moderna com gradientes, animações e design responsivo
- **JavaScript ES6+**: Lógica de encurtamento de URL, armazenamento local e manipulação do DOM
- **Chart.js**: Gráficos interativos e visualização de analytics
- **QRCode.js**: Biblioteca de geração de códigos QR
- **Armazenamento Local**: Armazenamento persistente de dados

## Compatibilidade com Navegadores

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Instalação

1. Clone ou baixe o projeto
2. Abra `index.html` em um navegador web
3. Comece a encurtar URLs!

## Uso da API

### Encurtar URL
```javascript
fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: 'https://example.com/long-url',
        alias: 'alias-opcional',
        expiry: '2024-12-31T23:59:59',
        maxClicks: 100,
        password: 'senha-opcional'
    })
})
```

### Obter Analytics
```javascript
fetch('/api/analytics/abc123')
    .then(response => response.json())
    .then(data => console.log(data));
```

## Contribuindo

Sinta-se livre para contribuir com este projeto:
- Adicionando novos recursos de analytics
- Melhorando a API
- Adicionando mais opções de URL
- Aprimorando a interface/experiência do usuário
- Adicionando integração com redes sociais

## Licença

Este projeto faz parte do Curso JS Dev e segue os mesmos termos de licenciamento. 