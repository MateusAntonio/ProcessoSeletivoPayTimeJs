const axiosConfigBody = {
  baseURL: "http://3.231.119.252/ps",
  headers: {
    token: "Mateus_antonio3@hotmail.com" //Suponho que não deva ficar exposto dessa forma
  }
};
const axios = require("axios").create(axiosConfigBody);

// Essa função é útil pois encapsula a chamada de API. Por enquanto não faz nada de
// especial, mas no futuro poderia ser util para logarmos todas as requisições, tendo assim
// uma forma consistente de tratar erros além de esconder a biblioteca utilizada. Dessa forma,
// caso no futuro o projeto mude a biblioteca que faz requisições de API não precisaremos alterar
// todos os serviços
export async function request(requestConfig) {
  try {
    const { data } = await axios(requestConfig);
    return data;
  } catch (e) {
    console.error(e);
  }
}
