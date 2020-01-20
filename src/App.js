import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import ItemsTableComponent from "./Components/ItemsTableComponent/ItemsTableComponent";
import ItemService from "./Services/ItemService";
import ImportanceTag from "./Components/ImportanceTag/index";
import Button from "./Components/Button";
import { Divider, Modal, Popconfirm, message } from "antd";

class App extends Component {
  state = {
    items: [],
    modalVisible: false,
    editingMode: false,
    newItem: {
      quantity: 0,
      item_name: "",
      importance: 0
    },
    newItemId: 0
  };

  setModalVisibility(visible) {
    this.setState({ modalVisible: visible });
  }

  setEditingMode(edit) {
    this.setState({ editingMode: edit });
  }

  setQuantity(quantity) {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: quantity,
        item_name: newItem.item_name,
        importance: +newItem.importance
      }
    });
  }
  setItemName(name) {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: newItem.quantity,
        item_name: name,
        importance: +newItem.importance
      }
    });
  }
  setImportance(importance) {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: newItem.quantity,
        item_name: newItem.item_name,
        importance: +importance
      }
    });
  }

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
    //Deveria checar o status da resposta para garantir a criação
    if (data) {
      message.success("Item criado!");
    }
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

  columns = [
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true
    },
    {
      title: "Name",
      dataIndex: "item_name",
      key: "item_name",
      editable: true
    },
    {
      title: "Importance",
      dataIndex: "importance",
      key: "importance",
      editable: true,
      render: importance => (
        <ImportanceTag importance={importance}>{importance}</ImportanceTag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Button
              type="edit"
              click={() => {
                this.setState({
                  newItem: record,
                  newItemId: record.id
                });
                this.setEditingMode(true);
                this.setModalVisibility(true);
              }}
            >
              {" "}
              Editar
            </Button>
            <Divider type="vertical"></Divider>
            <Popconfirm
              title="Deseja realmente apagar o item?"
              onConfirm={() => this.handleDeleteItem(record.id)}
              okText="Sim"
              cancelText="Não"
            >
              <button className="btn btn-outline-danger">Deletar</button>
            </Popconfirm>
          </>
        );
        //TODO: Entender o motivo de não funcionar com Button
      }
    }
  ];
  async componentDidMount() {
    const items = await ItemService.getItems();
    // A biblioteca recomenda que cada elemento tenha uma key unicas.
    // Além disso a gente forca que importancia seja um inteiro
    this.setItems(items);
  }

  render() {
    return (
      <div>
        <ItemsTableComponent
          columns={this.columns}
          dataSource={this.state.items}
        ></ItemsTableComponent>
        <Button
          type="new"
          click={() => {
            //Limpa os campos
            this.setState({
              newItem: {
                quantity: 0,
                item_name: "",
                importance: 0
              }
            });
            this.setModalVisibility(true);
          }}
        >
          Novo
        </Button>
        <Modal
          title="Preencha os campos"
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setModalVisibility(false);
            this.setEditingMode(false);
          }}
          onOk={() => {
            if (this.state.editingMode) {
              this.handleEditItem();
            } else {
              this.handleCreateItem();
            }
            this.setModalVisibility(false);
            this.setEditingMode(false);
          }}
        >
          <form>
            <div className="input-block">
              <label>Quantidade</label>
              <input
                type="number"
                name="quantity"
                min="0"
                required
                value={this.state.newItem.quantity}
                onChange={e => {
                  this.setQuantity(e.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label>Nome do item</label>
              <input
                type="text"
                name="item_name"
                required
                value={this.state.newItem.item_name}
                onChange={e => {
                  this.setItemName(e.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label id="importance">Importancia</label>

              <div className="radio-group">
                <input
                  type="radio"
                  name="importance"
                  value="3"
                  checked={this.state.newItem.importance === 3}
                  required
                  onChange={e => {
                    this.setImportance(e.target.value);
                  }}
                />
                <label>Baixa</label>
              </div>

              <div className="radio-group">
                <input
                  type="radio"
                  name="importance"
                  value="2"
                  checked={this.state.newItem.importance === 2}
                  onChange={e => {
                    this.setImportance(e.target.value);
                  }}
                />
                <label>Média</label>
              </div>

              <div className="radio-group">
                <input
                  type="radio"
                  name="importance"
                  value="1"
                  checked={this.state.newItem.importance === 1}
                  onChange={e => {
                    this.setImportance(e.target.value);
                  }}
                />
                <label>Alta</label>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
