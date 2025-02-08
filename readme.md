# RottenTomatoes Scraper

Este projeto é um scraper que utiliza o Playwright para coletar os dados das suas avaliações de filmes no Rotten Tomatoes, uma das maiores plataformas de ratings de filmes e séries, mas não necessariamente a mais utilizada. Se você deseja exportar suas avaliações para uso próprio, este projeto facilita o processo extraindo essas informações diretamente do seu perfil.

## 📁 Estrutura do Projeto

- `index.js` - Script principal que realiza o scraping e salva os dados em um arquivo JSON.
- `test.js` - Script de teste para validar o funcionamento do scraper.
- `ratings.json` - Arquivo onde os dados das avaliações são armazenados.
- `package.json` - Arquivo de configuração do npm com as dependências do projeto.
- `env.test` - Arquivo de configuração de ambiente.

## ⚙️ Pré-requisitos

- **Node.js** instalado
- **Microsoft Edge ou Browser favorito** instalado

## 📥 Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/usuario/RottenTomatoes.git
    cd RottenTomatoes
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## 🚀 Uso

1. Execute o script principal:
    ```sh
    node index.js
    ```

2. Para testar o scraper, execute:
    ```sh
    node test.js
    ```

## 📂 Dados Exportados

Os dados coletados serão salvos no arquivo `ratings.json`, permitindo que você tenha um backup das suas avaliações de forma estruturada.

---

Se encontrar algum problema ou tiver sugestões, fique à vontade para contribuir! 🎬🍿
