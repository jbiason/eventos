# Ambiente

## Instalação

1. Instalar Ruby e [Jekyll](https://jekyllrb.com/)
1. Instalar Node e npm, preferencialmente usando [nvm](https://github.com/creationix/nvm)
1. `git clone https://github.com/CWISoftware/eventos.git && cd eventos`
1. `nvm use # or nvm install, if appropriate Node version is not installed`
1. `npm install`

## Desenvolvimento

Para desenvolvimento, é necessário subir o servidor do Jekyll e rodar as tasks de desenvolvimento, simultaneamente.

Para rodar o servidor do Jekyll:
1. `jekyll s`

Para rodar as tasks de desenvolvimento:
1. `npm run dev`

## Outras tasks

Todas tasks são chamadas através de npm scripts, para evitar o uso de outras dependências globais:

```sh
npm run dev # linter, testes e build em modo watch
npm run test # testes
npm run lint # linter
npm run build-prod # build de JavaScript com configurações de prod
npm run build-dev # build de JavaScript com configurações de dev
```
