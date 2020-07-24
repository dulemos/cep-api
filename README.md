# cep-api
Uma API que fornece o endereço a partir do CEP.

Essa API foi feita em Node.js e busca o CEP informado pelo requisitante em um banco de dados próprio.
Caso não encontre realiza a busca em uma API pública (https://viacep.com.br/), ao receber o retorno, salva as informações em um BD próprio e retorna ao usuário. 

Para rodar a aplicação é necessário ter Node.js e NPM instalados. 

Utilize o comando `npm install` para instalar os pacotes utilizados na aplicação.

Em seguida, utilize o comando `npm start` para iniciar a aplicação. 
