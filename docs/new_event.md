# Como cadastrar um evento

## Antes de cadastrar um evento.

1. Verifique se esse evento já [foi cadastrado](http://cwisoftware.github.io/eventos).

1. Verifique se já existe um [pull request](https://github.com/CWISoftware/eventos/pulls) do mesmo evento esperando aprovação. Se houver, aproveite para revisar e aprovar o pull request.

## Novo evento

Um novo evento é cadastrado criando fazendo um pull request de um arquivo com os dados desse evento. É necessário ter uma conta no Github e fazer parte da organization CWI Software.

1. **Acesse** https://github.com/CWISoftware/eventos/new/gh-pages/_data/events.

1. Dê o **nome do arquivo** seguindo as [Convenções para nomes de arquivos de eventos](file_naming.md).

1. Copie o template abaixo e **preencha os dados** do evento no arquivo que você criou. Se usar aspas, devem ser escapadas com `\`:
  ```yaml
  # dados obrigatórios
  name: Nome do evento # São colocar o ano do evento no nome.
  date: 28/01/2015 # Formato dd/MM/yyyy. Para vários dias, separe por vírgula: 28/01/2015, 29/01/2015. Se não souber ainda, coloque "Não definido".
  time: 09:00 - 18:30 # Formato HH:mm Se não souber ainda, coloque "Não definido".
  location: BarraShoppingSul # O nome do lugar.
  address: Av. Diário de Notícias, 300, bairro Cristal, Porto Alegre/RS # O endereço do lugar.
  
  # dados opcionais - se não for informar, apague a linha
  price: 180 # Valor sem centavos. Para evento gratuito, apague essa linha. Para vários valores (lotes), separe por vírgula: 180, 240, 300.
  url: http://sitedoevento.com.br/ # URL do site do evento
  img: http://sitedoevento.com.br/logo.png # URL da imagem do evento. Procure colocar uma imagem de no máximo 50kb.
  description: Descrição do evento. Um pequeno parágrafo livre. Pode-se colocar mais links em HTML, escapando as aspas: href=\"...\".
  tags: tag1, tag2, tag3, tag4 # Procure colocar no máximo umas 5, 6 tags, com texto em minúsculo.
  ```

1. **Selecione a opção** *Create a new branch*, coloque o nome do evento (mesmo nome do arquivo, sem extensão) e clique em *Propose new file*. Na próxima página, confirme a criação do pull request. ![screen shot 2015-09-13 at 1 19 29 am](https://cloud.githubusercontent.com/assets/4842605/9835221/8647fc94-59b5-11e5-9081-1ad8d55c7689.png)

1. **Feito!** Seu pull request foi submetido! Peça para algum outro membro da organization CWI Software revisar e aprovar, e após isso o evento já estará disponível no site.

## Observações

- Queremos manter o site rápido. Certifique-se que a imagem do evento que você está linkando seja a menor possível, desde que o suficiente para ficar boa no layout.
