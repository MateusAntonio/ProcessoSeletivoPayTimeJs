import { request } from "./index";
// method: 'post',
// url: '/user/12345',
// data: {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// }

// Apesar da funcao nao utilizar await, eu marquei como async para
// que fique claro que ela retorna uma promessa
async function getItems() {
  return request({
    method: "get",
    url: "/listaCompra"
  });
}

async function createItem(data) {
  return request({
    method: "post",
    url: "/addItem",
    data
  });
}

async function updateItem(itemId, data) {
  return request({
    method: "put",
    url: `/updateItem/${itemId}`,
    data
  });
}

async function deleteItem(itemId) {
  return request({
    method: "delete",
    url: `/deleteItem/${itemId}`
  });
}

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};
