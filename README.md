# concrete-desafio
 This project is about the concrete challenge of creating basic user login features.
 
 
 ### Configurations :
 - nodejs versão 8.1;
 - mongodb;
 - express;
 - jwt.
 
 ### How to Run :
 - npm install;
 - node index.js.
 
 ### Endpoints:
 
 - localhost:3000/login (é preciso informar email e senha de um usuário previamente cadastrado);
 - localhost:3000/singup (é preciso informar um json de um novo usuário informando os campos necessários);
 - localhost:3000/user/:id (é preciso informar o token jwt de um usuário cadastrado, e seu id)
 
 ### Test
 - npm test (Ao rodar os testes, verifica a estrutura com eslint)
 
 
 ### Deploy
 - Heroku
  - #### URLs 
    - https://whispering-lake-65210.herokuapp.com/user
    - https://whispering-lake-65210.herokuapp.com/login
    - https://whispering-lake-65210.herokuapp.com/singup
