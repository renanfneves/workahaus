WorkaHaus

Destinado a trabalhadores remotos ou híbridos

Problema: Há varias pessoas que trabalham neste mesmo modelo e que podem montar um escritório remoto, mas não o fazem por falta de iniciativas, estrutura, locais destinados a isso.
Como resolver: Simular o ambiente de trabalho com pessoas “conhecidas” (estilo MeetUp) em um local sugerido eventual ou recorrente, com encontros presenciais. Em modelo de plataforma online.

# Requisitos funcionais

* accounts
  - [x] Deve ser possível cadastrar usuários
  - [x] Deve ser possível autenticar um usuário

* connections
  - [] Deve ser possível enviar um pedido de conexão
  - [] Deve ser possível aceitar um pedido de conexão

* events
  - [] Deve ser possível criar eventos para um usuário
  - [] Deve ser possível criar eventos para um time
  - [] Deve ser possível criar um convite para um evento
  - [] Deve ser possível aceitar ou recusar um convite para um evento
  - [] Deve ser possível consultar todos os eventos cadastrados para um usuário
  - [] Deve ser possível consultar todos os eventos cadastrados para um time
  - [] Deve ser possível consultar os detalhes de um evento
  - [] Deve ser possível sugerir um convidado para um evento
  - [] Deve ser possível aceitar a sugestão de um convidado terceiro

* forums
  - [] Deve ser possível criar uma publicação de forum para o evento
  - [] Deve ser possível visualizar a lista de posts no forum do evento
  - [] Deve ser possível excluir um post no forum
  - [] Deve ser possível criar comentários no post do forum do evento
  - [] Deve ser possível listar comentários no post do forum do evento
  - [] Deve ser possível excluir um comentário num post

* places
  - [] Deve ser possível cadastrar locais de encontro
  - [] Deve ser possível buscar locais de eventos por geolocalização

* teams
  - [] Deve ser possível criar times de pessoas

# Regras de negócio
- [x] Não é possível criar uma conta com um e-mail já cadastrado
- [] Na criação de evento deve conter limite de pessoas e local sugerido
- [] Na criação de evento deve ser possível escolher uma forma de contributo para os convidados (dinheiro, produto, gratuito)
- [] É permitido convidar pessoas não pertencentes ao time na criação de eventos de time
- [] É permitido convidar pessoas não pertencentes ao time na sugestão de convidados para eventos de times
- [] Na criação do evento deve ser possível eventos únicos ou recorrentes
- [] Na criação do evento deve ser possível informar horário de início ou fim
- [] Na criação do evento deve ser possível informar horário de pausa
- [] Na criação do evento o host pode definir se os convidados terão permissão de convidar
- [] Na criação do evento deve ser possível escolher um local esporádico para o evento ou escolher na lista de locais cadastrados
- [] Quando um evento for criado os convidados devem receber uma notificação
- [] Apenas pessoas pertencentes ao time terão a permissão de criação de evento de time

# Requisitos não funcionais

A agenda será integrada com google calendar
As notificações serão realizadas por push notification
Haverá integração com google maps para localização do evento


# Entidades de Domínio

- Accounts
- Places
- Events
- Connections
- Teams
