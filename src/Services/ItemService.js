import { request } from "./index";

function getItems() {
  return request({
    method: "get",
    url: "/listaCompra"
  });
}

function createItem(data) {
  return request({
    method: "post",
    url: "/addItem",
    data
  });
}

function updateItem(itemId, data) {
  return request({
    method: "put",
    url: `/updateItem/${itemId}`,
    data
  });
}

function deleteItem(itemId) {
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
