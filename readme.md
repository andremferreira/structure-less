# Structure-Less- Sem Estruturação (Backend)
 **Versão em Desenvolvimento - 0.0.1** Structure-less

## Objetivo
Elaborar uma estrutuda de backend que sirva para qualquer futura estruturação de tabelas relacionais para pequenas aplicações. 

## Organização
Verificar dentro de: ./server/config/config.json as configurações dos ambientes (Desenvolvimento, Teste e Produção).

### Config
Basicamente para a aplicação funcionar é necessário configurar:
- Servidor HTTP (Express)
- Rotas para a API REST (Express)
- Conexão com Banco de Dados (PostresSQL / pg).
- Node 6.0.0 ou superior
- Sequelize instalado em modo global

### Instalação
Criar pasta de destino e baixar o projeto do git repository
```sh
$ mkdir /app
$ cd /app
$ git clone http://192.168.60.126/andre.mf/structure-less.git
$ npm update
```
Inicializar a aplicação em **modo desenvolvimento**.
```sh
$ npm run dev
$ sequelize db:migrate
$ sequelize db:seed:all
```
Inicializar a aplicação em **modo teste**.
```sh
$ npm run teste
```
Inicializar a aplicação em **modo produção**.
```sh
$ npm run production (pm2 - alias: structure-less)
```
Inicializar sistema de gerenciamento de alertas ** SDM - System of Dialog Manager**.
```sh
$ cd ./msg/
$npm i
$npm run msgBackStart
$npm run msgFrontStart
```