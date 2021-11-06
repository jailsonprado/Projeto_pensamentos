- Versão 1.0
- Author Jailson Prado Dionisio, jailsondpd@gmail.com
- Projeto do curso Node JS de Matheus Battisti - HoradeCodar
- Projeto terá melhorias e mudanças em seu Front-end e novas funcionalidades.


- Projeto Criado usando Node JS com handleBars e template Engine
- Estrutura padrão MVC
- Desenvolvido durante curso de Node JS

 1- Requisitos para rodar a aplicação:
 - Node JS <Version 14.15>
 - MySqL -->  Necessario criar um banco de dados e adicionar as configurações no db/conn.js
          -Alterar valores na const sequelize

          const sequelize = new Sequelize('<Nome do BD>', 'Usuario', 'password', {
            host: 'localhost',
            dialect: 'mysql',
          });
- Instalar pacote NPM 'npm install'

2- Executando o projeto
- Certifique de estar com BD feito e rodando localmente
- Garanta que a porta 3000 esteja livre(Se desejar pode alterar a porta no arquivo index.js)
- Inicializar o aplicativo com comando 'npm start'