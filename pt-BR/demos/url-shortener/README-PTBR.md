# Encurtador de URL

> [versão em inglês](README.md)

Um serviço moderno de encurtamento de URLs que converte links longos em links compactos e compartilháveis com rastreamento de cliques e aliases personalizados.

## AULA

### Recursos
- **Encurtamento de URL**: Converta URLs longas em links curtos e gerenciáveis
- **Aliases Personalizados**: Crie URLs memoráveis para seus links
- **Rastreamento de Cliques**: Monitore quantas vezes seus links são acessados
- **Histórico de URLs**: Visualize e gerencie suas URLs recentemente encurtadas
- **Copiar para Área de Transferência**: Cópia de URLs encurtadas com um clique
- **Armazenamento Local**: URLs são salvas localmente no seu navegador

### Controles
- **Entrada de URL**: Digite a URL longa que você quer encurtar
- **Alias Personalizado**: Opcionalmente especifique um código curto personalizado
- **Botão Encurtar**: Gere a URL encurtada
- **Botão Copiar**: Copie a URL encurtada para a área de transferência
- **Botão Limpar**: Redefina o formulário
- **Histórico de URLs**: Clique nas URLs encurtadas para visitá-las

### Como Funciona
- Digite uma URL válida no campo de entrada
- Opcionalmente adicione um alias personalizado (3-20 caracteres)
- Clique em "Shorten URL" para gerar um link curto
- A URL encurtada usa roteamento baseado em hash para redirecionamento
- O rastreamento de cliques é atualizado automaticamente quando os links são acessados
- Todos os dados são armazenados localmente no seu navegador

## DESAFIO 01

### Recursos Adicionais
- **Geração de QR Code**: Gere códigos QR para URLs encurtadas
- **Dashboard de Analytics**: Estatísticas detalhadas de cliques e gráficos
- **Expiração de URL**: Defina datas de expiração para links temporários
- **Proteção por Senha**: Adicione proteção por senha a links sensíveis
- **Encurtamento em Massa**: Encurte múltiplas URLs de uma vez

### Melhorias Técnicas
- Implemente geração de QR code usando Canvas API
- Adicione chart.js para visualização de analytics
- Crie sistema de expiração de URL com limpeza
- Adicione proteção por senha com criptografia
- Implemente processamento em massa com indicadores de progresso

## DESAFIO 02

### Recursos Avançados
- **Integração com API**: Conecte a serviços externos de encurtamento de URL
- **Integração com Redes Sociais**: Compartilhamento direto para plataformas sociais
- **Analytics Avançado**: Rastreamento geográfico e de dispositivos
- **Categorias de URL**: Organize URLs em categorias e tags
- **Exportar/Importar**: Backup e restauração de dados de URL

### UX Aprimorada
- **Validação em Tempo Real**: Feedback instantâneo sobre formato de URL
- **Auto-completar**: Sugira URLs do histórico
- **Atalhos de Teclado**: Ações rápidas com teclado
- **Tema Escuro/Claro**: Alternar entre temas
- **Aplicativo Web Progressivo**: Instalar como app desktop/mobile

### Aprimoramentos Técnicos
- Integre com Bitly, TinyURL ou APIs similares
- Implemente APIs de compartilhamento social (Twitter, Facebook, LinkedIn)
- Adicione analytics avançado com análise de user agent
- Crie sistema de gerenciamento de categorias
- Implemente funcionalidade de exportar/importar dados

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e elementos de formulário
- **CSS3**: Estilização moderna com efeitos de glassmorphism
- **JavaScript ES6+**: Processamento de URL e armazenamento local
- **Local Storage API**: Persistência de dados no lado do cliente
- **Roteamento Baseado em Hash**: Sistema de redirecionamento de URL

## Recursos Principais

### Processamento de URL
- **Validação**: Garante que URLs estejam formatadas corretamente
- **Geração de Código Curto**: Cria códigos únicos de 6 caracteres
- **Aliases Personalizados**: Permite códigos curtos definidos pelo usuário
- **Prevenção de Colisão**: Garante códigos curtos únicos
- **Redirecionamentos Baseados em Hash**: Usa fragmentos de URL para redirecionamento

### Gerenciamento de Dados
- **Armazenamento Local**: Armazenamento persistente de dados no navegador
- **Rastreamento de Cliques**: Contagem automática de cliques
- **Gerenciamento de Histórico**: Exibição e gerenciamento de URLs recentes
- **Validação de Dados**: Sanitização e validação de entrada
- **Tratamento de Erros**: Gerenciamento gracioso de erros

### Interface do Usuário
- **Design Moderno**: Efeitos de glassmorphism e gradientes
- **Layout Responsivo**: Funciona em todos os tamanhos de dispositivo
- **Elementos Interativos**: Efeitos de hover e animações
- **Acessibilidade**: Rótulos adequados e navegação por teclado
- **Funcionalidade de Cópia**: Cópia de URL com um clique

## Como Usar

1. **Digite URL**: Cole ou digite a URL longa que você quer encurtar
2. **Alias Personalizado** (opcional): Adicione um código memorável personalizado
3. **Encurtar**: Clique no botão "Shorten URL"
4. **Copiar**: Use o botão copiar para copiar a URL encurtada
5. **Compartilhar**: Compartilhe a URL encurtada com outros
6. **Rastrear**: Monitore cliques na seção de histórico de URL

## Formato de URL

- **URLs Geradas**: `seudominio.com#AbC123`
- **Aliases Personalizados**: `seudominio.com#meu-link-personalizado`
- **Sistema de Redirecionamento**: Roteamento baseado em hash para redirecionamentos instantâneos

## Compatibilidade com Navegadores

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Navegadores móveis (iOS Safari, Chrome Mobile)

## Recursos de Segurança

- **Validação de URL**: Previne injeção de URL maliciosa
- **Sanitização de Entrada**: Limpa entrada do usuário
- **Armazenamento Local**: Dados ficam no seu dispositivo
- **Sem Serviços Externos**: Nenhum dado enviado para terceiros
- **Segurança Baseada em Hash**: Usa fragmentos de URL para redirecionamento

## Performance

- **Processamento Instantâneo**: Nenhuma requisição de servidor necessária
- **Armazenamento Local**: Acesso e recuperação rápidos de dados
- **Renderização Otimizada**: Atualizações eficientes do DOM
- **Gerenciamento de Memória**: Limpeza adequada de dados não utilizados
- **Design Responsivo**: Performance suave em todos os dispositivos

## Melhorias Futuras

- **Sincronização na Nuvem**: Sincronize URLs entre dispositivos
- **Analytics Avançado**: Rastreamento detalhado de cliques e relatórios
- **Desenvolvimento de API**: API RESTful para integrações externas
- **App Mobile**: Aplicações móveis nativas
- **Recursos Empresariais**: Colaboração em equipe e gerenciamento
- **Integração com IA**: Sugestões inteligentes de URL e categorização

## Limitações

- **Armazenamento Local**: URLs são específicas do dispositivo
- **Roteamento Baseado em Hash**: Requer JavaScript para redirecionamentos
- **Sem Servidor**: Não pode rastrear cliques em dispositivos diferentes
- **Limites de Armazenamento**: Limitado pela capacidade de armazenamento do navegador
- **Sem Unicidade Global**: Códigos curtos são únicos apenas por dispositivo

---

**Nota**: Este encurtador de URL foi projetado para uso pessoal e fins educacionais. Para uso em produção, considere implementar funcionalidade do lado do servidor para unicidade global e rastreamento entre dispositivos. 