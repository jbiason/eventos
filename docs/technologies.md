# Tecnologias utilizadas

Jekyll, Sass, Zepto, Underscore.

Esse projeto é um site estático gerado com Jekyll e está hospedado no Github como gh-pages. Optou-se por essa abordagem por facilidade de desenvolvimento e de manutenção dos eventos, que será feita através de pull requests no próprio Github.

Os dados são obtidos por AJAX de um JSON que contém os dados de todos os eventos, e a listagem/pesquisa é feita no front-end.

O build do site é o próprio build do Jekyll, que é feito automaticamente pelo Github ao ser feito um push/merge. Esse build também gera o JSON a partir dos arquivos `.yml` da pasta `_data/events`.

Futuramente, se for necessário, podemos trocar essa abordagem por algo que envolva um back-end mais robusto.

## Zepto custom build

Este projeto usa um custom build do Zepto, feito no [Zepto builder](http://github.e-sites.nl/zeptobuilder/), contendo os módulos:

- ajax
- callbacks
- deferred
- event
- fx
- fx_methods
- ie
- zepto (core)
