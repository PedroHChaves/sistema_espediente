# Sistema Espediente

 Sistema criado utilizando NodeJS e React, além de utilizar arquivos CSS, o framework de CSS materialize e os modulos do npm, express e cors. Ele tem por finalidade ser um teste prático com o intuito de concorrer a uma vaga desenvolver fullstack jr em uma empresa. 
 
# Funcionamento
 A aplicação possui dois campos, um para adionar o horário inicial em que o usuário começou seu serviço e o outro para adicionar o horário final. 
 
 Após o usuário confimar, irá aparecer uma janela na parte superior, onde serão informadas a quantidade de horas trabalhadas e o período, caso o usuário tenha trabalhando em mais de um período, serão informados também, quantas horas foram trabalhadas em cada um deste períodos.
 
 As quantidade de horas informadas pelos usuários, são pegas no frontend e enviadas pro backend. Lá são feitas comparações para que se descubra em quais períodos foram trabalhados. Por fim, o backend envia envia uma mensagem pro frontend contendo o resultado, o qual deverá mostrar o resultado na janela que surgirá na parte superior.

# Como usar
 Primeiramente é necessário fazer o download do NodeJS.

 Após isso baixe todo o projeto.

 Abra o cmd e vai ate a pasta frontend na aplicação, execute o comando npm install i. Ainda no cmd, va ate a pasta do backend e execute o comando npm install express --save e o comando npm install cors --save, por fim execute node index.js.
 Abra outro cmd mantendo o anterior aberto, vá novamente ate a pasta do frontend e execute o comando npm start.
