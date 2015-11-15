# Como cadastrar um evento

## Antes de cadastrar um evento.

1. Verifique se esse evento já [foi cadastrado](http://cwisoftware.github.io/eventos).

1. Verifique se já existe um [pull request](https://github.com/CWISoftware/eventos/pulls) do mesmo evento esperando aprovação. Se houver, aproveite para revisar e aprovar o pull request.

## Novo evento

Um novo evento é cadastrado criando fazendo um pull request de um arquivo com os dados desse evento. É necessário ter uma conta no Github e fazer parte da organization CWI Software.

1. **Acesse** https://github.com/CWISoftware/eventos/new/gh-pages/_data/events.

1. Dê o **nome do arquivo** seguindo as [Convenções para nomes de arquivos de eventos](file_naming.md).

1. Copie o template abaixo e **preencha os dados** do evento no arquivo que você criou:
  ```yaml
  # ATENÇÃO:
  # - `name` e `date` são obrigatórios
  # - se não souber algum dado, apague a linha
  # - apague os comentários (tudo que tem um `#` na frente)

  name: Nome do evento # não colocar o ano do evento no nome
  date: 28/01/2015 # formato dd/MM/yyyy. Para vários dias, separe por vírgula: 28/01/2015, 29/01/2015
  time: 09:00 - 18:30 # formato HH:mm
  location: BarraShoppingSul # o nome do lugar
  address: Av. Diário de Notícias, 300, bairro Cristal, Porto Alegre/RS # o endereço do lugar
  price: 180 # valor sem centavos. Se gratuito, informe 0. Para vários valores (lotes), separe por vírgula: 180, 240, 300
  url: http://sitedoevento.com.br/ # URL do site do evento
  img: http://sitedoevento.com.br/logo.png # URL da imagem do evento. Máximo de 100kb. Ideal < 50kb
  description: Um pequeno parágrafo livre. Pode-se colocar mais links em HTML.
  tags: tag1, tag2, tag3 # no máximo umas 5 ou 6 tags, separadas por vírgula
  ```

1. **Selecione a opção** *Create a new branch*, coloque o nome do evento (mesmo nome do arquivo, sem extensão) e clique em *Propose new file*. Na próxima página, confirme a criação do pull request. ![screen shot 2015-09-13 at 1 19 29 am](https://cloud.githubusercontent.com/assets/4842605/9835221/8647fc94-59b5-11e5-9081-1ad8d55c7689.png)

1. **Feito!** Seu pull request foi submetido! Peça para algum outro membro da organization CWI Software revisar e aprovar, e após isso o evento já estará disponível no site.

## Observações

- Queremos manter o site rápido. Certifique-se que a imagem do evento que você está linkando seja a menor possível, desde que o suficiente para ficar boa no layout.
