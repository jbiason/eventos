# Como cadastrar um evento

## Antes de cadastrar um evento.

- Verifique se esse evento já [foi cadastrado](http://cwisoftware.github.io/eventos).

- Verifique se já existe um [pull request](https://github.com/CWISoftware/eventos/pulls) do mesmo evento esperando aprovação. Se houver, aproveite para revisar e aprovar o pull request.

## Novo evento

Um novo evento é cadastrado criando fazendo um pull request de um arquivo com os dados desse evento. É necessário ter uma conta no Github e fazer parte da organization CWI Software.

1. Acesse https://github.com/CWISoftware/eventos/tree/gh-pages/_data/events.

1. Clique no ícone `+` que aparece no canto inferior direito da imagem: ![screen shot 2015-09-13 at 12 38 54 am](https://cloud.githubusercontent.com/assets/4842605/9835112/fddb4d3e-59af-11e5-8d22-5946d2c3d01a.png)

1. Será aberta uma página para criação de um novo arquivo. Dê o nome do arquivo seguindo as [Convenções para nomes de arquivos de eventos](file_naming.md).

1. Preencha os dados do evento no arquivo, consultando um desses recursos:
  - o [Template de novo evento](event_template.yml), para usar um template básico
  - a [Formatação dos dados do evento](data_format.md), para mais opções

1. Selecione opção *Create a new branch*, coloque o nome do evento (mesmo nome do arquivo, sem extensão) e clique em *Propose new file*. Na próxima página, confirme a criação do pull request. ![screen shot 2015-09-13 at 1 19 29 am](https://cloud.githubusercontent.com/assets/4842605/9835221/8647fc94-59b5-11e5-9081-1ad8d55c7689.png)

1. Feito! Seu pull request foi submetido! Espere algum outro membro da organization CWI Software revisar e aprovar, e após isso o evento já estará disponível no site.

## Observações

- Queremos manter o site rápido. Certifique-se que a imagem do evento que você está linkando seja a menor possível, desde que o suficiente para ficar boa no layout.
