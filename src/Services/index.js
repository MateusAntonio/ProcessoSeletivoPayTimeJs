const axiosConfigBody = {
  baseURL: "http://3.231.119.252/ps",
  headers: {
    token: "Mateus_antonio3@hotmail.com"
  }
};
const axios = require("axios").create(axiosConfigBody);

// Essa função é útil pois ela encapsula a chamada de API. Por enquanto ela não faz nada de
// especial, mas no futuro ela poderia ser util para logarmos todos as requisições, parar ter
// uma forma consistente de tratar erros e também esconde a biblioteca que a gente usa. Dessa forma,
// se no futuro o projeto mude a biblioteca que faz requisições de API a gente não precisa alterar
// todos os serviços
export async function request(requestConfig) {
  try {
    const { data } = await axios(requestConfig);
    return data;
  } catch (e) {
    console.error(e);
  }
}
