# WORK IN PROGRESS - não cadastrar eventos ainda

# CWI Eventos

Site para divulgação de eventos de desenvolvimento de software, tecnologia e design.

## Contribuição

Você pode contribuir [com código](https://github.com/CWISoftware/eventos/issues) (através de pull requests), [cadastrando um novo evento](/docs/new_event.md), ou pedindo uma [nova funcionalidade](https://github.com/CWISoftware/eventos/issues/new) que [não tenha sido pedida ainda](https://github.com/CWISoftware/eventos/issues).

## Documentação

[Como cadastrar um evento](/docs/new_event.md).

## Instalação

TODO

## Tecnologias

Jekyll, Lodash, Zepto, Sass.

Esse projeto é um site estático gerado com Jekyll e está hospedado no Github como gh-pages.

Os dados são obtidos por AJAX de um JSON que contém os dados de todos os eventos, e a listagem é feita no front-end.

O build do site é o próprio build do Jekyll, que é feito automaticamente pelo Github ao ser feito um push/merge. Esse build também gera o JSON a partir dos arquivos `.yml` da pasta `_data/events`.
