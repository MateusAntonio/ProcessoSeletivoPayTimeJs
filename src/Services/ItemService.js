const axios = require("axios").default;

async function getItems() {
  const configBody = {
    headers: {
      token: "Mateus_antonio3@hotmail.com"
    }
  };
  try {
    const response = await axios.get(
      "http://3.231.119.252/ps/listaCompra",
      configBody
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function createItem(itemBody) {
  const configBody = {
    headers: {
      token: "Mateus_antonio3@hotmail.com",
      "content-type": "application/json"
    }
  };
  try {
    const response = await axios.post(
      "http://3.231.119.252/ps/addItem",
      itemBody,
      configBody
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function updateItem(itemId, itemBody) {
  const configBody = {
    headers: {
      token: "Mateus_antonio3@hotmail.com",
      "content-type": "application/json"
    }
  };
  try {
    const response = await axios.put(
      `http://3.231.119.252/ps/updateItem/${itemId}`,
      itemBody,
      configBody
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function deleteItem(itemId) {
  const configBody = {
    headers: {
      token: "Mateus_antonio3@hotmail.com"
    }
  };
  try {
    const response = await axios.delete(
      `http://3.231.119.252/ps/deleteItem/${itemId}`,
      configBody
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};
