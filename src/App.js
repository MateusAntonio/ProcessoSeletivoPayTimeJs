import React, { Component } from "react";
import { message } from "antd";

import "./App.css";
import "antd/dist/antd.css";

import ItemsTable from "./Components/ItemsTable/ItemsTable";
import ItemModal from "./Components/ItemModal/ItemModal";
import ItemService from "./Services/ItemService";
import Button from "./Components/Button";

const cleanItem = {
  quantity: 0,
  item_name: "",
  importance: 0
};

class App extends Component {
  state = {
    items: [],
    isModalVisible: false,
    isEditingMode: false,
    newItem: cleanItem,
    newItemId: 0
  };

  setModalVisibility = visibility => {
    this.setState({ isModalVisible: visibility });
  };

  setIsEditingMode = edit => {
    this.setState({ isEditingMode: edit });
  };

  setQuantity = quantity => {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: quantity,
        item_name: newItem.item_name,
        importance: +newItem.importance
      }
    });
  };
  setItemName = name => {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: newItem.quantity,
        item_name: name,
        importance: +newItem.importance
      }
    });
  };
  setImportance = importance => {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: newItem.quantity,
        item_name: newItem.item_name,
        importance: +importance
      }
    });
  };

  handleDeleteItem = async itemId => {
    await ItemService.deleteItem(itemId);
    const { items } = this.state;
    const remainingArray = items.filter(item => item.id !== itemId);
    this.setState({
      items: remainingArray
    });
    message.success("Item deletado com sucesso!");
  };

  handleCreateItem = async () => {
    const data = await ItemService.createItem(this.state.newItem);
    // Visando garantir a unicidade das keys, pegar o id do objeto no banco parece a opção mais segura
    // em troca de requisição extra ao BD
    const items = await ItemService.getItems();
    this.setItems(items);
    //Checa se retornou algum dado para saber se houve sucesso na requisição
    if (data) {
      message.success("Item criado!");
    }
  };

  handleEditItem = async () => {
    const itemId = this.state.newItemId;
    const data = await ItemService.updateItem(itemId, this.state.newItem);
    const items = await ItemService.getItems();
    this.setItems(items);
    //Checa se retornou algum dado para saber se houve sucesso na requisição
    if (data) {
      message.success("Item editado!");
    }
  };

  handleEditClick = item => {
    this.setState({
      newItem: item,
      newItemId: item.id
    });
  };

  setItems = async items => {
    this.setState({
      items: items.map(item => ({
        ...item,
        key: item.id,
        importance: +item.importance
      }))
    });
  };

  componentDidMount = async () => {
    const items = await ItemService.getItems();
    this.setItems(items);
  };

  render() {
    return (
      <div>
        <ItemsTable
          setIsEditingMode={this.setIsEditingMode}
          setModalVisibility={this.setModalVisibility}
          handleEditClick={this.handleEditClick}
          handleDeleteItem={this.handleDeleteItem}
          dataSource={this.state.items}
        ></ItemsTable>
        <Button
          type="new"
          click={() => {
            this.setState({
              newItem: cleanItem
            });
            this.setModalVisibility(true);
          }}
        >
          Novo
        </Button>
        <ItemModal
          isModalVisible={this.state.isModalVisible}
          isEditingMode={this.state.isEditingMode}
          newItem={this.state.newItem}
          setModalVisibility={this.setModalVisibility}
          setIsEditingMode={this.setIsEditingMode}
          handleCreateItem={this.handleCreateItem}
          handleEditItem={this.handleEditItem}
          setQuantity={this.setQuantity}
          setItemName={this.setItemName}
          setImportance={this.setImportance}
        ></ItemModal>
      </div>
    );
  }
}

export default App;
